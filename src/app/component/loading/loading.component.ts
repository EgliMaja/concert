import { Component } from '@angular/core';
import { LoadingService } from "../../service/loading.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgIf, NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div *ngIf="this.loadingSpinner.getLoading()" class="overlay">
      <div class="load-container d-flex justify-content-center">
        <mat-spinner strokeWidth="2" [diameter]="100"></mat-spinner>
        <img [ngSrc]="backgroundSpinnerUrl" alt="" [width]="50" [height]="50">
      </div>
    </div>
  `,
  styleUrls: ['./loading.component.scss'],
  imports: [MatProgressSpinnerModule, NgIf, NgOptimizedImage]
})
export class LoadingComponent  {


  backgroundSpinnerUrl = '../../../assets/images/favicon-music.png';

  constructor( public loadingSpinner: LoadingService) { }

}
