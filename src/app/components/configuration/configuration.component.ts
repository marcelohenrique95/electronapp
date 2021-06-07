import { RegisterKeyModel } from './../../model/registerkey.model';
import { ElectronService } from 'ngx-electron';
import { ProxyModel } from '../../model/proxy.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  userProxyModel: ProxyModel;
  registerKeyModel: RegisterKeyModel;
  userProxyForm: FormGroup;
  changePasswordForm: FormGroup;
  erro: any;
  typeClient: string;
  activeProxy: boolean;
  logger: any;
  public paginaAtual = 1;
  showMsg: boolean = false;
  showMsgError: boolean = false;
  showMsgLength: boolean = false;
  registerKey: any;
  passOld: any;
  newPass: any;
  newPassRepeat: any;

  constructor(private router: Router, private fb: FormBuilder, private _electronService: ElectronService) {
    if (this._electronService.isElectronApp) {
      this.logger = this._electronService.remote.require("electron-log");
    }
  }


  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      inputNewPass: ['', [Validators.required, Validators.minLength(4)]],
      inputNewPassRepeat: ['', [Validators.required, Validators.minLength(4)]]
    });



    this.userProxyModel = this._electronService.ipcRenderer.sendSync('findonebyentity-nedb', ['proxy']);

    if (this.userProxyModel != null) {
      this.activeProxy = this.userProxyModel.activeProxy;
      this.userProxyForm = this.fb.group({
        inputIpProxy: [this.userProxyModel.ip], inputPortProxy: [this.userProxyModel.port],
        inputUserProxy: [this.userProxyModel.userProxy], inputPassProxy: [this.userProxyModel.passwordProxy],
        activeProxy: [this.userProxyModel.activeProxy]
      });
    } else {
      this.userProxyForm = this.fb.group({
        inputIpProxy: [null], inputPortProxy: [null], inputUserProxy: [null], inputPassProxy: [null], activeProxy: [false]
      })
    }
  }

  onCheckChange(event) {
    this.logger.info('Selecionou para usar proxy.');
    this.activeProxy = event.target.checked
    this._electronService.ipcRenderer.send('show-notification', ['Proxy Notification', 'Uso de proxy selecionado..']);

  }

  handleChange(evt: string) {
    this.typeClient = evt;
  }



  configProxy() {
    if (this.userProxyModel === null) {
      this.userProxyModel = {
        ip: this.userProxyForm.get('inputIpProxy').value,
        port: this.userProxyForm.get('inputPortProxy').value,
        userProxy: this.userProxyForm.get('inputUserProxy').value,
        passwordProxy: this.userProxyForm.get('inputPassProxy').value,
        activeProxy: this.activeProxy,
        entityName: 'proxy'
      };
      this._electronService.ipcRenderer.send('insert-nedb', [this.userProxyModel]);
    } else {
      this.userProxyModel.ip = this.userProxyForm.get('inputIpProxy').value,
        this.userProxyModel.port = this.userProxyForm.get('inputPortProxy').value,
        this.userProxyModel.userProxy = this.userProxyForm.get('inputUserProxy').value,
        this.userProxyModel.passwordProxy = this.userProxyForm.get('inputPassProxy').value,
        this.userProxyModel.activeProxy = this.activeProxy,
        this.userProxyModel.entityName = 'proxy'

      this._electronService.ipcRenderer.send('update-nedb', ['proxy', this.userProxyModel]);

    }
  }

  includePostalBox() {

  }

  syncronize() {

  }

  remove() {

  }



  verifyLenght() {
    this.newPass = this.changePasswordForm.get('inputNewPass').value;
    if (this.newPass == null || this.newPass == '' || this.newPass.length < 5) {
      this.showMsgLength = true;
    } else {
      this.changePass()
      this.showMsgLength = false;
    }

  }

  changePass() {
    this.newPassRepeat = this.changePasswordForm.get('inputNewPassRepeat').value;
    if (this.newPass === this.newPassRepeat) {
      this.registerKeyModel = { registerKey: this.newPass, entityName: 'register.key' }
      this._electronService.ipcRenderer.send('update-nedb', ['register.key', this.registerKeyModel]);
      this.showMsg = true;
    } else {
      this.showMsgError = true;
    }
  }
}
