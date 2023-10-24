import { UserDataModel } from "./userData.model";
import { DataTour } from "./concert.model";

export interface TicketModel{
  userData: UserDataModel;
  ticket: DataTour;
}
