import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { CreateTicketService } from "../../../../service/create-ticket.service";
import { Router } from "@angular/router";
import { DataTour } from "../../../../model/concert";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})

export class TourListComponent implements OnInit , AfterViewInit , OnDestroy{

  @ViewChild('listOfTours') listOfTours : any;
  dataTour: DataTour[] = [];
  loadingSpinner: boolean = true;
  page: number = 1;
  ticketPerPage: number = 8;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private service: CreateTicketService,
    private _router: Router,
    private  _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getTours();
  }

  ngAfterViewInit() {
    this.loadingTickets();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // Get All List of Tours
  getTours() {
    this.service.getDataCreatedTicket().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (res) => {
        this.dataTour = res;
        this.loadingSpinner = false;
      },
      error: (err) => {
        this.loadingSpinner = false;
        this.openSnackBar(err.message , "Close");
      }
    });
  }

  // Notifications
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  // loading indicator
  loadingTickets(){
    setTimeout(()=>{
      if(this.listOfTours){
        this.loadingSpinner = false;
      }
      else {
        this.loadingSpinner = true;
      }
    } , 500);
  }

  navigateDetailsOfTour(barcode: any){
    this._router.navigate(['home/ticket/'+ barcode])
  }

}
