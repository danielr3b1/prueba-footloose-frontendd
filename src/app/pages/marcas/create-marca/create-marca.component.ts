import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MarcaService } from '../../../services/marca.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-marca',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-marca.component.html',
  styleUrl: './create-marca.component.scss'
})
export class CreateMarcaComponent {

  private fb = inject(FormBuilder);
  private marcaService = inject(MarcaService);
  private toaster = inject(ToastrService)

  public marcaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]]
  })

  constructor(private dialogRef: MatDialogRef<CreateMarcaComponent>) {
  }

  async registrar() {
    const { nombre } = this.marcaForm.value;

    this.marcaService.createMarca(nombre).subscribe({
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
