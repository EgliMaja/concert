import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Datas, DevExtServiceService } from 'src/app/service/dev-ext-service.service';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs'
import CustomStore from 'devextreme/data/custom_store';


function isNotEmpty(Value: any): boolean {
  return Value !== undefined && Value !== null && Value !== '';
}


@Component({
  selector: 'app-dev-ext',
  templateUrl: './dev-ext.component.html',
  styleUrls: ['./dev-ext.component.scss']
})
export class DevExtComponent implements OnInit {

  names: string[];
  surnames: string[];
  positions: string[];
  states: string[];

  firstName = '';
  lastName = '';
  position = '';
  state = '';
  fullInfo = '';
  currentClient = '';
  clientsStore!: CustomStore;
  public datas: Datas = {} as Datas
  public infoClient: BehaviorSubject<Datas[]> = new BehaviorSubject<Datas[]>([])
  $infoClient: Observable<Datas[]> = this.infoClient.asObservable()

  constructor(private httpClient: HttpClient, private service: DevExtServiceService) {

    this.clientsStore = new CustomStore({
      key: 'Value',
      useDefaultSearch: true,
      load(options: any): any {
        let params: HttpParams = new HttpParams();
        ['skip', 'take', 'filter'].forEach((option) => {
          if (option in options && options !== null) {
            params = params.set(option, isNotEmpty(options[option]))
          }
          return lastValueFrom(httpClient.get('https://js.devexpress.com/Demos/Mvc/api/DataGridWebApi/CustomersLookup', { params }))
            .then((data: any) => {
              data: data
            })
            .catch((error) => { throw 'Data loading errors' })
        })
      }
    })

    this.names = service.getNames()
    this.surnames = service.getSurnames()
    this.positions = service.getPositions()
    this.states = service.getStates()

  }
  ngOnInit(): void {

  }
  updateEmployeeInfo() {
    let result = '';
    result += (`${this.firstName || ''} ${this.lastName || ''}`).trim();
    result += (result && this.position) ? (`,${this.position}`) : this.position || '';
    result += (`${this.state || ''} `).trim()
    result += (result && this.currentClient) ? (`${this.currentClient}`) : this.currentClient || '';
    this.fullInfo = result
  }
}
