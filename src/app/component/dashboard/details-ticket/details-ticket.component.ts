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

  // id: number;
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
      next:(res)=>{
          this.dataTour = {
            tourName: res.tourName,
            tourDate: res.tourDate,
            priceOfTicket: res.priceOfTicket,
            barcode: res.barcode,
            uploadedImage: res.uploadedImage,
            addressLocation: res.addressLocation,
            cityTourLocation: res.cityTourLocation,
            artistName: res.artistName,
            id: res.id
          } as DataTour;
          console.log(this.service.$creatTicket , ' Ticket');
          console.log(res , ' Choosen Ticket');
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



}
