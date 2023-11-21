import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataSidebarMenu } from '../model/sidebar-menu.model';
import * as menuData from '../../data/sidebar-menu.json';

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  importMenuData = JSON.stringify(menuData);
  menuData : DataSidebarMenu;

  constructor() {
    this.menuData = JSON.parse(this.importMenuData);
   }

  getMenuData():Observable<DataSidebarMenu>{
    return of(this.menuData);
  }
}
