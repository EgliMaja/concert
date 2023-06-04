export interface userData{
  id?:number;
  firstName: string;
  lastName: string;
  phone:number;
  email:string;
  password:string;
  role : appRoles[];
}

export enum appRoles {
  admin = 'ADMIN',
  user = 'USER',
}
