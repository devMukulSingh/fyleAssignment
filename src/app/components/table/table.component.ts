import { AfterViewInit, ChangeDetectorRef, Component, Input, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IformValues } from '../form/form.component';
import { Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {
  @Input() tableData:IformValues[] = [];
  displayedColumns: string[] = ['userName', 'workoutType', 'workoutMinutes'];
  initialData: IformValues[] = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('tableData') || "[]") : [];

  @ViewChild(MatTable) table!: MatTable<IformValues>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  
  dataSource: MatTableDataSource<IformValues> = new MatTableDataSource(this.initialData);
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private dataService: StoreService) {
    this.dataService.tableData.subscribe( (data) => {
      this.dataSource.data.push(data)
      this.dataSource = new MatTableDataSource(this.dataSource.data)
    })
    // this.dataSource.paginator = this.paginator;
  }
  
}


// class ExampleDataSource extends DataSource<IformValues> {
//   private _dataStream = new ReplaySubject<IformValues[]>();

//   constructor( dataService: StoreService) {
//     super();
//     this.setData(dataService.dataSource.data);
//   }

//   connect(): Observable<IformValues[]> {
//     return this._dataStream;
//   }

//   disconnect() { }

//   setData(data: IformValues[]) {
//     this._dataStream.next(data);
//   }
// }