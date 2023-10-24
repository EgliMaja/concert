import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateTicketService } from "src/app/service/create-ticket.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { DataTour } from "../../../../../../model/concert.model";
import { MatDialog } from "@angular/material/dialog";
import { DeleteTicketComponent } from "../delete-ticket/delete-ticket.component";
import { DataSharingService } from "../../../../../../service/data-sharing.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ValidatorsRegexPatterns } from "../../../../../../function/function-validator";

@Component({
    selector: 'app-details-ticket',
    templateUrl: './details-ticket.component.html',
    styleUrls: ['./details-ticket.component.scss']
})
export class DetailsTicketComponent implements OnInit, AfterViewInit, OnDestroy {

 @ViewChild('ticketDetails') ticket!: any;
 ticketFormGroup!: FormGroup;
 ticketDetailsSubject: Subject<boolean> = new Subject<boolean>();
 choosenBarcode: any;
 dataTour!: DataTour;
 loadingSpinner: boolean = true;
 isReadonlyInput!: boolean;
 isCheckedModify: boolean = false;

 constructor(
    private service: CreateTicketService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dataSharingService: DataSharingService,
    private  _snackBar: MatSnackBar,
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
     this.ticketDetailsSubject.complete();
 }

 formGroupValidationTicket() {
   let regex_pattern = new ValidatorsRegexPatterns();
     this.ticketFormGroup = this.formBuilder.group({
         cityTourLocation: [
             {value: this.dataTour.cityTourLocation, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(regex_pattern.cityPattern)])],

         addressLocation: [
             {value: this.dataTour.addressLocation, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(regex_pattern.addressPattern)])],

         tourName: [
             {value: this.dataTour.tourName, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(regex_pattern.textPattern)])],

         tourDate: [
             {value: this.dataTour.tourDate, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required])],

         priceOfTicket: [
             {value: this.dataTour.priceOfTicket, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.pattern(regex_pattern.numberPattern),
                 Validators.min(35), Validators.max(1200)])],

         artistName: [
             {value: this.dataTour.artistName, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required])],

         barcode: [{value: this.dataTour.barcode, disabled: this.isReadonlyInput},
             Validators.compose([Validators.required, Validators.minLength(16),
                 Validators.maxLength(16), Validators.pattern(regex_pattern.numberPattern)])],

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
        if (this.ticket) {
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
          this.openSnackBar("Ticket with barcode:" + this.choosenBarcode + " is Updated Sucessfuly" , "Close");
        },
        error: (err) => {
          this.openSnackBar( err.message , "Close")
        },
        complete:()=>{
            this.onClickCancel();
        }
    })
 }


  // Notifications
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
