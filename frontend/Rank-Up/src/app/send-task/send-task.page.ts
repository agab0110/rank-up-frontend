import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-send-task',
  templateUrl: './send-task.page.html',
  styleUrls: ['./send-task.page.scss'],
})
export class SendTaskPage implements OnInit {

  public descrBtns = ["Chiudi"];
  public confirmBtns = [
    {
      text: 'Annulla'
    },
    {
      text: 'Conferma',
      handler: () => {
        //cambia pagina
      }
    }
  ];
  @ViewChild(IonModal) modal!: IonModal;
  blob: Blob | undefined | null;
  blobURL: string | undefined | null;

  constructor(
  ) { }

  ngOnInit() {
  }

  loadFileFromDevice(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      this.blobURL = URL.createObjectURL(this.blob);
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  closeModal() {
    this.blob = null;
    this.blobURL = null;
    this.modal.dismiss();
  }

  attach() {
    this.modal.dismiss();
  }
}
