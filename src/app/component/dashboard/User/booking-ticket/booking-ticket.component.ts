import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DataTour } from "../../../../model/concert.model";
import { CreateTicketService } from "../../../../service/create-ticket.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-booking-ticket',
  templateUrl: './booking-ticket.component.html',
  styleUrls: ['./booking-ticket.component.scss'],
})

export class BookingTicketComponent implements OnInit  {

  ticketFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isEditable = false;
  loadingSpinner: boolean = true;
  choosenBarcode!: string;
  dataTour!: DataTour;
  private destroy$: Subject<boolean> = new Subject<boolean>();

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

  getDetailsOfTicketByBarcode() {
    this.create_service.getTicketDetails(this.choosenBarcode).pipe(
        takeUntil(this.destroy$.asObservable())).subscribe({
      next: (resp) => {
        this.dataTour = {
          tourName: resp[0]?.tourName,
          tourDate: resp[0]?.tourDate,
          priceOfTicket: resp[0]?.priceOfTicket,
          barcode: resp[0]?.barcode,
          uploadedImage: resp[0]?.uploadedImage,
          addressLocation: resp[0]?.addressLocation,
          cityTourLocation: resp[0]?.cityTourLocation,
          artistName: resp[0]?.artistName,
          id: resp[0]?.id
        } as DataTour;
      },
      error: (err) => {
        console.log(err);
      },
      complete:() =>{
        this.ticketFormGroup?.patchValue(this.dataTour)
      }
    })
  }


  initializeFormGroupTicket(){
    this.ticketFormGroup = this.formBuilder.group({
      tourName: [
        {value: this.dataTour?.tourName, disabled: true},
        Validators.compose([Validators.required])],

      tourDate: [
        {value: this.dataTour?.tourDate, disabled: true},
        Validators.compose([Validators.required])],

      artistName: [
        {value: this.dataTour?.artistName, disabled: true},
        Validators.compose([Validators.required])],
    });
  }



}
