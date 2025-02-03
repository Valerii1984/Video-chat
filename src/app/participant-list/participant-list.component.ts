import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {
  participants = [
    { id: 1, name: 'John Doe', microphoneOn: true, cameraOn: true },
    { id: 2, name: 'Jane Smith', microphoneOn: false, cameraOn: true },
    { id: 3, name: 'Robert Brown', microphoneOn: true, cameraOn: false }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('Participants:', this.participants); // Убедитесь, что массив не пуст
  }

  toggleMicrophone(id: number) {
    const participant = this.participants.find(p => p.id === id);
    if (participant) {
      participant.microphoneOn = !participant.microphoneOn;
    }
  }

  toggleCamera(id: number) {
    const participant = this.participants.find(p => p.id === id);
    if (participant) {
      participant.cameraOn = !participant.cameraOn;
    }
  }

  // Функция для приглашения новых участников (можно добавить больше логики)
  inviteParticipant() {
    console.log("Приглашение нового участника");
  }

}

