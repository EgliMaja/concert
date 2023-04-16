import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { concert } from '../model/concert';

@Injectable({
  providedIn: 'root'
})

export class concertService {

  private api: string;
  private addTicket: BehaviorSubject<concert[]> = new BehaviorSubject<concert[]>([])
  $addTicket: Observable<concert[]> = this.addTicket.asObservable();

  constructor(private http: HttpClient) {
    this.api = environment.api + 'concert';
  }

  //  display data for concert
  getTicket(): Observable<concert[]> {
    return this.http.get<concert[]>(`${this.api}`)
      .pipe(
        tap(cli => this.addTicket.next(cli))
      )
  }

  // add new data for concert
  Ticket(concert: Omit<concert, 'id'>): Observable<concert[]> {
    return this.http.post<concert[]>(`${this.api}`, concert);
  }

}
