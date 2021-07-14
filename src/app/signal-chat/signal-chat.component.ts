import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import Settings from '../app.settings'

@Component({
  selector: 'app-signal-chat',
  templateUrl: './signal-chat.component.html',
  styleUrls: ['./signal-chat.component.scss']
})
export class SignalChatComponent implements OnInit {

  constructor() { }

  private _hubConnection: HubConnection | undefined;
  public async: any;
  private baseUrl = "http://ng-test.dmsoft.ru"
  message = 'test message for you';
  messages: string[] = [];

  ngOnInit(): void {
    let token = localStorage["token"];
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl + "/signalr/close", {
        accessTokenFactory: ()=>{ return token }
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on("message", function (data) {
      console.log("open hub message:");
      console.log(data);
    });


    this._hubConnection.on("started", function (data) {
      console.log(data);
    });
  }
  
  public sendMessage(): void {
    async function postMessage(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return await response;
    }
    postMessage(this.baseUrl + "/api/test/messsage/close", { message: `Sent: ${this.message}` }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }


}
