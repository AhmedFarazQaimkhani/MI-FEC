export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: string[];
  releaseDate: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface Format {
  res: string;
  size: number;
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: any;
  categories: string[];
  releaseDate: string;
  formats: any;
}

export interface Item {
  id?: number;
  name?: string;
  videos?: Video[];
}

export interface Column {
  accessor?: string;
  label?: string;
  sortable?: boolean;
  renderCell?: any;
}
