import {Component, Input, OnInit} from '@angular/core'
import {ModalController} from '@ionic/angular'


@Component({
  selector: 'app-geoloc',
  templateUrl: './geoloc.page.html',
  styleUrls: ['./geoloc.page.scss'],
})
export class GeolocPage implements OnInit {

  @Input() lat: number
  @Input() lng: number
  @Input() markerDraggable: boolean

  public marker: {
    lat: number,
    lng: number,
    draggable: boolean
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (!this.lat) {
      this.lat = 47.35260;
      this.lng = 0.670379543;
    } else {
      this.marker = {
        lat: this.lat,
        lng: this.lng,
        draggable: this.markerDraggable
      }
    }
    console.log('init at:' +  this.lat + ' - ' + this.lng)
  }

  onClose() {
    this.modalCtrl.dismiss({lat: this.marker.lat, lng: this.marker.lng})
  }

  onMoveMarker(event) {
    this.marker = {
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: this.markerDraggable
    }
  }
}
