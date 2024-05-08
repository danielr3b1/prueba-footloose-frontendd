import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {

  constructor(private dialogRef: MatDialogRef<DialogDeleteComponent>) { }

  confirmar() {
    const resultado = true;

    this.dialogRef.close(resultado);
  }

  cancelar() {
    const resultado = false;

    this.dialogRef.close(resultado);
  }

}
