import { Component, OnDestroy, OnInit } from '@angular/core';
import { FaqService } from "../../../../service/faq.service";
import { FaqModel } from "../../../../model/faq.model";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})

export class FaqComponent implements OnInit , OnDestroy {

  panelOpenState = false;
  faqModel!: FaqModel[];
  private destroyer$: Subject<boolean> = new Subject<boolean>();

  constructor( private faqService: FaqService ) { }

  ngOnInit(): void {
    this.getQuestions_Answers();
  }

  ngOnDestroy() {
    this.destroyer$.next(true);
    this.destroyer$.unsubscribe();
  }

  getQuestions_Answers(){
    this.faqService.getFAQ().pipe(takeUntil(this.destroyer$.asObservable()))
      .subscribe({
      next:(res )=> {
        this.faqModel = res.faq;
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }

}
