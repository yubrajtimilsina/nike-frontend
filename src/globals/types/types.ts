export enum Status {
  SUCCESS = "success",
  LOADING = "loading",
  ERROR = "error",
}

interface ICategory {
  id: string;
  categoryName: string;
}

interface ICollection{
  id:string;
  collectionName:string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  isNew: boolean;
  isStock: boolean;
  features: string[];
  discount: number;
  colors: string[];
  images: string;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  Category: ICategory;

  brand: string;
  sizes: string[];
  quantity: number;
  comments: string[];
  rating: number;
  collectionId: string;
  totalStock: number;
  Collection: ICollection[];
}

export interface IProducts {
  products: IProduct[];
  status: Status;
  product: IProduct | null;
}
