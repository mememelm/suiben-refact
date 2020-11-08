import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-navigation',
  templateUrl: './production-navigation.component.html',
  styleUrls: ['./production-navigation.component.css']
})
export class ProductionNavigationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public toCumaGlobal() {
    this.router.navigateByUrl('cuma')
  }
  
  public toCumaHistoric() {
    this.router.navigateByUrl('cuma-historique')
  } 
  
  public toCuviGlobal() {
    this.router.navigateByUrl('cuvi')
  } 
  
  public toCuviHistoric() {
    this.router.navigateByUrl('cuvi-historique')
  }

  /**
   * toAviculture
   */
  public toAviculture() {
    this.router.navigateByUrl('aviculture')
  }

  public toApiculture() {
    this.router.navigateByUrl('apiculture')
  }

  public toBovin() {
    this.router.navigateByUrl('bovin')
  }

  public toPorciculture() {
    this.router.navigateByUrl('porciculture')
  }

  public toCunniculture() {
    this.router.navigateByUrl('cunniculture')
  }

}
