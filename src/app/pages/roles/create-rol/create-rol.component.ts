import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RolService } from '../../../services/rol.service';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthService } from '../../../services/auth.service';
import { TokenUser } from '../../../interface/user.interface';
import { Header } from '../../../components/siderbar-item/interface/header.interface';
import { Item } from '../../../components/siderbar-item/interface/item.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-rol',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    CommonModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './create-rol.component.html',
  styleUrl: './create-rol.component.scss'
})
export class CreateRolComponent {

  private rolService = inject(RolService);
  private toasService = inject(ToastrService)


  rolItems!: Header[];
  nombreRol: any;
  constructor(private dialogRef: MatDialogRef<CreateRolComponent>){
    this.listRol();
  }


  handleCheckbox(header: Header) {
    const someSelected = header.childList.some((rol) => rol.isSelect);
    if(!someSelected){
      header.isSelect = false;
    }else{
      header.isSelect = true
    }
    header.childList.some((rol) => console.log(rol.name+': '+rol.isSelect))
  }

  
  
  

  public listRol(){

    this.rolService.listPermisos().subscribe({
      next: (rolItems: Header[]) => {
        this.rolItems = rolItems.map((headerRol: Header) => {
          // Mapeamos cada objeto Header
          return {
            ...headerRol, 
            isSelect: false,
            childList: headerRol.childList.map((item: Item) => {
              return {
                ...item, 
                isSelect: false 
              };
            })
          };
        });
        console.log(this.rolItems )

      },
      error: (error) => {
        console.log(error)
      }
    })

  }

  registrar() {
    const listMenu:Header[] = this.rolItems;
    const name = this.nombreRol;

    if(!name){
      this.toasService.error('Ingrese un nombre valido', 'Error en la solicitud')
      return;
    }
    
    const flatList = listMenu
    .flatMap((item) => {
      if (item.isSelect) {
        return [{ id: item.id }, ...item.childList.filter(child => child.isSelect).map(child => ({ id: child.id }))];
      } else {
        return [];
      }
    });

    const rolRequest = {
      name:name,
      roles:flatList
    }
    console.log(rolRequest)

    this.rolService.createRol(rolRequest).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.toasService.success(response.message, "Rol")
      },
      error: (error) => {
        this.toasService.error(error, "Rol")
      }
    })
  }

  

}
