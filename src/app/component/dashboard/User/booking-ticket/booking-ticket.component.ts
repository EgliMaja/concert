import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DataTour} from "../../../../model/concert.model";
import {CreateTicketService} from "../../../../service/create-ticket.service";
import {Subject, takeUntil} from "rxjs";
import {TypeOfTicketsModel} from "../../../../model/ticket.model";

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.scss'],
})

export class BookingTicketComponent implements OnInit , AfterViewInit , OnDestroy {

  @ViewChild('MatStepper') MatStepper : any;
  ticketFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  loadingSpinner: boolean = true;
  choosenBarcode!: string;
  dataTour!: DataTour;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  numberOfTickets: number[] = [ 1 , 2, 3 ,4 ,5 ];
  typeOfTickets: TypeOfTicketsModel[] = [
    TypeOfTicketsModel.Believer_GA_Ticket,
    TypeOfTicketsModel.Early_Bird_GA_Ticket,
    TypeOfTicketsModel.Regular_GA_Tickets,
    TypeOfTicketsModel.VIP_Ticket
  ]
  ticketPrice!: number;

  constructor(
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private create_service: CreateTicketService,
      ) {
    this.choosenBarcode = this.activatedRoute.snapshot.params['barcode'];
  }

  ngOnInit(): void {
    this.getDetailsOfTicketByBarcode();
    this.initializeFormGroupTicket();
    this.secondFormGroup = this.formBuilder.group({});
  }

  ngAfterViewInit() {
    this.loadingData();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getDetailsOfTicketByBarcode() {
    this.create_service.getTicketDetails(this.choosenBarcode).pipe(
        takeUntil(this.destroy$.asObservable())).subscribe({
      next: (res) => {
        this.dataTour = {
          tourName: res[0]?.tourName,
          tourDate: res[0]?.tourDate,
          priceOfTicket: res[0]?.priceOfTicket,
          barcode: res[0]?.barcode,
          uploadedImage: res[0]?.uploadedImage,
          addressLocation: res[0]?.addressLocation,
          cityTourLocation: res[0]?.cityTourLocation,
          artistName: res[0]?.artistName,
          id: res[0]?.id
        } as DataTour;
        this.ticketPrice = this.dataTour.priceOfTicket;
      },
      error: (err) => {
        console.log(err);
        this.loadingSpinner = false;
      },
      complete:() =>{
        this.ticketFormGroup?.patchValue(this.dataTour);
      }
    })
  }


  initializeFormGroupTicket(){
    this.ticketFormGroup = this.formBuilder.group({
      tourName: [{value: this.dataTour?.tourName, disabled: true}, [Validators.required]],
      tourDate: [{value: this.dataTour?.tourDate, disabled: true}, [Validators.required]],
      artistName: [{value: this.dataTour?.artistName, disabled: true}, [Validators.required] ],
      numberTickets: new FormControl('' ,  [Validators.required]),
      ticketType: new FormControl('' ,  [Validators.required]),
      priceOfTicket: [{value: this.dataTour?.addressLocation, disabled: true}, [Validators.required] ]
    });
  }

  get ticketType() { return this.ticketFormGroup.get('numberTickets')?.value };
  get numbertickets() { return this.ticketFormGroup.get('ticketType')?.value };
  get priceOfTicket() { return this.ticketFormGroup.get('priceOfTicket') }

  enableForm() {
    this.ticketFormGroup.enable();
    this.ticketFormGroup.get('priceOfTicket')?.disable();
  }

  loadingData(){
    setTimeout(()=>{
      this.loadingSpinner = !(this.dataTour );
    } , 1000);
  }

  onChangesInputValues() {
  //   Believer , Early , Believer , Vip 50 100
    if ( this.ticketType === TypeOfTicketsModel.Believer_GA_Ticket ) {
      this.ticketPrice  = this.ticketPrice  * +this.numbertickets;
      this.priceOfTicket?.updateValueAndValidity({});
      this.priceOfTicket?.setValue(this.ticketPrice );
      console.log(this.ticketPrice )
    }
    if ( this.ticketType === TypeOfTicketsModel.Early_Bird_GA_Ticket ) {
      this.ticketPrice  = (this.ticketPrice  * +this.numbertickets) + 30;
      this.priceOfTicket?.updateValueAndValidity({});
      this.priceOfTicket?.setValue(this.ticketPrice );
      console.log(this.ticketPrice )
    }
    if ( this.ticketType === TypeOfTicketsModel.Regular_GA_Tickets ) {
      this.ticketPrice  = (this.ticketPrice  * +this.numbertickets) + 50;
      this.priceOfTicket?.updateValueAndValidity({});
      this.priceOfTicket?.setValue(this.ticketPrice );
      console.log(this.ticketPrice )
    }
    if ( this.ticketType === TypeOfTicketsModel.VIP_Ticket)  {
      this.ticketPrice  = (this.ticketPrice  * +this.numbertickets) + 100;
      this.priceOfTicket?.updateValueAndValidity({});
      this.priceOfTicket?.setValue(this.ticketPrice );
      console.log(this.ticketPrice )
    }

    console.log(this.ticketPrice , 'Price of Ticket')
    console.log(this.ticketType , 'Ticket Type')
    console.log(this.numbertickets , 'Number Tickets')

  }


  protected readonly JSON = JSON;
}
