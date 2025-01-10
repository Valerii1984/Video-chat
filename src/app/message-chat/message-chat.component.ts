// src/app/message-chat/message-chat.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../websocket.service';
import { FormsModule } from '@angular/forms';  // Импортируем FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-chat',
  standalone: true,
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.scss'],
  imports: [FormsModule, CommonModule] // Добавляем FormsModule
})
export class MessageChatComponent implements OnInit, OnDestroy {
  messages: { user: string; text: string }[] = [];
  newMessage: string = '';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.connect();

    // Подписка на входящие сообщения
    this.webSocketService.getMessages().subscribe((message: string) => {
      this.messages.push({ user: 'Server', text: message });
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      // Ограничиваем количество сообщений
      if (this.messages.length >= 10) {
        this.messages.pop(); // Удаляем последнее сообщение, если их больше 10
      }
      
      // Добавляем новое сообщение в начало массива
      this.messages.unshift({ user: 'You', text: this.newMessage });
      this.webSocketService.sendMessage(this.newMessage);
      this.newMessage = ''; // Очистить поле ввода
    }
  }
}
