import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) {}

  // tslint:disable-next-line:typedef
    showSnackbar(message, action, duration) {
        this.snackBar.open(message, action, {
            duration
        });
    }
}
