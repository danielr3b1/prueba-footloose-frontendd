import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Color, Marca, Modelo, Producto, Talla } from '../../../interface/catalogo.interface';
import { isFileAnImage } from '../../../utils/utils-func';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/productos.service';
import { ToastrService } from 'ngx-toastr';
import { MarcaService } from '../../../services/marca.service';
import { ModelosService } from '../../../services/modelos.service';
import { ColoresService } from '../../../services/colores.service';
import { TallaService } from '../../../services/talla.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { error } from 'console';

@Component({
  selector: 'app-create-producto',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.scss'
})
export class CreateProductoComponent implements OnInit {

  producto!: Producto;
  imagePreview!: string;
  imageFile!: File;

  marcaList!: Marca[];
  modeloList!: Modelo[];
  colorList!: Color[];
  tallaList!: Talla[];

  private fb = inject(FormBuilder)
  private productoService = inject(ProductoService)
  private marcaService = inject(MarcaService)
  private modeloService = inject(ModelosService)
  private colorService = inject(ColoresService)
  private tallaService = inject(TallaService)
  private toaster = inject(ToastrService)

  constructor(private dialogRef: MatDialogRef<CreateProductoComponent>) {
  }

  ngOnInit(): void {
    this.getListMarca()
    this.getListModelo()
    this.getListColor()
    this.getListTalla()
  }

  public productoForm: FormGroup = this.fb.group({
    nombreProducto: ['', [Validators.required]],
    idMarca: ['', [Validators.required]],
    idModelo: ['', [Validators.required]],
    idColor: ['', [Validators.required]],
    idTalla: ['', [Validators.required]],
    precioVenta: ['', [Validators.required]],
  })

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

      const formData = new FormData();
      formData.append('nombreProducto', this.productoForm.get("nombreProducto")?.value);
      formData.append('idMarca', this.productoForm.get("idMarca")?.value);
      formData.append('idModelo', this.productoForm.get("idModelo")?.value);
      formData.append('idColor', this.productoForm.get("idColor")?.value)
      formData.append('idTalla', this.productoForm.get("idTalla")?.value)
      formData.append('precioVenta', this.productoForm.get("precioVenta")?.value);

      if (this.imageFile != null) {
        formData.append('file', this.imageFile);
      }

      this.productoService.createProducto(formData).subscribe({
        next: (response: any) => {
          this.dialogRef.close();
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
        input.value = '';
      }
    }
  }
}
