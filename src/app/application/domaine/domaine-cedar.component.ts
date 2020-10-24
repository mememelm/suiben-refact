import { Component, OnInit } from '@angular/core';
import { DomaineService } from '../../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ToastrService } from "ngx-toastr";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-domaine-cedar',
    templateUrl: './domaine-cedar.component.html',
    styleUrls: ['./domaine-cedar.component.css']
})
export class DomaineCedarComponent implements OnInit {

    domaineFormGroup: FormGroup
    domaines: any
    domainesLength: number

    constructor(
        private domaineService: DomaineService,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.loadDomaineList()
        this.domaineService.getDomaineList()
        this.domaineForm()
    }

    public get domaineName() {
        return this.domaineFormGroup.get('domaineName').value
    }

    domaineForm() {
        this.domaineFormGroup = this.formBuilder.group({
            domaineName: ['', [Validators.required, Validators.minLength(5)]]
        })
    }

    resetForm() {
        return this.domaineFormGroup.reset()
    }

    addDomaine() {
        this.domaineService.createDomaine(this.domaineFormGroup.value);
        this.resetForm();
    }

    public loadDomaineList() {
        this.domaineService.getDomaineList().snapshotChanges().pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
        ).subscribe(domaines => {
            this.domaines = domaines
            this.domainesLength = domaines.length
        })
    }
}
