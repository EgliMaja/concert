import { userData , appRoles } from "./model/userData";
import { Directive , Input , OnChanges ,TemplateRef , ViewContainerRef  }from '@angular/core';

@Directive({
  selector : '[hasRoles]'
})

export class HasRolesDirective implements OnChanges{

  private visible! : boolean;
  private roles! : appRoles[];
  private account! : userData;

  @Input() set hasRoles(roles : appRoles[]) {
    this.roles = roles;
  }

  @Input('hasRolesFor') set hasRolesFor(account : userData){
    this.account = account;
  }

  constructor(
    private templateRef : TemplateRef<unknown> ,
    private viewContainer : ViewContainerRef){}

  ngOnChanges(): void {

    if(!this.roles.length || !this.account) {
      return;
    }
    if(this.visible){
      return;
    }
    // check if account roles include at least one of the input roles
    if(this.account.role.some(role => this.roles.includes(role))){
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.visible = true;
      return;
    }

    this.viewContainer.clear();
    this.visible = false;

  }
}
