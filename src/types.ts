export type Image = {
  url: string;
  id: string;
};
export type User = {
  id: string;
  name: string;
};

export type PrintType = {
  images: Image[];
  name: string;
  summary?: string;
  description?: string;
  id?: string;
  published: string;
  rating: number;
  blueprint: string;
  author: User;
};
