import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/theme/layout/admin/admin.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'traceability',
        loadChildren: () => import('./components/traceability/traceability.module').then(m => m.TraceabilityModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'configuration',
        loadChildren: () => import('./components/configuration/configuration.module').then(m => m.ConfigurationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'upload-file',
        loadChildren: () => import('./components/upload-file/upload-file.module').then(m => m.UploadFileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'receive-file',
        loadChildren: () => import('./components/receive-file/receive-file.module').then(m => m.ReceiveFileModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'provide-file',
        loadChildren: () => import('./components/provide-file/provide-file.module').then(m => m.ProvideFileModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: LoginComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
