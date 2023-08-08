import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CreateTicketService } from "src/app/service/create-ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import { DataTour } from "../../../model/concert";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss']
})
export class DetailsTicketComponent implements OnInit , AfterViewInit , OnDestroy{

  @ViewChild('loadindicator') loadindicator!: any;
  ticket!: FormGroup;
  ticketDetailsSubscription!: Subscription;
  choosenBarcode: any;
  dataTour!: DataTour;
  loadingSpinner: boolean = true;
  isReadonlyInput: boolean = true;
  constructor(
    private service : CreateTicketService,
    private activatedRoute : ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    ) {
      this.choosenBarcode  = this.activatedRoute.snapshot.params['barcode'];
  }

  ngOnInit(): void {
    this.getDetailsOfTicketByBarcode();
  }

  ngAfterViewInit() {
    this.loadingTicket();
  }

  ngOnDestroy() {
    if(this.ticketDetailsSubscription ){
      this.ticketDetailsSubscription.unsubscribe();
    }
  }

    formGroupValidationTicket(){
    this.ticket = this.formBuilder.group({
      cityTourLocation: [
        {value: this.dataTour.cityTourLocation , disabled: this.isReadonlyInput},
        Validators.compose([Validators.required])],
      // Validators.pattern(this.cityPattern)]
      addressLocation: [
        {value: this.dataTour.addressLocation , disabled: this.isReadonlyInput},
       Validators.compose([Validators.required])],
        // Validators.pattern(this.addressPattern)
      tourName: [
        {value: this.dataTour.tourName , disabled: this.isReadonlyInput},
        Validators.compose([Validators.required])],
      // Validators.pattern(this.textPattern)
      tourDate: [
        {value: this.dataTour.tourDate , disabled: this.isReadonlyInput},
       Validators.compose([Validators.required])],

      priceOfTicket: [
        {value: this.dataTour.priceOfTicket , disabled:this.isReadonlyInput},
       Validators.compose([Validators.required])],
        // // Validators.pattern(this.numberPattern), Validators.min(35), Validators.max(1200)
      artistName: [
        {value:this.dataTour.artistName , disabled: this.isReadonlyInput},
       Validators.compose([Validators.required])],

      barcode: [{value: this.dataTour.barcode , disabled: this.isReadonlyInput},
       Validators.compose([Validators.required])],

      uploadedImage:[{value: '' , disabled: this.isReadonlyInput}],
    });
  }

  getDetailsOfTicketByBarcode(){
   this.ticketDetailsSubscription = this.service.getTicketDetails(this.choosenBarcode).subscribe({
      next:(resp)=>{
        this.dataTour =  {
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
        console.log(resp , ' Choosen Ticket');
      },
      error:(err)=>{
        console.log(err);
        this.loadingSpinner = false;
      },
      complete:()=>{
       this.formGroupValidationTicket();
    }
    })
  }

    // loading indicator
  loadingTicket(){
    setTimeout(()=>{
      if(this.loadindicator){
        this.formGroupValidationTicket()
        this.loadingSpinner = false;
      }else {
        this.loadingSpinner = true;
      }
    } , 500);
  }

  goBackButton(){
    this.router.navigate(['home/rihanna'])
  }


}
