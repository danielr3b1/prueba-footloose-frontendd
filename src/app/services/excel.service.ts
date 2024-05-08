import * as XLSX from 'xlsx';
import { Injectable, inject } from "@angular/core";
import { environment, Marca } from '../index';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  exportToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  private readonly base_url: string = environment.BACKEND_URL;
  private readonly _http = inject(HttpClient);

  createMarca(excel: any): Observable<any> {
    return this._http.post<any>(`${this.base_url}productos/excel/import`, excel)
}

}