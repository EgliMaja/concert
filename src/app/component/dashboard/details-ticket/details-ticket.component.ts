import { Component, OnInit } from '@angular/core';
import { CreateTicketService } from "../../../service/create-ticket.service";
import { ActivatedRoute } from "@angular/router";
import { DataTour } from "../../../model/concert";

@Component({
  selector: 'app-details-ticket',
  templateUrl: './details-ticket.component.html',
  styleUrls: ['./details-ticket.component.scss']
})
export class DetailsTicketComponent implements OnInit {

  // id: number;
  choosenBarcode: string;
  dataTour! : DataTour;
  datasTour : DataTour[] = [];

  constructor(
    private service : CreateTicketService,
    private activatedRoute : ActivatedRoute,
    ) {
    this.choosenBarcode = this.activatedRoute.snapshot.params['barcode'];
  }

  ngOnInit(): void {
    this.getDetailsOfTicketByBarcode();
  }

  getDetailsOfTicketByBarcode(){
    this.service.getTicketDetils(this.choosenBarcode).subscribe({
      next:(res)=>{
          this.dataTour = res;
          console.log(res , 'Choosen Ticket');
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }



}
