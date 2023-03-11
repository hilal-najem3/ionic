 import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async show(toastOptions: ToastOptions): Promise<void> {
    const toaster = await this.toastController.create(toastOptions);
    toaster.present();
  }
}
