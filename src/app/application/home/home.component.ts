import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from "../../services";
import { DatePipe } from "@angular/common";
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  date: any = Date.now()
  currentUser: any

  constructor(
    private authentificaitonServiice: AuthentificationService,
    private datePipe: DatePipe,
    private router: Router,
  ) {
    setInterval(() => {
      if (this.date = new Date())
        this.date = this.datePipe.transform(this.date, 'EEEE - dd MMMM yyyy - h:mm:ss')
    }, 1)
  }

  ngOnInit(): void {
    let user = localStorage.getItem('user')
    if (user == null) {
      let reloadUser
      setTimeout(() => {
        reloadUser = localStorage.getItem('user')
        this.currentUser = reloadUser
      }, 2000);
    } else {
      this.currentUser = user
      console.log(user)
    }
  }

  logOut() {
    this.authentificaitonServiice.signOut()
    localStorage.clear()
  }

  public routerExploitant() {
    this.router.navigateByUrl('exploitant')
  }

  public routerFormation() {
    this.router.navigateByUrl('formation')
  }

  public routerProduction() {
    this.router.navigateByUrl('production')
  }

  public routerInnovation() {
    this.router.navigateByUrl('innovation')
  }

  public routerEvulution() {
    this.router.navigateByUrl('evolution')
  }

}
