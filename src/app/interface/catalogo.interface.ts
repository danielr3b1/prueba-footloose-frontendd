export interface Modelo {
    idModelo: number;
    nombreModelo: string;
    isActive: Boolean;
}

export interface Marca {
    idMarca: number;
    nombreMarca: string;
    isActive: Boolean;
}


export interface Talla {
    idTalla: number;
    nombreTalla: string;
    isActive: Boolean;
}

export interface Color {
    idColor: number;
    nombreColor: string;
    isActive: Boolean;
}

export interface Producto {
    idProducto: number;
    nombreProducto: string;
    imagen: string;
    precioVenta: string;
    isActive: boolean;
    marca: Marca;
    modelo: Modelo;
    color: Color;
    talla: Talla;
}

export interface ProductoExcel {
    idProducto: number;
    nombreProducto: string;
    imagen: string;
    precioVenta: string;
    isActive: boolean;
    nombreMarca: Marca;
    nombreModelo: Modelo;
    nombreColor: Color;
    nombreTalla: Talla;
}