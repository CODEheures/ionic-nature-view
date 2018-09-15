import {Component, OnDestroy, OnInit} from '@angular/core'
import {NatureViewService} from '../services/nature-view.service'
import {NatureView} from '../interfaces/nature-view'
import {AlertController} from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  public natureViewList: NatureView[] = []
  public natureViewListSubscription
  constructor(private natureViewService: NatureViewService,
              private alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.natureViewListSubscription = this.natureViewService.natureViewList$.subscribe(
      (viewList: NatureView[]) => {
        this.natureViewList = viewList
      }
    )
    this.natureViewService.getFromDevice()
      .then()
      .catch((e) => console.log(e))
  }

  ngOnDestroy() {
    this.natureViewListSubscription.unsubscribe()
  }

  async onDeleteView(index: number) {
    console.log('delete ' + index)
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      subHeader: 'Confirmez-vous la suppression de cette image?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmer',
          handler: () => {
            this.natureViewService.deleteView(index)
          }
        }
      ]
    })
    return await alert.present()
  }
}
