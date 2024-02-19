import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateTicketService } from "../../../../../../service/create-ticket.service";
import { Subject,takeUntil } from "rxjs";
import { DataTour } from "../../../../../../model/concert.model";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit , AfterViewInit , OnDestroy {

  @ViewChild('listOfTickets') listOfTicket : any;
  choosenBarcode: any;
  ticket!: "";
  page: number = 1;
  ticketPerPage: number = 5;
  ticketList: DataTour[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
      private service: CreateTicketService,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private  _snackBar: MatSnackBar,
      private cd: ChangeDetectorRef,
      )
  {
    this.choosenBarcode = this.activatedRoute.snapshot.params['barcode'];
  }

  ngOnInit(): void {
    this.getDataTicket();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // Get All Created Tickets
  getDataTicket() {
   this.service.getDataCreatedTicket().pipe( takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.ticketList = res;
      },
      error: (err) => {
        this.openSnackBar(err.message , "Close")
      },
    });
  }

  navigateDetailsOfTicket(barcode: any){
    this.router.navigate(['home/ticket/'+ barcode])
  }

  // Notifications
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
