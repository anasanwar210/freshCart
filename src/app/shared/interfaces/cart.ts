export interface ICart {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: IData;
}

export interface IData {
  _id: string;
  cartOwner: string;
  products: IProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface IProduct {
  count: number;
  _id: string;
  product: string;
  price: number;
}

// Get All Items In Cart

export interface ICartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}

export interface ICartData {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface ICartProduct {
  count: number;
  _id: string;
  product: IProduct2;
  price: number;
}

export interface IProduct2 {
  subcategory: ISubcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  id: string;
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
