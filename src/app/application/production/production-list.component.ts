import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.css']
})
export class ProductionListComponent implements OnInit {

  title = 'productions'

  constructor() { }

  displayedColumnsProduction = ['exploitant', 'prodcution', 'augmentation']

  ngOnInit(): void {
  }

}
