import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[linkTitle]'
})

export class SidebarMenuDirective {

  @Input() set linkTitle(linkTitle: string){
    if (linkTitle){
      this.setIconForCurrentTitle(linkTitle);
    }
  }

  constructor(private element: ElementRef , private renderer2: Renderer2) {}

  setIconForCurrentTitle(title: string){
    switch (title){
      case "Home":
        this.renderer2.addClass(this.element.nativeElement , 'fa-house-user');
        break;
      case "Music":
        this.renderer2.addClass(this.element.nativeElement , 'fa-music' );
        break;
      case "Bio":
        this.renderer2.addClass(this.element.nativeElement , 'fa-book-open-reader');
        break;
      case "News":
        this.renderer2.addClass(this.element.nativeElement , 'fa-newspaper');
        break;
      case "Photo":
        this.renderer2.addClass(this.element.nativeElement , 'fa-images');
        break;
      case "Video":
        this.renderer2.addClass(this.element.nativeElement , 'fa-photo-film');
        break;
      default: break;
    }
  }

}
