import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateTicketService } from "../../../../../../service/create-ticket.service";
import { Subject,takeUntil } from "rxjs";
import { DataTour } from "../../../../../../model/concert.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class TicketListComponent implements OnInit , AfterViewInit , OnDestroy {

  @ViewChild('listOfTickets') listOfTicket : any;
  @Input() loadingSpinner!: boolean;
  totalTickets: any;
  barcodePaths!: any[];
  choosenBarcode: any;
  ticket!: "";
  page: number = 1;
  ticketPerPage: number = 5;
  ticketDetails: DataTour[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();
  searchTicket!: FormGroup;

  constructor(
      private service: CreateTicketService,
      private router: Router,
      private activatedRoute : ActivatedRoute,
      private  _snackBar: MatSnackBar,
      )
  {
    this.choosenBarcode = this.activatedRoute.snapshot.params['barcode'];
  }

  ngOnInit(): void {
    this.getDataTicket();
    this.searchForm();
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
        this.loadingSpinner = false;
        this.openSnackBar(err.message , "Close")
      },
     complete:() => {
        this.searchTicket?.patchValue(this.ticketDetails);
     }
    });
  }

  // search form validator
  searchForm() {
    this.searchTicket = new FormGroup({
      cityTourLocation: new FormControl('', Validators.required),
    })
  }

  // loading indicator
  loadingTickets(){
    setTimeout(()=>{
      this.loadingSpinner = !(this.listOfTicket && this.ticketDetails);
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
