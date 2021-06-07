import { ReceiveFileComponent } from './components/receive-file/receive-file.component';
import { ProvideFileComponent } from './components/provide-file/provide-file.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { TraceabilityComponent } from './components/traceability/traceability.component';
import { NgbDropdownModule, NgbTooltipModule, NgbButtonsModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './components/theme/shared/shared.module';
import { ToggleFullScreenDirective } from './components/theme/shared/full-screen/toggle-full-screen';
import { NavRightComponent } from './components/theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavLeftComponent } from './components/theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './components/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavBarComponent } from './components/theme/layout/admin/nav-bar/nav-bar.component';
import { NavCollapseComponent } from './components/theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './components/theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavContentComponent } from './components/theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavLogoComponent } from './components/theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavItemComponent } from './components/theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavigationComponent } from './components/theme/layout/admin/navigation/navigation.component';
import { AuthComponent } from './components/theme/layout/auth/auth.component';
import { AdminComponent } from './components/theme/layout/admin/admin.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule } from 'ngx-mask';
import { NgxElectronModule } from 'ngx-electron';
// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {SelectModule} from 'ng-select';
import { NavigationItem } from './components/theme/layout/admin/navigation/navigation';
import { UploadFileComponent } from './components/upload-file/upload-file.component';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavItemComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavBarComponent,
    NavSearchComponent,
    NavLeftComponent,
    NavRightComponent,
    ToggleFullScreenDirective,
    TraceabilityComponent,
    ConfigurationComponent,
    LoginComponent,
    ProvideFileComponent,
    ReceiveFileComponent,
    UploadFileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgxPaginationModule,
    NgxMaskModule,
    NgxElectronModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    SelectModule,
    NgbTabsetModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [NavigationItem],
  bootstrap: [AppComponent]
})
export class AppModule { }
