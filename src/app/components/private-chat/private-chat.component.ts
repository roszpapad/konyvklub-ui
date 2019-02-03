import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { ChatService } from 'src/app/_services/chat.service';
import { ActivatedRoute } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';

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

  constructor(private tokenService: TokenService,
    private chatService: ChatService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.stompClient = null;
    this.username = this.tokenService.getTokenProperty("user_name");
    this.route.params.subscribe(params => {
      this.channelId = params['id'];
    });
    this.chatService.getChannelById(this.channelId).subscribe(
      data => {
        this.channel = data;
        this.connectToWS();
        this.putMessagesOnChatBox();
      }
    );


  }

  connectToWS() {
    var socket = new SockJS("http://localhost:8083/konyvklub-websocket");
    this.stompClient = Stomp.over(socket);
    let that = this;
    this.stompClient.connect({}, function (frame) {

      that.stompClient.subscribe('/topic/chat' /* /' + this.channelId*/, (messageGot) => {

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
      $('.chatBox').append("<div class='myMsgDiv mt-2'><p class='myMsg'>" + messageGot.message + "</p></div>");
    } else {
      $('.chatBox').append("<div class='notMyMsgDiv mt-2'><p class='notMyMsg'>" + messageGot.message + "</p></div>");
    }
    this.scrollToTheEnd();
    //$(".chatBox").append("<p>" + messageGot.message + "</p>");
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

  getMessage() {
    console.log("BENT");
    let message = $("#messageField").val();
    $("#messageField").val('');
    return message;
  }

  scrollToTheEnd() {
    var objDiv = document.getElementsByClassName("chatBox")[0];
    objDiv.scrollTop = objDiv.scrollHeight;
  }

}
