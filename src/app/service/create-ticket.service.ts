import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap , of} from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataTour } from '../model/concert';
@Injectable({
  providedIn: 'root'
})

export class CreateTicketService {

  private api: string;
  private message: any;
  dataModel! : DataTour;
  private createTicket: BehaviorSubject<DataTour[]> = new BehaviorSubject<DataTour[]>([])
  $creatTicket: Observable<DataTour[]> = this.createTicket.asObservable();

  constructor(private http: HttpClient) {
    this.api = environment.api + 'DataTour';
  }

  private log(message: string) {
    this.message.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
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
  getTicketDetils(barcode : string):Observable<DataTour> {
    return  this.http.get<DataTour>(`${this.api}`+  barcode).pipe(
      tap(_ => this.log(`fetched DataTour barcode=${barcode}`)),
      catchError(this.handleError<DataTour>(`getDataTour  barcode=${barcode}`))
    )
  }

}
