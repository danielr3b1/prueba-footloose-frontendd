import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Roles } from '../../interface/user.interface';
import { RolService } from '../../services/rol.service';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

  constructor(private paginatorIntl: MatPaginatorIntl, public dialog: MatDialog) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.ListarRoles();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private toaster = inject(ToastrService)

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  private rolService = inject(RolService)
  public rolItemsResponse!: Roles[]

  displayedColumns: string[] = ['id', 'rol', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Roles>([]);

  filterTable(event: Event) {
    console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ListarRoles() {
    await this.rolService.listRoles().subscribe({
      next: (rolItems: any) => {

        this.rolItemsResponse = rolItems
        this.dataSource = new MatTableDataSource(this.rolItemsResponse)

        this.paginator.length = this.rolItemsResponse.length
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateRolComponent, {
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarRoles();
    });
  }

  openUpdate(rol: Roles) {
    const dialogRef = this.dialog.open(EditRolComponent, {
      data: rol,
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarRoles();
    }); 
  }

  async openDelete(id: string) {
     const dialogRef = this.dialog.open(DialogDeleteComponent)

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {

        await this.rolService.deleteRoles(id).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message, "Rol")
            this.ListarRoles()
          },
          error: (error) => {
            this.toaster.error(error, "Error")
          }
        })

      }
    }) 
  }

}
