import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { ModelosService } from '../../../services/modelos.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-modelo',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-modelo.component.html',
  styleUrl: './create-modelo.component.scss'
})
export class CreateModeloComponent {

  private fb = inject(FormBuilder);
  private modeloService = inject(ModelosService);
  private toaster = inject(ToastrService)

  public modeloForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]]
  })

  constructor(private dialogRef: MatDialogRef<CreateModeloComponent>) {
  }

  async registrar() {
    const { nombre } = this.modeloForm.value;

    this.modeloService.createModelo(nombre).subscribe({
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
