import { Component, OnInit } from '@angular/core';
import { CreateTicketService } from "../../../../../../service/create-ticket.service";
import { Router } from "@angular/router";
import { DataTour } from "../../../../../../model/concert.model";
import { DataSharingService } from "../../../../../../service/data-sharing.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-delete-ticket',
  template: `
      <!--Delete Confirmation Popup-->
      <div class="container">
          <h1 mat-dialog-title class="text-danger">Delete Ticket</h1>
          <div mat-dialog-content>Are you sure that you wont to delete the ticket ?<br>
              <div class="d-flex justify-content-center">
                  Barcode:&nbsp;<span class="text-danger">{{ dataTour.barcode}}</span>
              </div>
          </div>
          <div class="row">
              <div class="col-6 d-flex justify-content-start">
                  <div mat-dialog-actions>
                      <button mat-button mat-dialog-close>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                          <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"/>
                        </svg>
                        Close
                      </button>
                  </div>
              </div>
              <div class="col-6 d-flex justify-content-end">
                  <div mat-dialog-actions>
                      <button mat-raised-button color="warn" (click)="deleteTicket()">
                        Sure
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             class="bi bi-trash3-fill" viewBox="0 0 16 16">
                          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                      </button>
                  </div>
              </div>
          </div>
      </div>
  `,
  styleUrls: ['./delete-ticket.component.scss']
})
export class DeleteTicketComponent implements OnInit {

  dataTour!: DataTour;

  constructor(
    private service: CreateTicketService ,
    private router: Router,
    private dataSharingService: DataSharingService,
    public dialogRef: MatDialogRef<DeleteTicketComponent>
    ) {}

  ngOnInit(): void {
    this.dataTour = this.dataSharingService.getData();
    console.log(this.dataTour , 'Ticket To Delete')
  }

  deleteTicket() {
    this.service.deleteTicket(this.dataTour).subscribe({
      next: () => {
        alert('Success!');
      },
      error: (err) => {
        console.log(err, 'Ticket Not Deleted');
        alert('Error');
      },
      complete: () => {
        this.dialogRef.close();
        return this.router.navigate(['home/rihanna']);
      },
    });
  }

}
