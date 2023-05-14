import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
  <!-- As a heading -->
  <nav class="navbar bg">
    <span class="navbar-brand mb-0 h1">Rihanna</span>
  </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
