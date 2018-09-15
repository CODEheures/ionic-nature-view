import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Camera, CameraOptions} from '@ionic-native/camera/ngx'
import {WebView} from '@ionic-native/ionic-webview/ngx'
import {LoadingController, ModalController, ToastController} from '@ionic/angular'
import {GeolocPage} from '../geoloc/geoloc.page'
import {Geolocation} from '@ionic-native/geolocation/ngx'
import {NatureViewService} from '../services/nature-view.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-view',
  templateUrl: './add-view.page.html',
  styleUrls: ['./add-view.page.scss'],
})
export class AddViewPage implements OnInit {

  public imgUrl: string
  public viewFormGroup: FormGroup
  public description: boolean
  public lat: number
  public lng: number

  constructor(private formBuilder: FormBuilder,
              private camera: Camera,
              private webView: WebView,
              private modalCtrl: ModalController,
              private geolocation: Geolocation,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private natureViewService: NatureViewService,
              private router: Router) { }

  async ngOnInit() {
    this.description = false
    this.viewFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    })

    await this.onGeolocateMe()
  }

  async takeShot() {
    const cameraOption: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    try {
      const uri = await this.camera.getPicture(cameraOption)
      this.imgUrl = this.webView.convertFileSrc(uri)
    } catch (error) {
      this.imgUrl = '../../assets/images/test.jpg'
      console.log(error)
    }

  }

  async onGeoloc() {
    const modalGeoloc = await this.modalCtrl.create({
      component: GeolocPage,
      componentProps: {lat: this.lat, lng: this.lng, markerDraggable: true}
    })

    modalGeoloc.onDidDismiss().then(
      (event) => {
        if (event.data) {
          this.lat = event.data.lat
          this.lng = event.data.lng
        }
      }
    )

    return await modalGeoloc.present()
  }

  onAddView() {
    this.natureViewService.addView({
      title: this.viewFormGroup.value['title'],
      description: this.description ? this.viewFormGroup.value['description'] : '',
      imageUrl: this.imgUrl,
      lat: this.lat,
      lng: this.lng
    })
    this.router.navigate(['/'])
  }

  async onGeolocateMe() {
    const loader = await this.loadingCtrl.create({
      message: 'Recherche de votre position'
    })
    loader.present()

    try {
      const location = await this.geolocation.getCurrentPosition()
      loader.dismiss()
      this.lat = location.coords.latitude
      this.lng = location.coords.longitude
    } catch (e) {
      const error: PositionError = e
      loader.dismiss()
      const toast = await this.toastCtrl.create({
        message: 'Echec de géolocation: ' + error.message,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Fermer'
      })
      toast.present()
    }
  }
}
