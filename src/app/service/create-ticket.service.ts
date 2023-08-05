import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataTour } from '../model/concert';
@Injectable({
  providedIn: 'root'
})

export class CreateTicketService {

  private api: string;
  private message: any;
  private createTicket: BehaviorSubject<DataTour[]> = new BehaviorSubject<DataTour[]>([]);
  $creatTicket: Observable<DataTour[]> = this.createTicket.asObservable();

  constructor(private http: HttpClient) {
    this.api = environment.api + 'DataTour';
  }

  private log(message: string) {
    this.message.add(`HeroService: ${message}`);
  }

  //  display data for DataTour
  getDataCreatedTicket(): Observable<DataTour[]> {
    return this.http.get<DataTour[]>(`${this.api}`);
  }

  // get the data for ticket without []
  getCreatedTicketDetail(): Observable<DataTour> {
    return this.http.get<DataTour>(`${this.api}`);
  }

  // create new data for DataTour
  createTour(DataTour: Omit<DataTour, 'id'>): Observable<DataTour> {
    return this.http.post<DataTour>(`${this.api}`, DataTour);
  }


  // get the details of created ticket by barcode param
  getTicketDetails(id: string): Observable<DataTour> {
    const url = `${this.api}?id=${id}`;
    return this.http.get<DataTour>(url).pipe(
      catchError((error)=>{
        console.log(error);
        return throwError(error)
      })
    );
  }

}
