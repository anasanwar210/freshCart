export interface IBrandResponse {
  results: number;
  metadata: IMetadata;
  data: IData[];
}

export interface IMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface IData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
