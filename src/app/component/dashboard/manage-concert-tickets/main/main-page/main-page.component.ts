import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit , AfterViewInit{

  @Output() loadingSpinner:EventEmitter<boolean> =  new EventEmitter();

  constructor( private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadingSpinner.emit(true);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
