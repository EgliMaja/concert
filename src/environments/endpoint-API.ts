import { EndpointModel } from "../app/model/endpoint.model";
import { environment } from "./environment";

export const EndpointAPI = [

  // Ticket Management
  { name: "getAllTicket" , endpoint: environment.api + "DataTour" },
  { name: "createTicket" , endpoint: environment.api + "DataTour" },
  { name: "getTicketDetails" , endpoint: environment.api + "DataTour" },
  { name: "updateTicket" , endpoint: environment.api + "DataTour" },
  { name: "deleteTicket" , endpoint: environment.api + "DataTour" }

] as EndpointModel[];
