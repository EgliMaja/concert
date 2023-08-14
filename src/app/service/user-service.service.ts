import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userData } from '../model/userData';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string;
  private userDatas: BehaviorSubject<userData[]> = new BehaviorSubject<userData[]>([])
  $userDatas: Observable<userData[]> = this.userDatas.asObservable()

  constructor(private http: HttpClient) {
    this.api = environment.api + 'userDataData';
  }

  // get Register User
  getRegisterList(): Observable<userData[]> {
    return this.http.get<userData[]>(`${this.api}`);
  }

  //add userData ,while registered
  adduserData(userDatas: Omit<userData, 'id'>): Observable<userData[]> {
    const userData: userData[] = this.userDatas.getValue();
    return this.http.post<userData[]>(`${this.api}`, userDatas)
  }
}
