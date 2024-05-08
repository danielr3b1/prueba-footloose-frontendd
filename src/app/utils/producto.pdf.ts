import pdfMake from 'pdfMake/build/pdfmake';
import pdfFonts from 'pdfMake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { environment } from '../index'
import printJS, * as printjs from 'print-js';
import { pdfData } from '../interface/pdf.interface';





async function urlImagenAbase64(urlImagen: string): Promise<string> {
    try {
      const response = await fetch(urlImagen);
      const blob = await response.blob();
  
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
  
        reader.onerror = () => {
          reject(new Error('Error al leer la imagen como base64.'));
        };
  
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error('Error al obtener la imagen: ');
    }
}


export async function pdfcreate(data: pdfData) {
    const rutaImagenLogo = '../../assets/img/icon/FOOTLOOSELOGOLOGIN.jpg';
    const rutaImageProduct = environment.BACKEND_URL + 'users/profile-image/' + data.imagen;

    const imageLogo = await urlImagenAbase64(rutaImagenLogo);
    const imageProduct = await urlImagenAbase64(rutaImageProduct);

    const NombreProducto = data.NombreProducto;
    const CodigoProducto = "Código: " + data.idProducto;
    const NombreMarca = "Marca: " + data.NombreMarca;
    const NombreModelo = "Modelo: " + data.NombreModelo;
    const NombreColor = "Color: " + data.NombreColor;
    const NombreTalla = "Talla: " + data.NombreTalla;
    const PrecioVenta = "Precio: S/ " + data.PrecioVenta;

    const colorRojo = '#f7323f';
    const tittleColor = '#5C0E50';
    const colorNegro = '#470952';
    const colorMorado = '#470952';

    const pdfHeader = [
        {
            image: imageLogo,
            fit: [140, 140],
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 40], // Ajustar margen superior
        },
        {
            text: 'Información del Producto',
            style: 'title',
            color: colorNegro,
            bold: true,
            fontSize: 22,
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10],
        },
        {
            table: {
                widths: [220],
                alignment: 'center',
                body: [
                    [{
                        image: imageProduct,
                        fit: [130, 130],
                        margin: [0, 20],
                        alignment: 'center', // Centrar horizontalmente
                    }]
                ]
            },
            alignment: 'center', // Centrar horizontalmente
            margin: [165, 20],
        },
        {
            text: NombreProducto,
            style: 'title',
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10],
        },
        {
            text: CodigoProducto,
            style: 'info',
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10],
        },
        {
            text: NombreMarca,
            style: 'info',
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10],
        },
        {
            text: NombreModelo,
            style: 'info',
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10],
        },
        {
            text: NombreColor,
            style: 'info',
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10],
        },
        {
            text: NombreTalla,
            style: 'info',
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10],
        },
        {
            text: PrecioVenta,
            style: 'title',
            alignment: 'center', // Centrar horizontalmente
            margin: [0, 10, 0, 20], // Ajustar margen inferior
        }
    ];

    const pdfFooter = [
        {
            absolutePosition: { x: 0, y: 795 },
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 595.276,
                    h: 50,
                    color: colorMorado,
                },
            ],
        },
        {
            absolutePosition: { x: 0, y: 0 },
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 595.276,
                    h: 50,
                    color: colorMorado,
                },
            ],
        },
        {
            absolutePosition: { x: 0, y: 0 },
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 841.89,
                    color: colorMorado,
                },
            ],
        },
        {
            absolutePosition: { x: 545, y: 0 },
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 50,
                    h: 841.89,
                    color: colorMorado,
                },
            ],
        },
    ];

    const pdfStyles = {
        title: {
            fontSize: 22,
            bold: true,
            color: colorRojo,
            alignment: 'center', // Centrar horizontalmente
        },
        info: {
            fontSize: 16,
            color: tittleColor,
        },
    };

    const pdfContent = [
        pdfHeader,
        pdfFooter
    ];

    const pdfDefinition = {
        pageSize: 'A4',
        pageMargins: [20, 20, 20, 20],
        info: {
            title: 'F001-000001',
            author: 'maclode',
            subject: 'ticket',
            keywords: 'tck, sale',
        },
        content: pdfContent,
        styles: pdfStyles,
    };

    const pdfMakeCreatePdf = pdfMake.createPdf(pdfDefinition);
    pdfMakeCreatePdf.getBase64((data) => {
        printJS({
            printable: data,
            type: 'pdf',
            base64: true,
        });
    });
}


