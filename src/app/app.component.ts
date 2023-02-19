import { Component } from '@angular/core';

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
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.language);
  }
}
