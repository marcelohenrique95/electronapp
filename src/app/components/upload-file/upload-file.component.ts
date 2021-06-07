import { UploadFileService } from './../../service/upload-file.service';
import { HttpParams, HttpRequest, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  file: any;
  logger: any;
  public id: Guid;
  showMsg: boolean = false;
  typeFile: string = '';
  sender: string = '';
  recipient: string = '';

  constructor(private uploadFileService: UploadFileService, private http: HttpClient, private _electronService: ElectronService) {

    if (this._electronService.isElectronApp) {
      this.logger = this._electronService.remote.require("electron-log");
    }
  }

  ngOnInit(): void {
  }

  uploadFile(event) {
    this.uploadFileService.inputFileChange(event.target.files[0]);
    this.id = Guid.create();
    this.logger.info('guid criado: ' + this.id);
  }

  sendFile() {
    Guid.create();
    this.showMsg = true;
  }

  changeSender(evt: any){
    this.sender = evt.target.value;
  }

  changeRecipient(evt: any){
    this.recipient = evt.target.value;
  }

  changeTypeFile(evt: any){
    this.typeFile = evt.target.value;
  }

}
