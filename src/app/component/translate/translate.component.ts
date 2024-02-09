import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LanguageModel } from "../../model/language.model";

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})

export class TranslateComponent implements OnInit {

  protected readonly languageModel = LanguageModel;
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}

  selectLanguage(event: Event, selectedLanguage: string): void {
    event.preventDefault();
    sessionStorage.getItem('lang');
    sessionStorage.setItem('lang', selectedLanguage);
    this.translate.use(selectedLanguage);
  }

}
