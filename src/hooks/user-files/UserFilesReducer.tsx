import { File } from "@/types/entities";

export enum UserFilesActionTypes {
  SET_FILES = "SET_FILES",
  GET_FILES = "GET_FILES",
  ADD_FILE = "ADD_FILE",
  REMOVE_FILE = "REMOVE_FILE",
  MARK_FILE_AS_READY = "MARK_FILE_AS_READY"
}

export type UserFilesAction =
  | {
      type: UserFilesActionTypes.SET_FILES;
      payload: File[];
    }
  | {
      type: UserFilesActionTypes.GET_FILES;
      payload: never;
    }
  | {
      type: UserFilesActionTypes.ADD_FILE;
      payload: File;
    }
  | {
      type: UserFilesActionTypes.REMOVE_FILE;
      payload: File;
    }
  | {
      type: UserFilesActionTypes.MARK_FILE_AS_READY;
      payload: File;
    };

export function userFilesReducer(state: File[], action: UserFilesAction) {
  switch (action.type) {
    case UserFilesActionTypes.SET_FILES:
      return action.payload;
    case UserFilesActionTypes.GET_FILES:
      return state;
    case UserFilesActionTypes.ADD_FILE:
      return [...state, action.payload];
    case UserFilesActionTypes.REMOVE_FILE:
      return state.filter((file) => file.uuid !== action.payload.uuid);
    case UserFilesActionTypes.MARK_FILE_AS_READY:
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
