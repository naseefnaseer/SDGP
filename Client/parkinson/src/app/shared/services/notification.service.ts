import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snack: MatSnackBar
  ) { }


  /**
   *
   * Successful opertion notifier
   *
   * @param msg the message of the nasck bar
   * @param btn button
   */
  public successSnack(msg: string) {

    this.snack.open(msg, '', {
      duration: 2200,
      announcementMessage: 'Loading',
      panelClass: ['bg-success', 'text-white', 'font-weight-bold', 'py-3', 'mb-5', 'btn'],
      verticalPosition: 'bottom'
    });
  }

  /**
   *
   * Error notifier
   *
  * @param msg the message of the nasck bar
  */
  public errorSnack(msg: string) {
    this.snack.open(msg, '', {
      duration: 2700,
      announcementMessage: 'Loading',
      panelClass: ['bg-danger', 'text-white', 'font-weight-bold', 'py-3', 'mb-5', 'btn'],
      verticalPosition: 'bottom'
    });
  }


  /**
   *  Information notoifier
   *
  * @param msg the message of the nasck bar
  */
  public infoSnack(msg: string) {
    return this.snack.open(msg, '', {
      duration: 2500,
      announcementMessage: 'Loading',
      panelClass: ['bg-info', 'text-white', 'font-weight-bold', 'py-3', 'mb-5', 'btn'],
      verticalPosition: 'bottom'
    });
  }

}
