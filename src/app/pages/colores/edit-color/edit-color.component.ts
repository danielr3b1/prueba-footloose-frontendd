import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Color } from '../../../interface/catalogo.interface';
import { ColoresService } from '../../../services/colores.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-color',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule],
  templateUrl: './edit-color.component.html',
  styleUrl: './edit-color.component.scss'
})
export class EditColorComponent {

  color!: Color

  private fb = inject(FormBuilder);
  private coloresService = inject(ColoresService);
  private toaster = inject(ToastrService)

  public colorForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]]
  })

  constructor(
    private dialogRef: MatDialogRef<EditColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Color
  ) {
    this.mostrarContenido()
  }

  mostrarContenido() {
    this.colorForm.patchValue({
      id: this.data.idColor,
      nombre: this.data.nombreColor
    })
  }


  actualizar() {

    const { id, nombre } = this.colorForm.value;

    this.coloresService.updateColor(id, nombre).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.toaster.success(response.message, "Color")
      },
      error: (error) => {
        console.log(error);
        this.toaster.error(error, "Color")
      }

    });

  }

}
