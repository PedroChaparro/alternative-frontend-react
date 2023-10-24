export type File = {
  name: string;
  isFile: boolean;
  uuid: string;
  size: number;
  isReady: boolean;
  isOwnedByUser: boolean;
  extension?: string;
};
