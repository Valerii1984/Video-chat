// src/app/app.component.ts
// app.component.ts
import { Component } from '@angular/core';
import { MessageChatComponent } from './message-chat/message-chat.component';
import { VideoChatComponent } from './video-chat/video-chat.component'; // Импортируем VideoChatComponent

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div>
      <app-video-chat></app-video-chat> <!-- Добавляем видеочат сюда -->
      <app-message-chat></app-message-chat> <!-- Сообщения оставляем -->
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [MessageChatComponent, VideoChatComponent], // Указываем оба компонента
})
export class AppComponent {}

