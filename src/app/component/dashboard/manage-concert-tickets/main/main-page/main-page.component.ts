import { AfterViewInit, ChangeDetectorRef, Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit , AfterViewInit{

  constructor( private cd: ChangeDetectorRef) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
