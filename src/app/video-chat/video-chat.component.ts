import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss'],
})
export class VideoChatComponent {
  @ViewChild('localVideo', { static: true }) localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo', { static: true }) remoteVideo!: ElementRef<HTMLVideoElement>;

  isCameraOn: boolean = true;
  isMicrophoneOn: boolean = true;
  localStream!: MediaStream;
  remoteStream!: MediaStream;

  // Переменная для состояния вызова (например, подключен или нет)
  isCallActive: boolean = false;

  async ngOnInit() {
    this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.localVideo.nativeElement.srcObject = this.localStream;
    this.simulateRemoteConnection(); // Удалите для реальной реализации
  }

  // Переключить камеру
  toggleCamera() {
    this.isCameraOn = !this.isCameraOn;
    const videoTrack = this.localStream.getVideoTracks()[0];
    videoTrack.enabled = this.isCameraOn;
  }

  // Переключить микрофон
  toggleMicrophone() {
    this.isMicrophoneOn = !this.isMicrophoneOn;
    const audioTrack = this.localStream.getAudioTracks()[0];
    audioTrack.enabled = this.isMicrophoneOn;
  }

  // Завершить звонок
  endCall() {
    this.localStream.getTracks().forEach((track) => track.stop()); // Останавливаем все потоки
    this.localVideo.nativeElement.srcObject = null; // Очищаем локальное видео
    this.remoteVideo.nativeElement.srcObject = null; // Очищаем удаленное видео
    console.log('Звонок завершен');
  }

  // Поделиться экраном
  async shareScreen() {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      this.localVideo.nativeElement.srcObject = screenStream;

      screenStream.getVideoTracks()[0].onended = () => {
        this.localVideo.nativeElement.srcObject = this.localStream;
      };
    } catch (error) {
      console.error('Ошибка при попытке поделиться экраном:', error);
    }
  }

  // Имитация подключения собеседника (для теста)
  async simulateRemoteConnection() {
    const remoteStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    this.receiveRemoteStream(remoteStream);
  }

  // Прием удаленного потока
  receiveRemoteStream(remoteStream: MediaStream) {
    this.remoteVideo.nativeElement.srcObject = remoteStream;
  }

  // Метод для совершения вызова
  startCall() {
    // Захватываем локальное видео и аудио
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.localStream = stream;
        this.remoteVideo.nativeElement.srcObject = this.localStream; // Показываем локальное видео

        // Удаленное видео изначально пустое, пока собеседник не подключится
        this.localVideo.nativeElement.srcObject = null;
      })
      .catch(error => {
        console.error('Ошибка при захвате медиа:', error);
      });
  }
}
