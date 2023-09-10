import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../model/userData';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private readonly api: string;

  constructor(private http: HttpClient) {
    this.api = environment.api + 'userData';
  }

  login(email: string, password: string): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.api}?email=${email}&password=${password}`);
  }

  // get all registered users
  getAllUsersList(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.api}`);
  }

  // create new user ,while registered
  adduserData(userDatas: Omit<UserData, 'id'>): Observable<UserData[]> {
    return this.http.post<UserData[]>(`${this.api}`, userDatas)
  }

  // Get the Details of the user profile
  getUserProfileByID(id:number):Observable<UserData[]>{
    return this.http.get<UserData[]>(`${this.api}?id=${id}`);
  }

 // store the user in local storage
  storeUserData(user: UserData){
    localStorage.setItem('userData', JSON.stringify(user));
  }

 // unstore the user from local storage
  unstoreUserData(){
    localStorage.removeItem('userData');
    window.history.pushState(null , '' , window.location.href);
  }

}
