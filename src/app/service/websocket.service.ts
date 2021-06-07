import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  stompStatus: boolean;
  ws: any;
  stompClient: any;

  constructor() {
    const that = this;
    this.initializeWebSocketConnection();
  }

  public msg = [];

  initializeWebSocketConnection() {
    const that = this;
    var stompSuccessCallback = function (frame) {
      that.stompStatus = true;
      console.log('STATUS ATUAL:'+ that.stompStatus);
      console.log('STOMP: Connection successful');
    };

    var stompFailureCallback = function (error) {
      that.stompStatus = false;
      console.log('STATUS ATUAL:'+ that.stompStatus);
      console.log('STOMP: ' + error);
      this.connect(stompSuccessCallback, stompFailureCallback);
    };

    this.connect(stompSuccessCallback, stompFailureCallback);
  }

  connect(stompSuccessCallback: any, stompFailureCallback: any) {
    const that = this;
    this.stompStatus = false;
    console.log('STOMP: Attempting connection');
    this.ws = new SockJS('http://localhost:8080/websocket');
    this.stompClient = Stomp.over(this.ws);
    this.stompClient.reconnect_delay = 3000;
    this.stompClient.onDisconnect = () => {this.connect(stompSuccessCallback, stompFailureCallback) }
    this.stompClient.onStompError = () => { this.connect(stompSuccessCallback, stompFailureCallback) }
    this.stompClient.onWebSocketClose = () => { this.connect(stompSuccessCallback, stompFailureCallback) }
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/statusProcessor', (message) => {
        that.stompStatus=true;
        if (message.body) {
          that.msg.push(message.body);
        }
      });
      stompSuccessCallback();
    }, function (error) {
      that.stompStatus=false;
      console.log("Web socket error", error);
      this.connect(stompSuccessCallback, stompFailureCallback)
  });
  }
}