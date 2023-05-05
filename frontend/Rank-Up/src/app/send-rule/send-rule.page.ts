import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { BtAdminSmallComponent } from '../components/bt-admin-small/bt-admin-small.component';

@Component({
  selector: 'app-send-rule',
  templateUrl: './send-rule.page.html',
  styleUrls: ['./send-rule.page.scss'],
})
export class SendRulePage implements OnInit {

  public descrBtns = ["Chiudi"];
  public confirmBtns = [
    {
      text: 'Annulla',
      cssClass: 'alert-button-red',
    },
    {
      text: 'Conferma',
      cssClass: 'alert-button-blue',
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
