import { File } from "@/types/entities";

export enum UserFilesActionTypes {
  SET_FILES = "SET_FILES",
  GET_FILES = "GET_FILES",
  ADD_FILE = "ADD_FILE"
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
    };

export function userFilesReducer(state: File[], action: UserFilesAction) {
  switch (action.type) {
    case UserFilesActionTypes.SET_FILES:
      return action.payload;
    case UserFilesActionTypes.GET_FILES:
      return state;
    case UserFilesActionTypes.ADD_FILE:
      return [...state, action.payload];
    default:
      return state;
  }
}
