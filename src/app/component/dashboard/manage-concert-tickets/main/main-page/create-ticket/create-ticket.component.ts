import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTour } from 'src/app/model/concert';
import { CreateTicketService } from 'src/app/service/create-ticket.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { ValidatorsRegexPatterns } from "../../../../../../function/function-validator";
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  providers: [CreateTicketService]
})
export class CreateTicketComponent implements OnInit {

  @Input() ToDate = new Date().toISOString().split('T')[0];
  generateTicketForm!: FormGroup;
  tourDatas!: DataTour;
  ticetCreatedSucces: boolean = false;
  ticetCreatedError: boolean = false;
  image!: File[];
  allowedFileExtension = ['.jpg', '.png', '.jpeg'].toString();

  constructor(  private service: CreateTicketService , private  _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initializeFormGroup();
  }


    initializeFormGroup() {
    let regex_pattern = new ValidatorsRegexPatterns();
    this.generateTicketForm = new FormGroup({

      cityTourLocation: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(regex_pattern.cityPattern)]),

      addressLocation: new FormControl(
        {value: '', disabled: false},
        [Validators.required]),

      tourName: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(regex_pattern.textPattern)]),

      tourDate: new FormControl(
        {value: this.ToDate, disabled: false},
        [Validators.required]),

      priceOfTicket: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(regex_pattern.numberPattern), Validators.min(35), Validators.max(1200)]),

      barcode: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.min(1000000000000000) , Validators.max(9999999999999999) ,Validators.pattern(regex_pattern.numberPattern)]),

      uploadedImage: new FormControl(
        {value: '', disabled: false}, [Validators.required]),

      artistName: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(regex_pattern.textPattern)]),
    });
  }

  // Generate | Create Ticket
  generateTicket() {
    this.tourDatas = {...this.generateTicketForm.value};
    this.service.createTour(this.tourDatas).subscribe({
      next: (res) => {
        this.ticetCreatedSucces = true;
        this.openSnackBar('Data Created Successfully!' , "Close");
      },
      error: (err) => {
        this.ticetCreatedError = true;
        this.openSnackBar( err.message , "Close")
      },
      complete:()=>{
        this.generateTicketForm.reset();
    }
    });
  }

  // Notifications
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  // Get Validation Properties to show the error for UI
  get cityTourLocation() { return this.generateTicketForm.get('cityTourLocation') };
  get addressLocation() { return this.generateTicketForm.get('addressLocation') };
  get tourName() { return this.generateTicketForm.get('tourName') };
  get tourDate() { return this.generateTicketForm.get('tourDate') };
  get priceOfTicket() { return this.generateTicketForm.get('priceOfTicket') };
  get barcode() { return this.generateTicketForm.get('barcode') };
  get uploadedImage() {  return this.generateTicketForm.get('uploadedImage') };
  get artistName() { return this.generateTicketForm.get('artistName') };


// Function Format Controler | Validator of Uploadet Image
  handleImgFormat(event: any) {
    const uploadedImage = this.generateTicketForm.get('uploadedImage')?.value.replace( "fakepath",`Users${"\\user\\Pictures\\Camera Roll"}`);
    if (uploadedImage && event.target.files) {
      this.image = uploadedImage;
    }
  }

}
