import { Subject, takeUntil } from "rxjs";
import { DataTour } from "../model/concert.model";
import { CreateTicketService } from "../service/create-ticket.service";

export class ReusedTicketManageFunctions {

    ticketDetailsSubject: Subject<boolean> = new Subject<boolean>();
    dataTour!: DataTour;
    barcode!: string;

    constructor(private ticket_service: CreateTicketService) { }

    getDetailsOfTicketByBarcode(barcode: string) {
        this.ticket_service.getTicketDetails(barcode).pipe(
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
            },
            error: (err) => {
                console.log(err);
            }
        })
    }


}
