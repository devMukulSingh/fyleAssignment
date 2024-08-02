import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MAT_ERROR, MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataService } from '../../data.service';
 
export type IformValues = Partial<{
  userName:string | null | undefined,
  workoutType: string | null | undefined,
  workoutMinutes:number | null | undefined,
}>


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule,MatError,  MatSelectModule, MatButtonModule, MatDividerModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  tableArray: IformValues[] = []
  @Output() onAdd: EventEmitter<IformValues[]> = new EventEmitter()
  errorMessage = signal('');
  fitness = new FormGroup({
    userName : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
    workoutType : new FormControl('' , [Validators.required,Validators.minLength(1)]),
    workoutMinutes : new FormControl(0,Validators.min(1)),
  })
  onSubmit() {  
    if(this.fitness.invalid){
      return;
    }
    this.tableArray.push(this.fitness.value)
    this.onAdd.emit(this.tableArray)
    this.dataService.setData(this.tableArray);
    this.fitness.reset();
  }
  constructor(private dataService: DataService) {
    merge(this.fitness.statusChanges, this.fitness.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  updateErrorMessage(){
    if (this.fitness.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.fitness.hasError('fitness')) {
      this.errorMessage.set('Not a valid ');
    } else {
      this.errorMessage.set('');
    }
  }
}
