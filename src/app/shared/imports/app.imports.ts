import { RouterTestingModule } from "@angular/router/testing";
import { AppModule } from "@app/app.module";
import { SharedModule } from "../shared.module";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { IonicModule } from "@ionic/angular";


export const imports = [
    AppModule,
    RouterTestingModule.withRoutes([]),
    SharedModule,
    RouterModule,
    TranslateModule.forRoot(),
    IonicModule.forRoot()
];