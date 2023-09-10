import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTour } from 'src/app/model/concert';
import { CreateTicketService } from 'src/app/service/create-ticket.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  providers: [CreateTicketService]
})
export class CreateTicketComponent implements OnInit {

  subscription!: Subscription;
  GenerateTicket!: FormGroup;
  tourDatas!: DataTour;
  @Input() ToDate = new Date().toISOString().split('T')[0];
  textPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ\\s\\-\\+\\&\\,\\.\']+';
  numberPattern = '^-?[0-9]\\d*(\\,\\d{1,2})?$';
  addressPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\\s[a-zA-ZÀ-ÖØ-öø-ÿ]+),\\s\\d{1,4}(?:\\/\\d{1,4})?\\s*[a-zA-ZÀ-ÖØ-öø-ÿ]*$';
  cityPattern!: '^[a-zA-Z ]{1,19}$';
  ticetCreatedSucces: boolean = false;
  ticetCreatedError: boolean = false;
  selectedFile: any;

  constructor(  private service: CreateTicketService , private  _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.validateGenerateTicketForm();
  }

    validateGenerateTicketForm() {
    this.GenerateTicket = new FormGroup({

      cityTourLocation: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(this.cityPattern)]),

      addressLocation: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(this.addressPattern)]),

      tourName: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(this.textPattern)]),

      tourDate: new FormControl(
        {value: this.ToDate, disabled: false},
        [Validators.required]),

      priceOfTicket: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(this.numberPattern), Validators.min(35), Validators.max(1200)]),

      barcode: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.min(1000000000000000) , Validators.max(9999999999999999) ,Validators.pattern(this.numberPattern)]),

      uploadedImage: new FormControl(
        {value: '', disabled: false}, [Validators.required]),

      artistName: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(this.textPattern)]),
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
      id: Data.id
    } as DataTour;
    this.service.createTour(this.tourDatas).subscribe({
      next: (res) => {
        this.ticetCreatedSucces = true;
        this.openSnackBar('Data Updated Successfully!' , "Close");
      },
      error: (err) => {
        this.ticetCreatedError = true;
        this.openSnackBar( err.message , "Close")
      },
    });
  }

  // Notifications
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  // Get Validation Properties to show the error for UI
  get cityTourLocation() { return this.GenerateTicket.get('cityTourLocation') };
  get addressLocation() { return this.GenerateTicket.get('addressLocation') };
  get tourName() { return this.GenerateTicket.get('tourName') };
  get tourDate() { return this.GenerateTicket.get('tourDate') };
  get priceOfTicket() { return this.GenerateTicket.get('priceOfTicket') };
  get barcode() { return this.GenerateTicket.get('barcode') };
  get uploadedImage() {  return this.GenerateTicket.get('uploadedImage') };
  get artistName() { return this.GenerateTicket.get('artistName') };


// Function Format Controler | Validator of Uploadet Image
  handleImgFormat(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files.item(0);
      const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'jpg' || fileExtension !== 'jpeg' || fileExtension !== 'png') {
        // Display an error message or handle the invalid file type
        console.log('Invalid file type. Please select a JPG or PNG file.');
      } else {
        this.selectedFile = selectedFile;
      }
    }
  }

}
