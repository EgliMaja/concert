import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTour } from 'src/app/model/concert';
import { CreateTicketService } from 'src/app/service/create-ticket.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  providers: [CreateTicketService]
})
export class CreateTicketComponent implements OnInit {

  GenerateTicket!: FormGroup;
  searchTicket!: FormGroup;
  tourDatas!: DataTour;
  ticketDetails: DataTour[] = [];
  @Input() ToDate = new Date().toISOString().split('T')[0];
  textPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ\\s\\-\\+\\&\\,\\.\']+';
  numberPattern = '^-?[0-9]\\d*(\\,\\d{1,2})?$';
  addressPattern = '^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:\\s[a-zA-ZÀ-ÖØ-öø-ÿ]+),\\s\\d{1,4}(?:\\/\\d{1,4})?\\s*[a-zA-ZÀ-ÖØ-öø-ÿ]*$';
  cityPattern!: '^[a-zA-Z ]{1,19}$';
  ticetCreatedSucces: boolean = false;
  ticetCreatedError: boolean = false;
  selectedFile: any;
  ticket!: "";
  page: number = 1;
  ticketPerPage: number = 5;
  totalTickets: any;
  barcodePaths!: any[];
  // id: number;
  choosenBarcode: any;
  constructor(
    private service: CreateTicketService ,
    private activatedRoute : ActivatedRoute,
    private route : Router,
    ) {
    // this.choosenBarcode = this.activatedRoute.snapshot.paramMap.get('barcode');
    this.choosenBarcode = this.activatedRoute.snapshot.params['barcode'];

  }

  ngOnInit(): void {
    this.validateGenerateTicketForm();
    this.searchValidator();
    this.getDataTicket();
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
        [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(15)]),

      uploadedImage: new FormControl(
        {value: '', disabled: false}, [Validators.required]),

      artistName: new FormControl(
        {value: '', disabled: false},
        [Validators.required, Validators.pattern(this.textPattern)]),
    });
  }

  // search form validator
  searchValidator() {
    this.searchTicket = new FormGroup({
      cityTourLocation: new FormControl('', Validators.required),
    })
  }

// Get All Created Tickets
  getDataTicket() {
    this.service.getDataCreatedTicket().subscribe({
      next: (res) => {
        this.ticketDetails = res;
        this.totalTickets = res.length;
        this.barcodePaths = Array(res.map((el)=>{el.barcode}))
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

// Search ticket from the name of city
  searchToTicket(Value: any) {
    let CITY = Value.cityTourLocation;

    if(!this.isNull(Value)){
      CITY = Value.cityTourLocation.trim();
    }

    this.ticketDetails.filter(
      (value: DataTour) => {
        ((!this.isNull(CITY)) || value?.cityTourLocation.includes(value?.cityTourLocation?.toLowerCase()))
        console.log(CITY)
      }
    )
  }

// check if the value is null or not
  isNull(value: any) {
    return !(value === null || value === '' || value === undefined);
  }

  onItemClick(event: any , barcode: string){
    if(event.listener.selected){
      this.navigateDetailsOfTicker(barcode);
    }
  }

  navigateDetailsOfTicker(barcode: string){
    this.route.navigate(['rihanna/ticket/'+ barcode])
  }

}
