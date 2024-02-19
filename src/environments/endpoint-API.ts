import { EndpointModel } from "../app/model/endpoint.model";
import { environment } from "./environment";

export const EndpointAPI = [

  // User Authentication
  { name: "getAllUsers" , endpoint: environment.api + "UserData"},
  { name: "registerUser" , endpoint: environment.api + "UserData" },
  { name: "getUserDataByID" , endpoint: environment.api + "UserData" },
  { name: "updateProfileUser" , endpoint: environment.api + "UserData" },

  // Ticket Management
  { name: "getAllTicket" , endpoint: environment.api + "DataTour" },
  { name: "createTicket" , endpoint: environment.api + "DataTour" },
  { name: "getTicketDetails" , endpoint: environment.api + "DataTour" },
  { name: "updateTicket" , endpoint: environment.api + "DataTour" },
  { name: "deleteTicket" , endpoint: environment.api + "DataTour" },

  // Booking
  { name: "bookingTicket" , endpoint: environment.api + "Booking"}

] as EndpointModel[];
