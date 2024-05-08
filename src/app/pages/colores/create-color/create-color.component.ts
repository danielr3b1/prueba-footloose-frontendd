import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColoresService } from '../../../services/colores.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-color',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-color.component.html',
  styleUrl: './create-color.component.scss'
})
export class CreateColorComponent {

  private fb = inject(FormBuilder);
  private coloresService = inject(ColoresService);
  private toaster = inject(ToastrService)

  public colorForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]]
  })

  constructor(private dialogRef: MatDialogRef<CreateColorComponent>) {
  }

  async registrar() {
    const { nombre } = this.colorForm.value;

    this.coloresService.createColor(nombre).subscribe({
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
