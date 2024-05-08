import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';
import { headerTable } from '../../components/custom-table/interface/header-table.interface';
import { Modelo, ModelosService } from '../../index'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { CreateModeloComponent } from './create-modelo/create-modelo.component';
import { EditModeloComponent } from './edit-modelo/edit-modelo.component';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modelos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, CustomTableComponent, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './modelos.component.html',
  styleUrl: './modelos.component.scss'
})
export class ModelosComponent implements OnInit {


  constructor(private paginatorIntl: MatPaginatorIntl, public dialog: MatDialog) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.ListarModelos();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private modeloService = inject(ModelosService);
  public modeloItemsResponse!: Modelo[]

  private toaster = inject(ToastrService)

  displayedColumns: string[] = ['id', 'modelo', 'acciones'];
  dataSource = new MatTableDataSource<Modelo>([]);


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

  async ListarModelos() {
    await this.modeloService.listModelos().subscribe({
      next: (modeloItems: any) => {
        console.log(modeloItems);

        this.modeloItemsResponse = modeloItems
        this.dataSource = new MatTableDataSource(this.modeloItemsResponse)

        this.paginator.length = this.modeloItemsResponse.length
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateModeloComponent, {
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarModelos();
    });
  }

  openUpdate(modelo: Modelo) {
    const dialogRef = this.dialog.open(EditModeloComponent, {
      data: modelo,
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarModelos();
    });
  }

  async openDelete(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent)

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {

        await this.modeloService.deleteModelo(id).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message, "Modelo")
            this.ListarModelos()
          },
          error: (error) => {
            this.toaster.error(error, "Error")
          }
        })

      }
    })
  }
}
