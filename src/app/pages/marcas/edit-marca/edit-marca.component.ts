import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Marca } from '../../../interface/catalogo.interface';
import { MarcaService } from '../../../services/marca.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-marca',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './edit-marca.component.html',
  styleUrl: './edit-marca.component.scss'
})
export class EditMarcaComponent {

  marca!: Marca

  private fb = inject(FormBuilder);
  private marcaService = inject(MarcaService);
  private toaster = inject(ToastrService)

  public marcaForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]]
  })

  constructor(
    private dialogRef: MatDialogRef<EditMarcaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Marca
  ) {
    this.mostrarContenido()
  }

  mostrarContenido() {
    this.marcaForm.patchValue({
      id: this.data.idMarca,
      nombre: this.data.nombreMarca
    })
  }


  actualizar() {

    const { id, nombre } = this.marcaForm.value;

    this.marcaService.updateMarca(id, nombre).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.toaster.success(response.message, "Marca")
      },
      error: (error) => {
        console.log(error);
        this.toaster.error(error, "Marca")
      }

    });

  }

}
