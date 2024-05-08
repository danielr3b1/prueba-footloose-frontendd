import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductoService } from '../../services/productos.service';
import { Producto, ProductoExcel } from '../../interface/catalogo.interface';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environments';
import { CreateProductoComponent } from './create-producto/create-producto.component';
import { EditProductoComponent } from './edit-producto/edit-producto.component';
import { DialogDeleteComponent } from '../../components/dialog-delete/dialog-delete.component';
import { pdfData } from '../../interface/pdf.interface'
import { pdfcreate } from '../../utils/producto.pdf';
import { ExcelService } from '../../services/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSortModule, CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.scss'
})
export class ProductosComponent {
  @ViewChild('fileInput') fileInput: any;
  API_URL = environment.BACKEND_URL

  constructor(private paginatorIntl: MatPaginatorIntl, public dialog: MatDialog, private excelService: ExcelService) {
    this.paginatorIntl.itemsPerPageLabel = 'Elementos por página';
    this.ListarProductos();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private productoService = inject(ProductoService);
  public productoItemsResponse!: any[]

  private toaster = inject(ToastrService)

  displayedColumns: string[] = ['id', 'producto', 'marca', 'modelo', 'color', 'talla', 'precio', 'imagen', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);


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

  async ListarProductos() {
    await this.productoService.listProducto().subscribe({
      next: (productoItems: any) => {
        this.productoItemsResponse = productoItems
        this.productoItemsResponse = this.productoItemsResponse.map((producto) =>{
          return {
            ...producto,
            nombreMarca: producto.marca.nombreMarca,
            nombreModelo: producto.modelo.nombreModelo,
            nombreColor: producto.color.nombreColor,
            nombreTalla: producto.talla.nombreTalla,
          }
        })
        this.dataSource = new MatTableDataSource(this.productoItemsResponse)

        this.paginator.length = this.productoItemsResponse.length
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openCreate() {
    const dialogRef = this.dialog.open(CreateProductoComponent, {
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarProductos();
    });
  }

  openUpdate(producto: Producto) {
    const dialogRef = this.dialog.open(EditProductoComponent, {
      data: producto,
      width: '50vw',
      height: '60vh'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ListarProductos();
    });
  }

  async openDelete(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteComponent)

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {

        await this.productoService.deleteProducto(id).subscribe({
          next: (response: any) => {
            this.toaster.success(response.message, "Producto")
            this.ListarProductos()
          },
          error: (error) => {
            this.toaster.error(error, "Error")
          }
        })

      }
    })
  }

  openView(productoItems: Producto){
    console.log(productoItems)
    const pdfData: pdfData = {
      NombreProducto: productoItems.nombreProducto,
      idProducto: productoItems.idProducto.toString(),
      NombreMarca: productoItems.marca.nombreMarca,
      NombreModelo: productoItems.modelo.nombreModelo,
      NombreColor: productoItems.color.nombreColor,
      NombreTalla: productoItems.talla.nombreTalla,
      PrecioVenta: parseFloat(productoItems.precioVenta),
      imagen: productoItems.imagen
    };
    pdfcreate(pdfData);
  }

  exportExcel(): void{
    const dataToExport = this.dataSource.filteredData.map(row => {
      // Crear una copia de la fila actual para no modificar los datos originales
      const newRow = { ...row };
      
      // Eliminar las columnas 5, 6, 7 y 8 de la fila
      delete newRow.marca;
      delete newRow.color;
      delete newRow.talla;
      delete newRow.modelo;

      return newRow;
    });
    console.log(this.dataSource.filteredData)
    this.excelService.exportToExcel(dataToExport, 'nombre-del-archivo');

  }

  selectFile(): void {
    
    this.fileInput.nativeElement.click();
 
  }

  onFileInputChange(event: any): void {
    
    const target: DataTransfer = <DataTransfer>(event.target);
    const fileName: string = target.files[0].name.toLowerCase();

    if (target.files.length !== 1) {
      this.toaster.error('Seleccione un solo archivo', "Error de archivo")
      return
    }

    if (!(fileName.endsWith('.xls') || fileName.endsWith('.xlsx') || fileName.endsWith('.csv'))) {
      this.toaster.error('Seleccione un archivo Excel válido (.xls, .xlsx, .csv)', "Error al cargar")
      return
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // Obtener el nombre de la primera hoja
      const sheetName = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

      // Declarar variables de header(solo para validacion correcta de los headers de excel) y filas
      const headers: string[] = [];
      let rowData: { [key: string]: any[] } = {};

      const range = XLSX.utils.decode_range(worksheet['!ref']);
      
      //------------ Obtener los nombres de las columnas 
      for (let C = range.s.c; C <= range.e.c; ++C) {
        console.log(range)
        const address = XLSX.utils.encode_col(C) + '1';
        const cell = worksheet[address];
        if(cell){
          headers.push(cell.v);
        }else{
          console.log('falta columna')
        }
      }
      


      const tableColumns: string[] = ['nombreProducto', 'idMarca', 'idModelo', 'idColor', 'idTalla', 'imagen','precioVenta'];
    
      const headersLowercase = headers.map(header => header.toLowerCase().trim());

      console.log(headersLowercase)
      console.log(tableColumns)
      console.log(this.compareArrays(headersLowercase, tableColumns))

      
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const columnName = headers[C];
          let auxColumnaName;
          
          if (!rowData[columnName] && columnName) {
            auxColumnaName = columnName.toLowerCase().trim()
            rowData[auxColumnaName] = [];
          }
      
          for (let R = range.s.r + 1; R <= range.e.r + 1; R++) {
            const cellAddress = XLSX.utils.encode_col(C) + R;
            const cell = worksheet[cellAddress];

            if(cell){
              if(cell.v){
                rowData[auxColumnaName].push(cell.v);
              }
            }else{
              if(!rowData[auxColumnaName]){
              }else{
                rowData[auxColumnaName].push(null);
              }
              
            }      
          }
        }

        for(const key in rowData) {
          if (Array.isArray(rowData[key]) && rowData[key].length > 1) {
            rowData[key].shift();
          }
        }
        

        this.excelService.createMarca(rowData).subscribe({
          next: () => {
            this.toaster.success('Se cargo correctamente el excel', "Excel cargado correctamente")
            this.ListarProductos();
          },
          error: (error) => {
            this.toaster.error(error, "Error")
          }
        })
        console.log(rowData)
    };

    reader.readAsBinaryString(target.files[0]);
  }


  compareArrays(arr1: string[], arr2: string[]): boolean {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

}
