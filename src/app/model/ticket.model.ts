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
