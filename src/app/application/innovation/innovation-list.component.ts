import { Component, OnInit } from '@angular/core';
import {InnovationService} from '../../services/innovation.service';
import {map} from 'rxjs/operators';
import {DomaineService} from '../../services';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-innovation-list',
    templateUrl: './innovation-list.component.html',
    styleUrls: ['./innovation-list.component.css']
})
export class InnovationListComponent implements OnInit {

    public title = 'innovations';
    exploitants = new MatTableDataSource<any>();
    public domaines: any;

    constructor(
        public innovationService: InnovationService,
        public domaineService: DomaineService
    ) { }

    ngOnInit(): void {
      this.loadDomaineList();
      this.innovationService.getInnovationList();
    }

    loadDomaineList(){
        this.domaineService.getDomaineList().snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()})))
        ).subscribe(domaines => { this.domaines = domaines;});
    }

    onExploitantChange(arg) {
        this.innovationService.getInnovationById(arg);
    }

    applyFilter(filterValue: string) {
        this.innovationService.dataSourceInnovation.filter = filterValue.trim().toLowerCase();
    }
}
