import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataTour } from '../model/concert.model';
import { EndpointAPIService } from "./endpointAPI.service";

@Injectable({
  providedIn: 'root'
})

export class CreateTicketService  extends EndpointAPIService {

  dataTour!: DataTour;
  private dataTourBehaviorSubject: BehaviorSubject<DataTour>  = new BehaviorSubject<DataTour>(this.dataTour);
  $ticket = this.dataTourBehaviorSubject.asObservable();

  constructor( private http: HttpClient) {
    super();
  }


  //  Display data for DataTour
  getDataCreatedTicket(): Observable<DataTour[]> {
    const endpoint = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_GET_ALL_TICKET );
    return this.http.get<DataTour[]>(`${endpoint}`);
  }

  // Create new data for DataTour
  createTour(DataTour: Omit<DataTour, 'id'>): Observable<DataTour> {
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_CREATE_TICKET );
    return this.http.post<DataTour>(`${endpoint}`, DataTour);
  }


  // Get the details of created ticket by barcode param
  getTicketDetails(barcode: string ): Observable<DataTour[]> {
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_GET_TICKET_DETAILS );
    let queryParams: HttpParams = new HttpParams();
    queryParams = queryParams.set('?barcode' , barcode);
    return this.http.get<DataTour[]>(`${endpoint}${queryParams}`);
  }

//  Modify the ticket
  updateSelectedTicket(dataTour:DataTour): Observable<DataTour> {
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_UPDATE_TICKET );
    return this.http.put<DataTour>((endpoint)+'/'+dataTour.id , dataTour );
  }


// Delete the ticket
  deleteTicket(dataTour: DataTour): Observable<DataTour[]> {
    const endpoint: string = this.getEndpoint( EndpointAPIService.ENDPOINT_NAME_DELETE_TICKET );
    return this.http.delete<DataTour[]>((endpoint)+'/'+dataTour.id)
  }

}

