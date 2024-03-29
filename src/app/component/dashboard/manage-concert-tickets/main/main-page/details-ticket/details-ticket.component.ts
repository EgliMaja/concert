import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CreateTicketService } from "src/app/service/create-ticket.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {Subject, Subscription, takeUntil} from "rxjs";
import { DataTour } from "../../../../../../model/concert";
import { MatDialog } from "@angular/material/dialog";
import { DeleteTicketComponent } from "../delete-ticket/delete-ticket.component";
import {DataSharingService} from "../../../../../../service/data-sharing.service";

@Component({
    selector: 'app-details-ticket',
    templateUrl: './details-ticket.component.html',
    styleUrls: ['./details-ticket.component.scss']
})
export class DetailsTicketComponent implements OnInit, AfterViewInit, OnDestroy {

 @ViewChild('loadindicator') loadindicator!: any;
 ticketFormGroup!: FormGroup;
 ticketDetailsSubject: Subject<boolean> = new Subject<boolean>();
 choosenBarcode: any;
 dataTour!: DataTour;
 loadingSpinner: boolean = true;
 isReadonlyInput!: boolean;
 isCheckedModify: boolean = false;
 textPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ\\s\\-\\+\\&\\,\\.\']+';
 numberPattern = '^-?[0-9]\\d*(\\,\\d{1,2})?$';
 addressPattern = '^[A-Za-z0-9 ,.-]+$';
 cityPattern!: '^[a-zA-Z ]{1,19}$';
 constructor(
    private service: CreateTicketService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dataSharingService: DataSharingService,
 )
 {
    this.choosenBarcode = this.activatedRoute.snapshot.params['barcode'];
    this.isReadonlyInput = true;
 }

 ngOnInit(): void {
    this.getDetailsOfTicketByBarcode();
 }

 ngAfterViewInit() {
    this.loadingTicket();
 }

 ngOnDestroy() {
     this.ticketDetailsSubject.next(true);
     this.ticketDetailsSubject.unsubscribe();
 }

 formGroupValidationTicket() {
     this.ticketFormGroup = this.formBuilder.group({
         cityTourLocation: [
             {value: this.dataTour.cityTourLocation, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(this.cityPattern)])],

         addressLocation: [
             {value: this.dataTour.addressLocation, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(this.addressPattern)])],

         tourName: [
             {value: this.dataTour.tourName, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(this.textPattern)])],

         tourDate: [
             {value: this.dataTour.tourDate, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required])],

         priceOfTicket: [
             {value: this.dataTour.priceOfTicket, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(this.numberPattern),
                 Validators.min(35), Validators.max(1200)])],

         artistName: [
             {value: this.dataTour.artistName, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required])],

         barcode: [{value: this.dataTour.barcode, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.minLength(16),
                 Validators.maxLength(16), Validators.pattern(this.numberPattern)])],

         uploadedImage: [{value: '', disabled: this.isReadonlyInput}],
     });
 }

 getDetailsOfTicketByBarcode() {
     this.service.getTicketDetails(this.choosenBarcode).pipe(
         takeUntil(this.ticketDetailsSubject)).subscribe({
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
            this.loadingSpinner = false;
            console.log(resp, ' Choosen Ticket');
        },
        error: (err) => {
            console.log(err);
            this.loadingSpinner = false;
        },
        complete: () => {
            this.formGroupValidationTicket();
        }
    })
 }

// loading indicator
 loadingTicket() {
    setTimeout(() => {
        if (this.loadindicator) {
            this.formGroupValidationTicket()
            this.loadingSpinner = false;
        } else {
            this.loadingSpinner = true;
        }
    }, 500);
 }

 goBackButton() {
   return  this.router.navigate(['home/rihanna'])
 }

 onClickModify() {
  this.isCheckedModify = true;
  this.isReadonlyInput = false;
  this.cityTourLocation?.enable();
  this.addressLocation?.enable();
  this.tourName?.enable();
  this.tourDate?.enable();
  this.priceOfTicket?.enable();
  this.artistName?.enable();
 }

 onClickCancel() {
  this.isCheckedModify = false;
  this.isReadonlyInput = true;
  this.cityTourLocation?.disable();
  this.addressLocation?.disable();
  this.tourName?.disable();
  this.tourDate?.disable();
  this.priceOfTicket?.disable();
  this.artistName?.disable();
  this.formGroupValidationTicket();
 }

//Update the ticket
 modifyTicket(ticketData: any) {
    this.dataTour = {
        tourName: ticketData.tourName,
        tourDate: ticketData.tourDate,
        priceOfTicket: ticketData.priceOfTicket,
        barcode: this.choosenBarcode,
        uploadedImage: this.dataTour?.uploadedImage,
        addressLocation: ticketData.addressLocation,
        cityTourLocation: ticketData.cityTourLocation,
        artistName: ticketData.artistName,
        id: this.dataTour?.id
    } as DataTour;
    this.service.updateSelectedTicket(this.dataTour).subscribe({
        next: () => {
            alert("Ticket with barcode:" + this.choosenBarcode + " is Updated Sucessfuly");
        },
        error: (err) => {
            alert(err + "System Error");
        },
        complete:()=>{
            this.onClickCancel();
        }
    })
 }


// Get Validation Properties to show the error for UI
 get cityTourLocation() { return this.ticketFormGroup.get('cityTourLocation') };
 get addressLocation() { return this.ticketFormGroup.get('addressLocation') };
 get tourName() { return this.ticketFormGroup.get('tourName') };
 get tourDate() { return this.ticketFormGroup.get('tourDate') };
 get priceOfTicket() { return this.ticketFormGroup.get('priceOfTicket') };
 get artistName() { return this.ticketFormGroup.get('artistName') };
 get barcode() { return this.ticketFormGroup.get('barcode') };


  openDialog(){
      this.dialog.open(DeleteTicketComponent);
      this.dataSharingService.setData(this.dataTour);
  }


}
