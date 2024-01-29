import { Injectable } from "@angular/core";
import { EndpointAPI } from "../../environments/endpoint-API";

@Injectable({
  providedIn: 'root'
})

export class EndpointAPIService {

  // Ticket Management
  static readonly ENDPOINT_NAME_GET_ALL_TICKET = "getAllTicket";
  static readonly ENDPOINT_NAME_CREATE_TICKET = "createTicket";
  static readonly ENDPOINT_NAME_GET_TICKET_DETAILS = "getTicketDetails";
  static readonly ENDPOINT_NAME_UPDATE_TICKET = "updateTicket";
  static readonly ENDPOINT_NAME_DELETE_TICKET = "deleteTicket";


  protected getEndpoint( key: string , ...parameters: any[] ): string {
    let endpoint: string | undefined = EndpointAPI.find( construction=> construction.name == key )?.endpoint;
    for ( let parameter of parameters ) {
      endpoint = endpoint + ( parameter != null ? parameter.toString().trim() : "" );
    }
    return  <string>endpoint;
  }

}
