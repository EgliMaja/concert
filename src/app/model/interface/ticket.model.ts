import { UserDataModel } from "./userData.model";
import { DataTour } from "./concert.model";

export interface PaymentTicket{
  userData: UserDataModel;
  ticket: DataTour;
}

export enum TypeOfTicketsModel {
  Believer_GA_Ticket = "Believer GA Ticket",
  Early_Bird_GA_Ticket = "Early Bird GA Ticket",
  Regular_GA_Tickets = "Regular GA Ticket",
  VIP_Ticket = "VIP Ticket",
}

export enum PriceOfTicketPerType {
  Believer_GA_Ticket = 0,
  Early_Bird_GA_Ticket = 50,
  Regular_GA_Tickets = 200,
  VIP_Ticket = 500,
}
