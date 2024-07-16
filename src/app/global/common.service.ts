import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private snackBar: MatSnackBar) { }
  
  snackbar1(message: string, color: string) {
    let s;
    if (color == "success") {
      s = "greenMsg";
    } else if (color == "error") {
      s = "redMsg";
    } else if (color == "warning") {
      s = "yellowMsg";
    }
    this.snackBar.open(message, "x", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 30000,
      panelClass: [s],
    });
  }
}
