import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';

import { AppPage } from '@models/index';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  public languages: string[] = ['en', 'ar'];
  public language: string = this.languages[0];

  public appPages: AppPage[] = [];

  constructor(
    public platform: Platform,
    protected translate: TranslateService
  ) {
    this.platform.ready().then(() => {
      this.translate.addLangs(this.languages);
      this.translate.setDefaultLang(this.language);
      this.translate.use(this.language);
    });
  }

  ngOnInit(): void {
    const color: AppPage = {
      type: 'toggle',
      title: 'menu.theme'
    };
    this.appPages.push(color);

    // TODO: Get color from local storage
    document.body.setAttribute('color-theme', 'light')
  }

  toggleChanged(event: any, p: AppPage): void {
    switch(p.title) {
      case 'menu.theme': {
        this.toggleTheme(event);
        break;
      }
      default: {
        break;
      }
    }
  }

  toggleTheme(event: any): void {
    event.detail.checked ? 
    document.body.setAttribute('color-theme', 'dark') : document.body.setAttribute('color-theme', 'light');
  }
}
