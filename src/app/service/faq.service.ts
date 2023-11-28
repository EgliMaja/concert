import { Injectable } from "@angular/core";
import { DataFaqModel, FaqModel } from "../model/faq.model";
import { Observable, of } from "rxjs";
import * as faq from '../../data/frequently-asked-questions.json';

@Injectable({
  providedIn: 'root'
})

export class FaqService {

  importFAQ = JSON.stringify(faq);
  question_answer!: DataFaqModel;

  constructor() {
    this.question_answer = JSON.parse(this.importFAQ);
  }

  getFAQ(): Observable<DataFaqModel>{
    return of(this.question_answer);
  }

}
