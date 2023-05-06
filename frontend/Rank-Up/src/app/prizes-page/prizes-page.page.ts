import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';  

@Component({
  selector: 'app-prizes-page',
  templateUrl: './prizes-page.page.html',
  styleUrls: ['./prizes-page.page.scss'],
})
export class PrizesPagePage implements OnInit {

  constructor(public alertCtrl: AlertController) { }

  user_name: string = '[Nome Utente]';
  user_points: number = 500
  prizes: {
    prize_name: string,
    prize_point: number
  }[] = [{prize_name: 'Caffe offerto', prize_point: 150}, {prize_name: 'Voto in piu', prize_point: 250}, {prize_name: 'Passare algoritmi', prize_point: 1000}, {prize_name: 'Caffe offerto', prize_point: 150}, {prize_name: 'Voto in piu', prize_point: 250}, {prize_name: 'Caffe offerto', prize_point: 150}, {prize_name: 'Voto in piu', prize_point: 250},]

  async showAlert(name: string, points: number) {  
    const alert = await this.alertCtrl.create({
      message: `Riscuotere "${name}" per ${points} punti?`,  
      buttons: [
        {
          text: 'No',
          role: 'no',
          cssClass:'alert-button-red'
        },
        {
          text: 'Si',
          cssClass:'alert-button-blue',
          handler: () => {
           this.user_points -= points;
          }
        }
      ]
    });  
    await alert.present();
  }  


  ngOnInit() { }

}
