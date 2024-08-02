import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  // errorMessage = signal('');
   fitness = new FormGroup({
     userName : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
     workoutType : new FormControl(''),
     workoutMinutes : new FormControl(''),
   })
  onSubmit() {  
    console.log(this.fitness.value);
    this.fitness.reset();
  }
  constructor() {

  }
}
