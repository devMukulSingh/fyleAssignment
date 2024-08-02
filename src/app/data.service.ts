import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IformValues } from './components/form/form.component';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private data = new Subject<IformValues[]>();
    data$ = this.data.asObservable();

    setData(data: IformValues[]) {
        this.data.next(data);
    }
}