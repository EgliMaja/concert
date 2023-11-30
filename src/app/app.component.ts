import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { LanguageModel } from "./model/language.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private translate: TranslateService) {
    this.changeLanguage();
  }

  changeLanguage(): void {
    const Browser_Lang = this.translate.getBrowserLang();
    this.translate.addLangs([LanguageModel.English, LanguageModel.Albanian, LanguageModel.Spanish]);
    let lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.use(lang);
    } else {
      if (Browser_Lang?.match(/en|sq|es/)) {
        localStorage.setItem('lang', Browser_Lang);
        this.translate.use(Browser_Lang);
      } else {
        localStorage.setItem('lang', LanguageModel.English);
        this.translate.setDefaultLang(LanguageModel.English);
      }
    }
  }

}
