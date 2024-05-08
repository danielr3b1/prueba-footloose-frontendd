import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Color, Marca, Modelo } from '../../../interface/catalogo.interface';
import { isFileAnImage } from '../../../utils/utils-func';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Roles, UserList } from '../../../interface/user.interface';
import { UsuarioService } from '../../../services/usuario.service';
import { MatIconModule } from '@angular/material/icon';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-create-usuario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    CommonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './create-usuario.component.html',
  styleUrl: './create-usuario.component.scss'
})
export class CreateUsuarioComponent {

  usuario!: UserList;
  imagePreview!: string;
  imageFile!: File;

  rolList!: Roles[];

  private fb = inject(FormBuilder)
  private usuarioService = inject(UsuarioService)
  private RolService = inject(RolService)
  private toaster = inject(ToastrService)
  hide = true;
  constructor(private dialogRef: MatDialogRef<CreateUsuarioComponent>) {
  }

  ngOnInit(): void {
    this.getListRoles()
  }

  public usuarioForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    idRol: ['', [Validators.required]],
  })

  async getListRoles() {
    this.RolService.listRoles().subscribe({
      next: (RolItems) => {
        this.rolList = RolItems
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  registrar() {

    if (this.usuarioForm.valid) {
      console.log(this.usuarioForm.get("name")?.value)
      console.log(this.usuarioForm.get("username")?.value)
      console.log(this.usuarioForm.get("lastname")?.value)
      console.log(this.usuarioForm.get("password")?.value)
      console.log(this.usuarioForm.get("idRol")?.value)

      const formData = new FormData();
      formData.append('name', this.usuarioForm.get("name")?.value);
      formData.append('username', this.usuarioForm.get("username")?.value);
      formData.append('lastname', this.usuarioForm.get("lastname")?.value);
      formData.append('password', this.usuarioForm.get("password")?.value)
      formData.append('idRol', this.usuarioForm.get("idRol")?.value)


      if (this.imageFile != null) {
        formData.append('file', this.imageFile);
      }

      this.usuarioService.createUsuario(formData).subscribe({
        next: (response: any) => {
          this.dialogRef.close();
          this.toaster.success(response.message, "Usuario")
        },
        error: (error) => {
          this.toaster.error(error, "Usuario")
        }
      })
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (isFileAnImage(file)) {
        this.imageFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        }

        reader.readAsDataURL(file);
      } else {
        console.log('El archivo seleccionado no es una imagen.');
        input.value = '';
      }
    }
  }
}
