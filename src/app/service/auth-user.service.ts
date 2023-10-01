import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserData } from '../model/userData';
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private userSubject: BehaviorSubject<UserData | null>;
  public personLogedIn: Observable<UserData | null>;
  private readonly api: string;
  user!: UserData;

  constructor(
    private http: HttpClient ,
    private router: Router ,
    private authetificationService: AuthenticationService,
  ) {
    this.api = environment.api + 'userData';
    this.userSubject = new BehaviorSubject(authetificationService.isAuthetnicated);
    this.personLogedIn = this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.api}?email=${email}&password=${password}`);
  }

  logout(){
    this.authetificationService.unstoreUserData();
    this.userSubject.next(null);
    this.router.navigate(['signin']);
  }

  /** Get all registered users **/
  getAllUsersList(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.api}`);
  }

  /** Create new user ,while registered **/
  adduserData(userDatas: Omit<UserData, 'id'>): Observable<UserData[]> {
    return this.http.post<UserData[]>(`${this.api}`, userDatas)
  }

  /** Get the Details of the user profile **/
  getUserProfileByID(id:number):Observable<UserData[]>{
    return this.http.get<UserData[]>(`${this.api}?id=${id}`);
  }

  /** Modify personal data **/
  updateUserProfile(userDatas: UserData): Observable<UserData>{
    return this.http.put<UserData>((this.api)+'/'+ userDatas.id , userDatas);
  }

}
