import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDataModel } from '../model/userData.model';
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private userSubject: BehaviorSubject<UserDataModel | null>;
  public personLogedIn: Observable<UserDataModel | null>;
  private readonly api: string;
  user!: UserDataModel;

  constructor(
    private http: HttpClient ,
    private router: Router ,
    private authenticationService: AuthenticationService,
  ) {
    this.api = environment.api + 'userData';
    this.userSubject = new BehaviorSubject(authenticationService.isAuthetnicated);
    this.personLogedIn = this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<UserDataModel[]> {
    return this.http.get<UserDataModel[]>(`${this.api}?email=${email}&password=${password}`);
  }

  logout(){
    this.authenticationService.unstoreUserData();
    this.userSubject.next(null);
    this.router.navigate(['signin']);
  }

  /** Get all registered users **/
  getAllUsersList(): Observable<UserDataModel[]> {
    return this.http.get<UserDataModel[]>(`${this.api}`);
  }

  /** Create new user ,while registered **/
  adduserData(userDatas: Omit<UserDataModel, 'id'>): Observable<UserDataModel[]> {
    return this.http.post<UserDataModel[]>(`${this.api}`, userDatas)
  }

  /** Get the Details of the user profile **/
  getUserProfileByID(id:number):Observable<UserDataModel[]>{
    return this.http.get<UserDataModel[]>(`${this.api}?id=${id}`);
  }

  /** Modify personal data **/
  updateUserProfile(userDatas: UserDataModel): Observable<UserDataModel>{
    return this.http.put<UserDataModel>((this.api)+'/'+ userDatas.id , userDatas);
  }

}
