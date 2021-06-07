import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams, HttpRequest } from '@angular/common/http';
import { Client } from '@stomp/stompjs';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService{

  constructor(private http: HttpClient, private router: Router) { }

  inputFileChange(file: any){
      const formData = new FormData();
      formData.append('file', file);
      console.log('size: ' , file.size);
      console.log ('type : ', file.type);

      let params = new HttpParams();

      const options = {
        params: params,
        reportProgress: true,
      };

      const req = new HttpRequest('POST', 'http://localhost:8081/upload', formData, options);

      this.http.request(req).subscribe();
    }
  }







