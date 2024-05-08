import { Component, ViewChild, inject } from '@angular/core';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { Talla, TallaService } from '../../index'
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateTallaComponent } from './create-talla/create-talla.component';
import { EditTallaComponent } from './edit-talla/edit-talla.component';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tallas',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './tallas.component.html',
  styleUrl: './tallas.component.scss'
})
export class TallasComponent {

  constructor(private paginatorIntl: MatPaginatorIntl, public dialog: MatDialog) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.ListarMarcas();
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

  private tallaService = inject(TallaService)
  public tallaItemsResponse!: Talla[]

  displayedColumns: string[] = ['id', 'talla', 'acciones'];
  dataSource = new MatTableDataSource<Talla>([]);

  filterTable(event: Event) {
    console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ListarMarcas() {
    await this.tallaService.listTalla().subscribe({
      next: (tallaItems: any) => {

        this.tallaItemsResponse = tallaItems
        this.dataSource = new MatTableDataSource(this.tallaItemsResponse)

        this.paginator.length = this.tallaItemsResponse.length
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateTallaComponent, {
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarMarcas();
    });
  }

  openUpdate(talla: Talla) {
    const dialogRef = this.dialog.open(EditTallaComponent, {
      data: talla,
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarMarcas();
    });
  }

  async openDelete(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent)

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {

        await this.tallaService.deleteTalla(id).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message, "Marca")
            this.ListarMarcas()
          },
          error: (error) => {
            this.toaster.error(error, "Error")
          }
        })

      }
    })
  }

}
