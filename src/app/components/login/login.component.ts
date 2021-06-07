import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { RegisterKeyModel } from './../../model/registerkey.model';
import { UserModel } from './../../model/user.model';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ElectronService } from 'ngx-electron';
declare const TesteDb: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserForm: FormGroup;
  userModel: UserModel;
  isSubmitted = false;
  registerKeyModel: RegisterKeyModel;
  registerKey: any;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private _electronService: ElectronService) { }

  async ngOnInit() {
    this.registerKey = this._electronService.ipcRenderer.sendSync('findonebyentity-nedb', ['register.key']);
    this.authService.logout();
    this.loginUserForm = this.fb.group({
      inputKey: [null, Validators.required]
    });

    console.log(this.registerKey);

    if (this.registerKey != null) {
      console.log('Chave encontrada, estamos redirecionando...');
      this.router.navigateByUrl('/dashboard/default');
      this.authService.isLoggedIn.next(true);
    } else {
      console.log('Chave não cadastrada na aplicacao.');
    }
  }


  async userLogin() {
    if (this.loginUserForm.get('inputKey').valid) {
      console.log(this.loginUserForm.get('inputKey').value);
      this.registerKeyModel = { registerKey: this.loginUserForm.get('inputKey').value, entityName: 'register.key' }
      console.log(this.registerKeyModel);
      this._electronService.ipcRenderer.send('insert-nedb', [this.registerKeyModel]);

      this.router.navigateByUrl('/dashboard/default');
      this.authService.isLoggedIn.next(true);
    }
  }

}
