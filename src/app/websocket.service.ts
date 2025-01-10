// src/app/websocket.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Это гарантирует, что сервис будет доступен везде
})
export class WebSocketService {
  private socket!: WebSocket;
  private messages = new Subject<string>();

  connect(): void {
    this.socket = new WebSocket('ws://localhost:8080'); // Замените на свой сервер WebSocket

    this.socket.onmessage = (event) => {
      this.messages.next(event.data);
    };

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket closed');
    };
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }

  getMessages() {
    return this.messages.asObservable();
  }
}
