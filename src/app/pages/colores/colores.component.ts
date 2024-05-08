import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { ColoresService } from '../../services/colores.service';
import { Color } from '../../interface/catalogo.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { CommonModule } from '@angular/common';
import { CreateColorComponent } from './create-color/create-color.component';
import { EditColorComponent } from './edit-color/edit-color.component';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-colores',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, CustomTableComponent, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './colores.component.html',
  styleUrl: './colores.component.scss'
})
export class ColoresComponent {

  constructor(private paginatorIntl: MatPaginatorIntl, public dialog: MatDialog) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.ListarColores();
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

  private colorService = inject(ColoresService)
  public colorItemsResponse!: Color[]

  displayedColumns: string[] = ['id', 'marca', 'acciones'];
  dataSource = new MatTableDataSource<Color>([]);

  filterTable(event: Event) {
    console.log(event);

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async ListarColores() {
    await this.colorService.listColores().subscribe({
      next: (colorItems: any) => {
        this.colorItemsResponse = colorItems
        this.dataSource = new MatTableDataSource(this.colorItemsResponse)

        this.paginator.length = this.colorItemsResponse.length
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateColorComponent, {
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarColores();
    });
  }

  openUpdate(color: Color) {
    const dialogRef = this.dialog.open(EditColorComponent, {
      data: color,
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarColores();
    });
  }

  async openDelete(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent)

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {

        await this.colorService.deleteColor(id).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message, "Color")
            this.ListarColores()
          },
          error: (error) => {
            this.toaster.error(error, "Error")
          }
        })

      }
    })
  }

}
