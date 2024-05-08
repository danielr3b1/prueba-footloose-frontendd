import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Roles, User } from '../../../interface/user.interface';
import { environment } from '../../../environments/environments';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../services/usuario.service';
import { RolService } from '../../../services/rol.service';
import { ToastrService } from 'ngx-toastr';
import { isFileAnImage } from '../../../utils/utils-func';

@Component({
  selector: 'app-edit-usuario',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    CommonModule,
    MatSelectModule,
    MatIconModule],
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.scss'
})
export class EditUsuarioComponent implements OnInit {

  ngOnInit(): void {
    this.showListDown()
    this.getListRoles()
  }

  user!: User;
  imagePreview: string = environment.BACKEND_URL + 'users/profile-image/' + this.data.photo;
  imageFile!: File;

  rolesList!: Roles[];

  private fb = inject(FormBuilder)
  private usuarioService = inject(UsuarioService)
  private RolService = inject(RolService)
  private toaster = inject(ToastrService)
  hide = true;

  constructor(
    private dialogRef: MatDialogRef<EditUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {

  }

  public usuarioForm: FormGroup = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    password: ['', [Validators.required]],
    idRol: ['', [Validators.required]],
  })


  showListDown() {
    this.usuarioForm.setValue({
      id: this.data.id,
      name: this.data.name,
      lastname: this.data.lastname,
      username: this.data.username,
      password: this.data.password,
      idRol: this.data.roles[0].id
    })
  }

  getListRoles() {
    this.RolService.listRoles().subscribe({
      next: (rolItems) => {
        this.rolesList = rolItems
      },
      error: (error) => {
        console.log(error);
      }
    })
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
        // Puedes mostrar un mensaje de error al usuario si lo deseas.
        // También puedes restablecer el input de archivo para borrar la selección no válida.
        input.value = '';
      }
    }
  }


  actualizar() {

    if (this.usuarioForm.valid) {

      const formData = new FormData()
      formData.append('name', this.usuarioForm.get("name")?.value);
      formData.append('lastname', this.usuarioForm.get("lastname")?.value);
      formData.append('username', this.usuarioForm.get("username")?.value);
      formData.append('password', this.usuarioForm.get("password")?.value);
      formData.append('photo', this.data.photo);
      formData.append('idRol', this.usuarioForm.get("idRol")?.value);

      if (this.imageFile != null) {
        formData.append('file', this.imageFile);
      }


      this.usuarioService.updateUsuario(this.data.id + "", formData).subscribe({
        next: (response: any) => {
          this.dialogRef.close()
          this.toaster.success(response.message, "Usuario")
        },
        error: (error) => {
          this.toaster.error(error, "Usuario")
        }
      })
    }

  }
}
