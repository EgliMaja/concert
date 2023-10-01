import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataTour } from '../model/concert';
@Injectable({
  providedIn: 'root'
})

export class CreateTicketService {

  private readonly api: string;
    private createTicket: BehaviorSubject<DataTour[]>;
    $ticket : Observable<DataTour[]>;
    dataTour!: DataTour;
  constructor(
    private http: HttpClient,
  ) {
    this.api = environment.api + 'DataTour';
    this.createTicket = new BehaviorSubject<DataTour[]>([]);
    this.$ticket = this.createTicket.asObservable();
  }


  //  Display data for DataTour
  getDataCreatedTicket(): Observable<DataTour[]> {
    return this.http.get<DataTour[]>(`${this.api}`);
  }

  // Create new data for DataTour
  createTour(DataTour: Omit<DataTour, 'id'>): Observable<DataTour> {
    return this.http.post<DataTour>(`${this.api}`, DataTour);
  }


  // Get the details of created ticket by barcode param
  getTicketDetails(barcode: string ): Observable<DataTour[]> {
    return this.http.get<DataTour[]>(`${this.api}?barcode=${barcode}`);
  }

//  Modify the ticket
  updateSelectedTicket(dataTour:DataTour): Observable<DataTour>{
  return this.http.put<DataTour>((this.api)+'/'+dataTour.id , dataTour );
  }

// Delete the ticket
  deleteTicket(dataTour: DataTour): Observable<DataTour[]> {
    return this.http.delete<DataTour[]>((this.api)+'/'+dataTour.id)
  }

}

