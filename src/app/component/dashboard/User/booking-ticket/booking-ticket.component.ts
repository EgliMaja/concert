import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DataTour } from "../../../../model/interface/concert.model";
import { CreateTicketService } from "../../../../service/create-ticket.service";
import { Subject, takeUntil } from "rxjs";
import { PriceOfTicketPerType, TypeOfTicketsModel } from "../../../../model/interface/ticket.model";
import { CurrencyPipe } from "../../../../pipes/currency.pipe";

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.scss'],
  providers: [CurrencyPipe]
})

export class BookingTicketComponent implements OnInit , OnDestroy , AfterViewInit {

  @ViewChild('MatStepper') MatStepper : any;
  ticketFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  choosenBarcode!: string;
  registeredTicketPrice!: number;
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
  protected readonly JSON = JSON;
  language = sessionStorage.getItem('lang');

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


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.ticketFormGroup.get('numberTickets')?.valueChanges.subscribe(() => {
      this.onChangesInputValues();
    });

    this.ticketFormGroup.get('ticketType')?.valueChanges.subscribe(() => {
      this.onChangesInputValues();
    });
  }

  initializeFormGroupTicket(){
    this.ticketFormGroup = this.formBuilder.group({
      tourName: [{value: this.dataTour?.tourName, disabled: true}, [Validators.required]],
      tourDate: [{value: this.dataTour?.tourDate, disabled: true}, [Validators.required]],
      artistName: [{value: this.dataTour?.artistName, disabled: true}, [Validators.required] ],
      ticketType: [{value: TypeOfTicketsModel.Believer_GA_Ticket , disabled: true},  [Validators.required]],
      numberTickets:[{value: 1, disabled: true},  [Validators.required]],
      priceOfTicket: [{value: this.dataTour?.priceOfTicket, disabled: true}, [Validators.required] ]
    });
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
      },
      complete:() =>{
        this.ticketFormGroup?.patchValue(this.dataTour);
      }
    })
  }


  get ticketType() { return this.ticketFormGroup.get('ticketType')?.value };
  get numbertickets() { return this.ticketFormGroup.get('numberTickets')?.value };
  get priceOfTicket() { return this.ticketFormGroup.get('priceOfTicket') }

  enableForm() {
    this.ticketFormGroup.enable();
    this.priceOfTicket?.disable();
    this.ticketFormGroup.get('tourName')?.disable();
    this.ticketFormGroup.get('artistName')?.disable();
    this.ticketFormGroup.get('tourDate')?.disable();
  }

  clickTicketType(){
    const numberTicketsControl = this.ticketFormGroup.get('numbertickets');
    numberTicketsControl?.enable();
    numberTicketsControl?.updateValueAndValidity();
  }


  onChangesInputValues() {
    const ticketType = this.ticketFormGroup.get('ticketType')?.value;
    const numberOfTickets = this.ticketFormGroup.get('numberTickets')?.value;

    if (!ticketType || !numberOfTickets) {
      this.ticketFormGroup.get('priceOfTicket')?.setValue(0);
      return;
    }

    let pricePerTicket = 0;

    switch (ticketType) {
      case TypeOfTicketsModel.Believer_GA_Ticket:
        pricePerTicket = PriceOfTicketPerType.Believer_GA_Ticket;
        break;
      case TypeOfTicketsModel.Early_Bird_GA_Ticket:
        pricePerTicket = PriceOfTicketPerType.Early_Bird_GA_Ticket;
        break;
      case TypeOfTicketsModel.Regular_GA_Tickets:
        pricePerTicket = PriceOfTicketPerType.Regular_GA_Tickets;
        break;
      case TypeOfTicketsModel.VIP_Ticket:
        pricePerTicket = PriceOfTicketPerType.VIP_Ticket;
        break;
      default:
        pricePerTicket = 0;
        break;
    }

    const totalPrice = numberOfTickets * (this.ticketPrice + pricePerTicket);
    this.ticketFormGroup.get('priceOfTicket')?.setValue(totalPrice);
  }

}
