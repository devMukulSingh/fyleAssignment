import { Injectable } from '@angular/core';
import { IformValues } from '../components/form/form.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  tableData = new ReplaySubject<IformValues>();

  constructor() {

  }


}

