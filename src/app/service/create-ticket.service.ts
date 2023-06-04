import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataTour } from '../model/concert';
@Injectable({
  providedIn: 'root'
})

export class CreateTicketService {

  private api: string;
  private createTicket: BehaviorSubject<DataTour[]> = new BehaviorSubject<DataTour[]>([])
  $creatTicket: Observable<DataTour[]> = this.createTicket.asObservable();

  constructor(private http: HttpClient) {
    this.api = environment.api + 'DataTour';
  }

  //  display data for DataTour
  getDataCreatedTicket(): Observable<DataTour[]> {
    return this.http.get<DataTour[]>(`${this.api}`);
  }

  // create new data for DataTour
  createTour(DataTour: Omit<DataTour, 'id'>): Observable<DataTour> {
    return this.http.post<DataTour>(`${this.api}`, DataTour);
  }

}
