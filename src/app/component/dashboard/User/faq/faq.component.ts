import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FaqService } from "../../../../service/faq.service";
import { FaqModel } from "../../../../model/faq.model";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})

export class FaqComponent implements OnInit , AfterViewInit {

  panelOpenState = false;
  faqModel!: FaqModel[];
  loadingSpinner: boolean = true;

  constructor( private faqService: FaqService ) { }

  ngOnInit(): void {
    this.getQuestions_Answers();
  }

  ngAfterViewInit() {
    this.loadingQuestions();
  }

  getQuestions_Answers(){
    this.faqService.getFAQ().subscribe({
      next:(res )=> {
        this.faqModel = res.faq;
        this.loadingSpinner = false;
      },
      error:(err) => {
        console.log(err.message);
        this.loadingSpinner = false;
      }
    })
  }

  loadingQuestions(){
    setTimeout(()=>{
      this.loadingSpinner = !this.faqModel;
    },1000)
  }

}
