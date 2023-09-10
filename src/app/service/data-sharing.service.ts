import { Injectable } from "@angular/core";
import { DataTour } from "../model/concert";

@Injectable({
    providedIn: "root"
})

export class DataSharingService {
    private dataTour!: DataTour;

    setData(data:DataTour){
        this.dataTour = data;
    }

    getData(){
        return this.dataTour;
    }

}
