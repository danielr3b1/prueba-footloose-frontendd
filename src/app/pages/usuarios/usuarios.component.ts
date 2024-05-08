import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductoService } from '../../services/productos.service';
import { Producto } from '../../interface/catalogo.interface';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environments';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { User, UserList } from '../../interface/user.interface';
import { UsuarioService } from '../../services/usuario.service';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  API_URL = environment.BACKEND_URL

  constructor(private paginatorIntl: MatPaginatorIntl, public dialog: MatDialog) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.ListarUsuarios();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private userService = inject(UsuarioService);
  public userResponse!: UserList[]

  private toaster = inject(ToastrService)

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'usuario', 'rol', 'imagen', 'acciones'];
  dataSource = new MatTableDataSource<UserList>([]);


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }


  filterTable(event: Event) {
    console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ListarUsuarios() {
    await this.userService.listUsuario().subscribe({
      next: (userList: any) => {
        this.userResponse = userList
        this.dataSource = new MatTableDataSource(this.userResponse)

        this.paginator.length = this.userResponse.length
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
        console.log(this.userResponse)
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateUsuarioComponent, {
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarUsuarios();
    });
  }

  openUpdate(usuario: UserList) {
    const dialogRef = this.dialog.open(EditUsuarioComponent, {
      data: usuario,
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarUsuarios();
    });
  }

  async openDelete(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent)

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {

        await this.userService.deleteUsuario(id).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message, "Usuario")
            this.ListarUsuarios()
          },
          error: (error) => {
            this.toaster.error(error, "Error")
          }
        })

      }
    })
  }
}
