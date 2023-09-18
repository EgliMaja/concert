import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateTicketService } from "../../../../../../service/create-ticket.service";
import { Subject,takeUntil } from "rxjs";
import { DataTour } from "../../../../../../model/concert";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ErrorHandleService } from "../../../../../../service/error-handle.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit , AfterViewInit , OnDestroy {

  @ViewChild('listOfTickets') listOfTicket : any;
  totalTickets: any;
  barcodePaths!: any[];
  choosenBarcode: any;
  ticket!: "";
  page: number = 1;
  ticketPerPage: number = 5;
  loadingSpinner: boolean = true;
  ticketDetails: DataTour[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  searchTicket!: FormGroup;

  constructor(
      private service: CreateTicketService,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private errorService: ErrorHandleService,
      private  _snackBar: MatSnackBar,
      )
  {
    this.choosenBarcode = this.activatedRoute.snapshot.params['barcode'];
  }

  ngOnInit(): void {
    this.getDataTicket();
    this.searchValidator();
  }

  ngAfterViewInit() {
    this.loadingTickets();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // Get All Created Tickets
  getDataTicket() {
   this.service.getDataCreatedTicket().pipe(
       takeUntil(this.destroy$)
   ).subscribe({
      next: (res) => {
        this.ticketDetails = res;
        this.totalTickets = res?.length;
        this.barcodePaths = Array(res.map((el)=>{el.barcode}));
        this.loadingSpinner = false;
      },
      error: (err) => {
        this.errorService.getErrorMessage(err)
        this.loadingSpinner = false;
        this.openSnackBar(err.message , "Close")
      }
    });
  }

  // search form validator
  searchValidator() {
    this.searchTicket = new FormGroup({
      cityTourLocation: new FormControl('', Validators.required),
    })
  }

  // loading indicator
  loadingTickets(){
    setTimeout(()=>{
      if(this.listOfTicket){
        this.loadingSpinner = false;
        return  this.totalTickets;
      }
      else {
        this.loadingSpinner = true;
      }
      //!this.listOfTicket;
    } , 500);
  }

  navigateDetailsOfTicket(barcode: any){
    this.router.navigate(['home/ticket/'+ barcode])
  }

  // Notifications
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
