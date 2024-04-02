export interface Goal {
  _id: string;
  userId: string;
  title: string;
  categoryId: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  status: string;
}

export interface User {
  name: string;
  email: string;
  image: string;
}

export type Revenue = {
  month: string;
  revenue: number;
};

export interface CardWrapperProps {
  userId: string | null | undefined;
}
