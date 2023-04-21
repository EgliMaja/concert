import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { concert } from 'src/app/model/concert';
import { concertService } from 'src/app/service/add-concert.service';

@Component({
  selector: 'app-add',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  public concertTicket: concert = {} as concert;
  private addTicket: BehaviorSubject<concert[]> = new BehaviorSubject<concert[]>([]);
  $addTicket: Observable<concert[]> = this.addTicket.asObservable();
  GenerateTicket: FormGroup;

  @Input()
  ToDate = new Date().toISOString().split('T')[0];

  constructor(private service: concertService, private route: Router) {
    this.GenerateTicket = new FormGroup({
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.min(35),
        Validators.max(200),
      ]),
      date: new FormControl('', [Validators.required]),
      coment: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.GenerateTicket.valueChanges.pipe(tap()).subscribe();
    this.getDataTicket();
  }

  getDataTicket() {
    this.service.getTicket().subscribe(this.addTicket);
  }

  generateTicket() {
    this.service.Ticket(this.concertTicket).subscribe({
      next: (data: concert[]) => {
        console.log(data);
        this.route.navigate(['/viewadmin']);
      },
      error: (err) => {
        console.log(err, 'Something went Weong');
      },
    });
  }
}
