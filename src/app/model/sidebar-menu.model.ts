export interface SidebarMenu{
  id: number;
  title: string;
  action: string;
  function: string;
  roles: Role[];
}

export interface Role{
  id: number;
  role: string;
}

export interface DataSidebarMenu{
  data: SidebarMenu[];
}

