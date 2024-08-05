import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent, IformValues } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormComponent,TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  tableData : IformValues[] = []
  @Output() onAdd:EventEmitter<IformValues[]> = new EventEmitter();
  @Output() onDataAdd: EventEmitter<IformValues[]> = new EventEmitter();

constructor(){
  
}

  title = 'my-app';
}
