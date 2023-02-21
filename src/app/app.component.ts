import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public languages: string[] = ['en', 'ar'];
  public language: string = this.languages[0];

  public appPages = [];

  constructor(
    public platform: Platform,
    private translate: TranslateService
  ) {
    this.platform.ready().then(() => {
      this.translate.addLangs(this.languages);
      this.translate.setDefaultLang(this.language);
      this.translate.use(this.language);
  });
  }
}
