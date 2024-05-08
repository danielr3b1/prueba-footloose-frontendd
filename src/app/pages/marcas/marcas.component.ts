import { Component, OnInit, inject } from '@angular/core';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../../interface/catalogo.interface';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CreateMarcaComponent } from './create-marca/create-marca.component';
import { EditMarcaComponent } from './edit-marca/edit-marca.component';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, CustomTableComponent, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent implements AfterViewInit, OnInit {

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

  private marcaService = inject(MarcaService)
  public marcaItemsResponse!: Marca[]

  displayedColumns: string[] = ['id', 'marca', 'acciones'];
  dataSource = new MatTableDataSource<Marca>([]);

  filterTable(event: Event) {
    console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ListarMarcas() {
    await this.marcaService.listMarca().subscribe({
      next: (marcaItems: any) => {
        console.log(marcaItems);

        this.marcaItemsResponse = marcaItems
        this.dataSource = new MatTableDataSource(this.marcaItemsResponse)

        this.paginator.length = this.marcaItemsResponse.length
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateMarcaComponent, {
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarMarcas();
    });
  }

  openUpdate(marca: Marca) {
    const dialogRef = this.dialog.open(EditMarcaComponent, {
      data: marca,
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

        await this.marcaService.deleteMarca(id).subscribe({
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
