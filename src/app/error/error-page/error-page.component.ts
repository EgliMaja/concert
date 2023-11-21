import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {AuthUserService} from "../../service/auth-user.service";

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})

export class ErrorPageComponent implements OnInit {
    constructor(private authService: AuthUserService) {}

    ngOnInit(): void { }

    // signin button
    gotToLoginPage() {
        this.authService.logout();
    }

}
