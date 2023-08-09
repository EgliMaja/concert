import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataTour } from '../model/concert';
@Injectable({
  providedIn: 'root'
})

export class CreateTicketService {

  private readonly api: string;
  private createTicket: BehaviorSubject<DataTour[]> = new BehaviorSubject<DataTour[]>([]);
  $creatTicket: Observable<DataTour[]> = this.createTicket.asObservable();

  constructor(private http: HttpClient) {
    this.api = environment.api + 'DataTour';
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

}
