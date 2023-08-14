export interface userData{
  id?: number;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  password: string;
  role: ERoles[];
}

export enum ERoles {
  admin = 'ADMIN',
  user = 'USER',
}
