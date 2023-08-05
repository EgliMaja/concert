import { Component, OnInit } from '@angular/core';
import { CreateTicketService } from "src/app/service/create-ticket.service";
import { ActivatedRoute } from "@angular/router";
import { DataTour } from "../../../model/concert";

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss']
})
export class DetailsTicketComponent implements OnInit {

  choosenBarcode: any;
  dataTour! : DataTour;


  constructor(
    private service : CreateTicketService,
    private activatedRoute : ActivatedRoute,
    ) {
    const ticketBarcode = this.activatedRoute.snapshot.params['barcode'];
    this.choosenBarcode = ticketBarcode;
  }

  ngOnInit(): void {
    this.getDetailsOfTicketByBarcode();
  }

  getDetailsOfTicketByBarcode(){
    this.service.getTicketDetails(this.choosenBarcode).subscribe({
      next:(resp)=>{
        if(this.choosenBarcode){
          this.dataTour = {
            tourName: resp.tourName,
            tourDate: resp.tourDate,
            priceOfTicket: resp.priceOfTicket,
            barcode: resp.barcode,
            uploadedImage: resp.uploadedImage,
            addressLocation: resp.addressLocation,
            cityTourLocation: resp.cityTourLocation,
            artistName: resp.artistName,
            id: resp.id
          } as DataTour;
        }
          console.log(this.service.$creatTicket , ' Ticket');
          console.log(resp , ' Choosen Ticket');
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



}
