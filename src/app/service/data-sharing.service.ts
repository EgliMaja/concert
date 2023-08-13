import { Injectable } from "@angular/core";
import {DataTour} from "../model/concert";

@Injectable({
    providedIn: "root"
})

export class DataSharingService {
    private data!: DataTour;

    setData(data:DataTour){
        this.data = data;
    }

    getData(){
        return this.data;
    }
}
