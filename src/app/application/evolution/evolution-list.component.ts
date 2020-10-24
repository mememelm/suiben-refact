import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evolution-list',
  templateUrl: './evolution-list.component.html',
  styleUrls: ['./evolution-list.component.css']
})
export class EvolutionListComponent implements OnInit {

  title = 'evolutions'

  constructor() { }

  displayedColumnsEvolution = ['exploitant', 'localisation', 'innovation', 'innovationlength', 'production']

  ngOnInit(): void {
  }

}
