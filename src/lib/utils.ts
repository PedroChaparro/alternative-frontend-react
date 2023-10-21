import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DownloadBlobRequest {
  file: Blob;
  fileName: string;
}

export function downloadBlob({ file, fileName }: DownloadBlobRequest) {
  // Create a blob URL for the file
  const blobUrl = window.URL.createObjectURL(file);

  // Create a link element to download the file
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;
  link.click();

  // Remove the link element
  link.remove();
}
