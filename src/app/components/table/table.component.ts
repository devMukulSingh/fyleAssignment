import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { IformValues } from '../form/form.component';
import { DataService } from '../../data.service';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  
  initialData = typeof window!=="undefined" ? JSON.parse(window.localStorage.getItem('tableData') || "{}") : []
  subscription: Subscription;
  dataSource = new ExampleDataSource(this.initialData || []);

  constructor(private dataService: DataService,) {
    this.subscription = this.dataService.data$.subscribe(data => {
      window.localStorage.setItem('tableData',JSON.stringify([...data,...this.initialData]))
      this.dataSource.setData([...this.initialData,...data]);
    });
  }
  displayedColumns: string[] = ['userName', 'workoutType', 'workoutMinutes'];
  
}

class ExampleDataSource extends DataSource<IformValues> {
  private _dataStream = new ReplaySubject<IformValues[]>();

  constructor(initialData: IformValues[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IformValues[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: IformValues[]) {
    this._dataStream.next(data);
  }
}