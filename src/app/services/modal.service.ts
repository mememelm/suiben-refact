import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public modal: MatDialog
  ) { }

  public openModal(component, sizeWidth = 'auto', sizeHeight = 'auto', data = {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = sizeWidth;
    dialogConfig.height = sizeHeight;
    dialogConfig.data = data;

    return this.modal.open(component, dialogConfig);
  }
}