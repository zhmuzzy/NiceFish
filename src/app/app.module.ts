import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateService, TranslateStore } from "@ngx-translate/core";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { SharedModule } from "./shared/shared.module";
import { AppComponent } from "./app.component";
import { SignInService } from "./blog/user/sign-in/sign-in.service";
import { RetrievePwdComponent } from "./blog/user/retrieve-pwd/retrieve-pwd.component";
import { RetrievePwdService } from "./blog/user/retrieve-pwd/retrieve-pwd.service";
import { EqualValidator } from "./blog/user/sign-up/equal-validator.directive";
import { AppRoutingModule } from "./app.routing.module";
import { ApiInterceptor } from "./ApiInterceptor";
import { AuthGuard } from "./shared/auth-guard";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RetrievePwdComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "NiceFish" }),
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
    ToastModule,
    AppRoutingModule
  ],
  providers: [
    TranslateService,
    TranslateStore,
    SignInService,
    RetrievePwdService,
    MessageService,
    AuthGuard,
    [
      { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
