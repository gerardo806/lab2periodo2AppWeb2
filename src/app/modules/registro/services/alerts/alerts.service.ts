import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'Aceptar', duration: number = 2000) {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  showSuccess(message: string) {
    this.openSnackBar(message, 'Aceptar');
  }

  showError(message: string) {
    this.openSnackBar(message, 'Cerrar');
  }

  showConfirmation(message: string, action: string = 'Confirmar'): Promise<boolean> {
    return new Promise((resolve) => {
      const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open(message, action, {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });

      snackBarRef.onAction().subscribe(() => {
        resolve(true);
      });

      snackBarRef.afterDismissed().subscribe(() => {
        resolve(false);
      });
    });
  }
}
