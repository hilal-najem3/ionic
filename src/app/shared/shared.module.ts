import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ErrorMessageComponent } from './components';

const COMPONENTS = [
  ErrorMessageComponent
];

const MODULES = [
  IonicModule.forRoot(),
  CommonModule,
  RouterModule,
  TranslateModule
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    TranslateModule,
    ...COMPONENTS
  ],
  providers: [
    TranslateService,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
    };
  }
}
