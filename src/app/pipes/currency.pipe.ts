import { Pipe , PipeTransform } from "@angular/core";
import { LanguageModel } from "../model/interface/language.model";

@Pipe({
  name: 'currencyPipe'
})

export class CurrencyPipe implements  PipeTransform {

  language = sessionStorage.getItem('lang');
  transform(value: number): string {
    if (!value) {
      return '';
    }

    let formattedValue: string;

    switch(this.language) {
      case LanguageModel.English:
        formattedValue = value.toFixed(2) + '$';
        break;
      case LanguageModel.Spanish:
        formattedValue = value.toFixed(2) + '€';
        break;
      case LanguageModel.Albanian:
        formattedValue = value.toFixed(2) + 'LEK';
        break;
      default:
        formattedValue = value.toFixed(2) + '$';
        break;
    }

    return formattedValue;
  }
}
