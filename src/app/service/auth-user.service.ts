import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject , Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDataModel } from '../model/userData.model';
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";
import { EndpointAPIService } from "./endpointAPI.service";


@Injectable({
  providedIn: 'root'
})
export class AuthUserService extends EndpointAPIService {

  private userSubject: BehaviorSubject<UserDataModel | null>;
  public personLoggedIn: Observable<UserDataModel | null>;
  private readonly api: string;
  user!: UserDataModel;

  constructor(
    private http: HttpClient ,
    private router: Router ,
    private authenticationService: AuthenticationService,
  ) {
    super();
    this.api = environment.api + 'UserData';
    this.userSubject = new BehaviorSubject(authenticationService.isAuthetnicated);
    this.personLoggedIn = this.userSubject.asObservable();
  }

  login(email: string, password: string): Observable<UserDataModel[]> {
    return this.http.get<UserDataModel[]>(`${this.api}?email=${email}&password=${password}`);
  }

  logout(){
    this.authenticationService.restoreUserData();
    this.userSubject.next(null);
    this.router.navigate(['signin']);
  }

  /** Get all registered users **/
  getAllUsersList(): Observable<UserDataModel[]> {
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_GET_ALL_USERS );
    return this.http.get<UserDataModel[]>(`${endpoint}`);
  }

  /** Create new user ,while registered **/
  adduserData(userDatas: Omit<UserDataModel, 'id'>): Observable<UserDataModel[]> {
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_REGISTER_USER );
    return this.http.post<UserDataModel[]>(`${endpoint}`, userDatas)
  }

  /** Get the Details of the user profile **/
  getUserProfileByID(id:number):Observable<UserDataModel[]>{
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_GET_USER_BY_ID );
    let queryParams: HttpParams = new HttpParams();
    queryParams = queryParams.set('?id' , id);
    return this.http.get<UserDataModel[]>(`${endpoint}${queryParams}`);
  }

  /** Modify personal data **/
  updateUserProfile(userDatas: UserDataModel): Observable<UserDataModel>{
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_UPDATE_PROFILE_USER );
    return this.http.put<UserDataModel>((endpoint)+'/'+ userDatas.id , userDatas);
  }

}
