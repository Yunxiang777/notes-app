export interface Note {
  id: number;
  title: string;
  content: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
