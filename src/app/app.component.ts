import { Component } from '@angular/core';
import { LocationStrategy } from "@angular/common";
import { AutoLogoutService, AuthentificationService } from "./services";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'suiben'

  constructor(
    private locationStrategy: LocationStrategy, 
    private autoLogoutService: AutoLogoutService,
    private authentificationService: AuthentificationService){
    this.locationStrategy.onPopState(() => {  
      history.pushState(null, null, window.location.href)
    }); 
  }
}
