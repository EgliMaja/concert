import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../model/userData';


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private api: string;
  private userDatas: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([])
  $userDatas: Observable<UserData[]> = this.userDatas.asObservable()

  constructor(private http: HttpClient) {
    this.api = environment.api + 'userDataData';
  }

  // get Register User
  getRegisterList(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.api}`);
  }

  //add userData ,while registered
  adduserData(userDatas: Omit<UserData, 'id'>): Observable<UserData[]> {
    const userData: UserData[] = this.userDatas.getValue();
    return this.http.post<UserData[]>(`${this.api}`, userDatas)
  }
}
