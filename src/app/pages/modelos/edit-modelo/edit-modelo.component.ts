import { Component, Inject, inject } from '@angular/core';
import { Modelo } from '../../../interface/catalogo.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModelosService } from '../../../services/modelos.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-modelo',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './edit-modelo.component.html',
  styleUrl: './edit-modelo.component.scss'
})
export class EditModeloComponent {

  modelo!: Modelo

  private fb = inject(FormBuilder);
  private modeloService = inject(ModelosService);
  private toaster = inject(ToastrService)

  public modeloForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]]
  })

  constructor(
    private dialogRef: MatDialogRef<EditModeloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modelo
  ) {
    this.mostrarContenido()
  }

  mostrarContenido() {
    this.modeloForm.patchValue({
      id: this.data.idModelo,
      nombre: this.data.nombreModelo
    })
  }


  actualizar() {

    const { id, nombre } = this.modeloForm.value;

    this.modeloService.updateModelo(id, nombre).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.toaster.success(response.message, "Modelo")
      },
      error: (error) => {
        console.log(error);
        this.toaster.error(error, "Modelo")
      }

    });

  }

}
