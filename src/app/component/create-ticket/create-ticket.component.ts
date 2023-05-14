import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DataTour } from 'src/app/model/concert';
import { CreateTicketService } from 'src/app/service/create-ticket.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  public DataTourTicket: DataTour = {} as DataTour;
  private addTicket: BehaviorSubject<DataTour[]> = new BehaviorSubject<DataTour[]>([]);
  $addTicket: Observable<DataTour[]> = this.addTicket.asObservable();
  GenerateTicket!: FormGroup;
  tourDatas!: DataTour;
  @Input() ToDate = new Date().toISOString().split('T')[0];
  numberPattern!: '/[0-9\+\-\ ]/';
  textPattern!: '[a-zA-Z ]*';
  addressPattern!: "^[a-zA-Z0-9 .,#;:'-]{1,40}$";
  cityPattern!: '^[a-zA-Z ]{1,19}$';
  ticetCreatedSucces : boolean = false;
  ticetCreatedError : boolean = false;

  constructor(private service: CreateTicketService, private route: Router) { }

  ngOnInit(): void {
    this.validateGenerateTicketForm();
    this.GenerateTicket.valueChanges.pipe(tap()).subscribe();
    this.getDataTicket();
  }

  validateGenerateTicketForm() {
    this.GenerateTicket = new FormGroup({

      cityTourLocation: new FormControl(
        { value: '', disabled: false },
        [Validators.required, Validators.pattern(this.cityPattern)]),

      addressLocation: new FormControl(
        { value: '', disabled: false },
        [Validators.required, Validators.pattern(this.addressPattern)]),

      tourName: new FormControl(
        { value: '', disabled: false },
        [Validators.required, Validators.pattern(this.textPattern)]),

      tourDate: new FormControl(
        { value: this.ToDate, disabled: false },
        [Validators.required]),

        priceOfTicket: new FormControl(
        { value: '', disabled: false },
        [Validators.required, Validators.pattern(this.numberPattern), Validators.min(35), Validators.max(1200)]),

      barcode: new FormControl(
        { value: '', disabled: false },
        [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(15)]),

      uploadedImage: new FormControl(
        { value: '', disabled: false }, Validators.required),

      artistName: new FormControl(
        { value: '', disabled: false },
        [Validators.required, Validators.pattern(this.textPattern)]),
    });
  }

// Get All Created Tickets
  getDataTicket() {
    this.service.getTicket().subscribe({
      next: (res) => {
        this.tourDatas = res;
        console.log(res, 'Tour Tickets');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Generate | Create Ticket
  generateTicket(Data: any) {
    this.tourDatas = {
      cityTourLocation: Data.cityTourLocation,
      tourName: Data.tourName,
      tourDate: Data.tourDate,
      priceOfTicket: Data.priceOfTicket,
      barcode: Data.barcode,
      uploadedImage: Data.uploadedImage,
      addressLocation: Data.addressLocation,
      artistName: Data.artistName,
    } as DataTour;
    this.service.createTour(this.tourDatas).subscribe({
      next: (res) => {
        this.ticetCreatedSucces = true;
        console.log(res, 'Ticket : ')
      },
      error: (err) => {
        this.ticetCreatedError = true;
        console.log(err, 'Something went Weong');
      },
    });
  }

  // Get Validation Properties to show the error for UI
  get cityTourLocation() { return this.GenerateTicket.get('cityTourLocation') } ;
  get addressLocation() { return this.GenerateTicket.get('addressLocation') };
  get tourName() { return this.GenerateTicket.get('tourName') };
  get tourDate() { return this.GenerateTicket.get('tourDate') };
  get priceOfTicket() { return this.GenerateTicket.get('priceOfTicket') };
  get barcode() { return this.GenerateTicket.get('barcode') };
  get uploadedImage() { return this.GenerateTicket.get('uploadedImage') };
  get artistName() { return this.GenerateTicket.get('artistName') }

}
