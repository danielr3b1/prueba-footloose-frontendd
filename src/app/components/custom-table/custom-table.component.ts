import { Component, Input, ElementRef, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headerTable } from './interface/header-table.interface';


@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent implements AfterViewInit {
  private elementRef: ElementRef = inject(ElementRef)

  @Input() headerListTable: headerTable[] = [
    {
      header: "ID",
      with: "31px"
    },
    {
      header: "MARCA",
      with: "with: 75px;"
    }, {
      header: "ACCIONES",
      with: "with: 34px"
    }
  ]

  private loadPlugin(): void {
    const script = document.createElement('script');
    script.src = '../../../assets/js/demo/datatables-demo.js'; // Ruta a tu plugin
    script.type = 'text/javascript';
    script.onload = () => {
      console.log('Plugin cargado correctamente.');
    };
    this.elementRef.nativeElement.appendChild(script);
  }

  ngAfterViewInit(): void {
    this.loadPlugin();
  }

}
