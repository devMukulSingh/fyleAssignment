import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StoreService } from '../../services/store.service';

export type IformValues = Partial<{
  userName: string | null | undefined,
  workoutType: string | null | undefined,
  workoutMinutes: number | null | undefined,
}>


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatError,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {

  @Output() onClick: EventEmitter<IformValues[]> = new EventEmitter()
  dataSource!: MatTableDataSource<IformValues>;

  fitness = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    workoutType: new FormControl('', [Validators.required, Validators.minLength(1)]),
    workoutMinutes: new FormControl(0, Validators.min(1)),
  })

  @ViewChild(MatTable) table!: MatTable<IformValues>;
  onSubmit() {
    if (this.fitness.invalid) {
      return;
    }
    const prev = JSON.parse(window.localStorage.getItem('tableData') || "[]") || [];
    const total= [...prev, this.fitness.value]
    window.localStorage.setItem('tableData', JSON.stringify(total));
    this.dataService.tableData.next(this.fitness.value);
    this.fitness.reset();
  }

  constructor(private dataService: StoreService) {

  }

}
