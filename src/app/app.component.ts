import { Component } from '@angular/core';
import { MessageChatComponent } from './message-chat/message-chat.component';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app-container">
      <app-video-chat></app-video-chat>
      <app-message-chat></app-message-chat>
      <app-participant-list></app-participant-list>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [MessageChatComponent, VideoChatComponent, ParticipantListComponent],
})
export class AppComponent {}
