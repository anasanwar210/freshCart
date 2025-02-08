export interface IResponse {
  results: number;
  metadata: IMetadata;
  data: IData[];
}

export interface IMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface IData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
