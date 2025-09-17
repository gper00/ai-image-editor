
export interface OriginalImage {
  base64: string;
  mimeType: string;
}

export interface EditResult {
  imageUrl: string | null;
  text: string | null;
}
