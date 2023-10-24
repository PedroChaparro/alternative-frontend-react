import { File } from "@/types/entities";

export enum FilesActionType {
  SET_FILES = "SET_FILES",
  GET_FILES = "GET_FILES",
  ADD_FILE = "ADD_FILE",
  REMOVE_FILE = "REMOVE_FILE",
  MARK_FILE_AS_READY = "MARK_FILE_AS_READY",
  RENAME_FILE = "RENAME_FILE"
}

export type FilesAction =
  | {
      type: FilesActionType.SET_FILES;
      payload: File[];
    }
  | {
      type: FilesActionType.GET_FILES;
      payload: never;
    }
  | {
      type: FilesActionType.REMOVE_FILE;
      payload: {
        uuid: string;
      };
    }
  | {
      type: FilesActionType.ADD_FILE | FilesActionType.MARK_FILE_AS_READY;
      payload: File;
    }
  | {
      type: FilesActionType.RENAME_FILE;
      payload: {
        uuid: string;
        name: string;
      };
    };

export function filesReducer(state: File[], action: FilesAction) {
  switch (action.type) {
    case FilesActionType.SET_FILES:
      return action.payload;

    case FilesActionType.GET_FILES:
      return state;

    case FilesActionType.ADD_FILE:
      return [...state, action.payload];

    case FilesActionType.REMOVE_FILE:
      return state.filter((file) => file.uuid !== action.payload.uuid);

    case FilesActionType.RENAME_FILE:
      return state.map((file) => {
        if (file.uuid === action.payload.uuid) {
          return {
            ...file,
            name: action.payload.name
          };
        }

        return file;
      });

    case FilesActionType.MARK_FILE_AS_READY:
      return state.map((file) => {
        if (file.uuid === action.payload.uuid) {
          return {
            ...file,
            isReady: true,
            name: action.payload.name,
            size: action.payload.size,
            extension: action.payload.extension
          };
        }

        return file;
      });

    default:
      return state;
  }
}
