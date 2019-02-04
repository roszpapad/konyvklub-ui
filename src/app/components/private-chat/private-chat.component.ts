import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { ChatService } from 'src/app/_services/chat.service';
import { ActivatedRoute } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-private-chat',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.css']
})
export class PrivateChatComponent implements OnInit {

  username;
  channelId;
  messages;
  stompClient;
  channel;
  form;
  bookToSell;
  bookToPay;

  constructor(private tokenService: TokenService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      message: ['']
    });
    this.stompClient = null;
    this.username = this.tokenService.getTokenProperty("user_name");
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
    });
    this.chatService.getChannelById(this.channelId).subscribe(
      data => {
        this.channel = data;
        this.bookToSell = this.channel.bookToSell;
        this.bookToPay = this.channel.bookToPay;
        if (this.isUserInTheChat()) {
          this.connectToWS();
          this.putMessagesOnChatBox();
        }
      }
    );


  }

  connectToWS() {
    var socket = new SockJS("http://localhost:8083/konyvklub-websocket");
    this.stompClient = Stomp.over(socket);
    let that = this;
    this.stompClient.connect({}, function (frame) {

      that.stompClient.subscribe('/topic/chat/' + that.channelId, (messageGot) => {

        that.putMessageToPage(JSON.parse(messageGot.body));
      });
    });
  }

  sendMessage() {
    let message = this.getMessage();
    if (message) {
      this.stompClient.send("/app/chat/" + this.channelId, {}, JSON.stringify({
        "senderName": this.username,
        "recipientName": this.getChatPartner(),
        "message": message
      }))
    }
  }

  isMyMessage(message): boolean {
    return message.senderName == this.username;
  }

  isButtonDisabled() {
    let text = $("#messageField").val();
    return text == null || text == '';
  }

  putMessageToPage(messageGot) {
    if (this.isMyMessage(messageGot)) {
      $('.chatBox').append("<div class='myMsgDiv mt-1'><p class='myMsg'>" + messageGot.message + "</p></div>");
    } else {
      $('.chatBox').append("<div class='notMyMsgDiv mt-1'><p class='notMyMsg'>" + messageGot.message + "</p></div>");
    }
    this.scrollToTheEnd();
  }

  putMessagesOnChatBox() {
    this.chatService.getMessagesByChannel(this.channelId).subscribe(
      data => {
        this.messages = data;

        this.messages.forEach(element => {
          this.putMessageToPage(element);
        });
        this.scrollToTheEnd();
      }
    );
  }

  getChatPartner() {
    if (this.channel.usernameOne == this.username) {
      return this.channel.usernameTwo;
    } else {
      return this.channel.usernameOne;
    }
  }

  isUserInTheChat() {
    return this.username == this.channel.usernameOne || this.username == this.channel.usernameTwo;
  }

  getMessage() {
    let message = $("#messageField").val();
    $("#messageField").val('');
    return message;
  }

  scrollToTheEnd() {
    var objDiv = document.getElementsByClassName("chatBox")[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  get message() { return this.form.get("message"); }

}
