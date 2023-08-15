import { Injectable } from "@angular/core";
import {DataTour} from "../model/concert";
import {UserData} from "../model/userData";

@Injectable({
    providedIn: "root"
})

export class DataSharingService {
    private dataTour!: DataTour;
    private loginUserData!: UserData;

    setData(data:DataTour){
        this.dataTour = data;
    }

    getData(){
        return this.dataTour;
    }

    setDataUser(userData: UserData){
        this.loginUserData = userData;
    }

    getUserData(){
        return this.loginUserData;
    }
}
