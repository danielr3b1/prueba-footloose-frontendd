import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TallaService } from '../../../services/talla.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-talla',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './create-talla.component.html',
  styleUrl: './create-talla.component.scss'
})
export class CreateTallaComponent {

  private fb = inject(FormBuilder);
  private tallaService = inject(TallaService);
  private toaster = inject(ToastrService)

  public tallaForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]]
  })

  constructor(private dialogRef: MatDialogRef<CreateTallaComponent>) {
  }

  async registrar() {
    const { nombre } = this.tallaForm.value;

    this.tallaService.createTalla(nombre).subscribe({
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
