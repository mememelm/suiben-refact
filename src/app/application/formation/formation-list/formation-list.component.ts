import { Component, OnInit } from '@angular/core';
import {FormationService} from '../../../services/formation.service';
import {DomaineService} from '../../../services';
import {MatTableDataSource} from '@angular/material/table';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-formation-list',
    templateUrl: './formation-list.component.html',
    styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {

    title = 'formations';
    exploitants = new MatTableDataSource<any>();
    domaines: any;

    constructor(
        public formationService: FormationService,
        public domaineService: DomaineService
    ) { }


    ngOnInit(): void {
        this.formationService.getFormationExploitant();
        this.loadDomaineList();
    }

    loadDomaineList(){
        this.domaineService.getDomaineList()
            .snapshotChanges().pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val()}))))
                .subscribe(domaines => { 
                    this.domaines = domaines
                })
    }

    onExploitantChange(arg) {
        this.formationService.getExploitantById(arg);
    }

    applyFilter(filterValue: string) {
        this.formationService.dataSourceformations.filter = filterValue.trim().toLowerCase();
    }
}
