import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolService } from '../../../services/rol.service';
import { Header } from '../../../components/siderbar-item/interface/header.interface';
import { Item } from '../../../components/siderbar-item/interface/item.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Roles, TokenUser } from '../../../interface/user.interface';
import { SidebarService } from '../../../services/sidebar.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-rol',
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
  templateUrl: './edit-rol.component.html',
  styleUrl: './edit-rol.component.scss'
})
export class EditRolComponent {

  private rolService = inject(RolService);
  private toasService = inject(ToastrService)
  private sidebarService = inject(SidebarService)
  private authService = inject(AuthService)
  
  rolItems!: Header[];
  nombreRol: any;
  rolSelectItems!: Header[];

  resulItemsRol!: Header[];
  constructor(private dialogRef: MatDialogRef<EditRolComponent>, @Inject(MAT_DIALOG_DATA) public data: Roles){
    this.listRolPermisosSelect();
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
  async listRolPermisosSelect(){
    this.nombreRol = this.data.nombre
    await this.listRol();
    await this.listPermisos();
    
    this.rolItems = this.rolItems.map((headerRol: Header) => {
      return {
        ...headerRol,
        childList: headerRol.childList.map((rol: Item) => {
          const isSelect = this.rolSelectItems.some((headerSelectItem: Header) => {
            return headerSelectItem.childList.some((rolSelect: Item) => rolSelect.id === rol.id);
          });
          return {
            ...rol,
            isSelect: isSelect
          };
        }),
        isSelect: this.rolSelectItems.some((headerSelectItem: Header) => headerSelectItem.id === headerRol.id)
      };
    });
    console.log(this.rolItems)
  }

  public async listRol(){
    const rolItems: Header[] = await this.rolService.listPermisos().toPromise();

    const api = rolItems.map((headerRol: Header) => {
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
    this.rolItems = await Promise.all(api);
  }

  

  public async listPermisos(){
    const rol = this.data.id;
    const api = await this.sidebarService.listModule(rol).toPromise();
    
    this.rolSelectItems = await Promise.all(api);
  }

  actualizar() {
    const listMenu:Header[] = this.rolItems;
    const name = this.nombreRol;
    
    const flatList = listMenu
    .flatMap((item) => {
      if (item.isSelect) {
        return [{ id: item.id }, ...item.childList.filter(child => child.isSelect).map(child => ({ id: child.id }))];
      } else {
        return [];
      }
    });
    console.log(flatList)
    const idQueryResquest = this.data.id
    const rolRequest = {
      name:name,
      roles:flatList
    }

    this.rolService.updateRol(rolRequest, idQueryResquest).subscribe({
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
