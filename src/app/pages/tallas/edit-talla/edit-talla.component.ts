import { Component, Inject, inject } from '@angular/core';
import { Talla } from '../../../interface/catalogo.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TallaService } from '../../../services/talla.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-talla',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './edit-talla.component.html',
  styleUrl: './edit-talla.component.scss'
})
export class EditTallaComponent {

  talla!: Talla

  private fb = inject(FormBuilder);
  private tallaService = inject(TallaService);
  private toaster = inject(ToastrService)

  public tallaForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]]
  })

  constructor(
    private dialogRef: MatDialogRef<EditTallaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Talla
  ) {
    this.mostrarContenido()
  }

  mostrarContenido() {
    this.tallaForm.patchValue({
      id: this.data.idTalla,
      nombre: this.data.nombreTalla
    })
  }


  actualizar() {

    const { id, nombre } = this.tallaForm.value;

    this.tallaService.updateTalla(id, nombre).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.toaster.success(response.message, "Talla")
      },
      error: (error) => {
        console.log(error);
        this.toaster.error(error, "Talla")
      }

    });

  }


}
