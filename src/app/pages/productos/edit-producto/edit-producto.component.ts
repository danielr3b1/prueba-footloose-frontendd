import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Color, Marca, Modelo, Producto, Talla } from '../../../interface/catalogo.interface';
import { environment } from '../../../environments/environments';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from '../../../services/productos.service';
import { MarcaService } from '../../../services/marca.service';
import { ModelosService } from '../../../services/modelos.service';
import { ColoresService } from '../../../services/colores.service';
import { TallaService } from '../../../services/talla.service';
import { ToastrService } from 'ngx-toastr';
import { isFileAnImage } from '../../../utils/utils-func';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    CommonModule,
    MatSelectModule],
  templateUrl: './edit-producto.component.html',
  styleUrl: './edit-producto.component.scss'
})
export class EditProductoComponent implements OnInit {


  ngOnInit(): void {
    this.showListDown()
    this.getListMarca()
    this.getListModelo()
    this.getListColor()
    this.getListTalla()
  }

  producto!: Producto;
  imagePreview: string = environment.BACKEND_URL + 'users/profile-image/' + this.data.imagen;
  imageFile!: File;

  marcaList!: Marca[];
  modeloList!: Modelo[];
  colorList!: Color[];
  tallaList!: Talla[];

  constructor(private dialogRef: MatDialogRef<EditProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto) {
  }


  private fb = inject(FormBuilder)
  private productoService = inject(ProductoService)
  private marcaService = inject(MarcaService)
  private modeloService = inject(ModelosService)
  private colorService = inject(ColoresService)
  private tallaService = inject(TallaService)
  private toaster = inject(ToastrService)


  public productoForm: FormGroup = this.fb.group({
    idProducto: ['', Validators.required],
    nombreProducto: ['', [Validators.required]],
    idMarca: ['', [Validators.required]],
    idModelo: ['', [Validators.required]],
    idColor: ['', [Validators.required]],
    idTalla: ['', [Validators.required]],
    precioVenta: ['', [Validators.required]],
  })


  showListDown() {
    this.productoForm.setValue({
      idProducto: this.data.idProducto || null,
      nombreProducto: this.data.nombreProducto || null,
      idMarca: this.data.marca.idMarca || null,
      idModelo: this.data.modelo.idModelo || null,
      idColor: this.data.color.idColor || null,
      idTalla: this.data.talla.idTalla || null,
      precioVenta: this.data.precioVenta || null
    })
  }

  getListMarca() {
    this.marcaService.listMarca().subscribe({
      next: (marcaItems) => {
        this.marcaList = marcaItems
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  async getListModelo() {
    this.modeloService.listModelos().subscribe({
      next: (modeloItems) => {
        this.modeloList = modeloItems
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  async getListColor() {
    this.colorService.listColores().subscribe({
      next: (colorItems) => {
        this.colorList = colorItems
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  async getListTalla() {
    this.tallaService.listTalla().subscribe({
      next: (tallaItems) => {
        this.tallaList = tallaItems
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  registrar() {

    if (this.productoForm.valid) {

      const formData = new FormData()
      formData.append('nombreProducto', this.productoForm.get("nombreProducto")?.value);
      formData.append('idMarca', this.productoForm.get("idMarca")?.value);
      formData.append('idModelo', this.productoForm.get("idModelo")?.value);
      formData.append('idColor', this.productoForm.get("idColor")?.value);
      formData.append('idTalla', this.productoForm.get("idTalla")?.value);
      formData.append('precioVenta', this.productoForm.get("precioVenta")?.value);
      formData.append('imagen', this.data.imagen);

      if (this.imageFile != null) {
        formData.append('file', this.imageFile);
      }


      this.productoService.updateProducto(this.data.idProducto + "", formData).subscribe({
        next: (response: any) => {
          this.dialogRef.close()
          this.toaster.success(response.message, "Producto")
        },
        error: (error) => {
          this.toaster.error(error, "Producto")
        }
      })
    }
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

}
