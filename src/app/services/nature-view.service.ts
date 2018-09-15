import { Injectable } from '@angular/core';
import {NatureView} from '../interfaces/nature-view';
import {Subject} from 'rxjs';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class NatureViewService {

  private natureViewList: NatureView[] = [];
  public natureViewList$ = new Subject<NatureView[]>();

  constructor(private storage: Storage) { }

  emitNatureView() {
    this.natureViewList$.next(this.natureViewList.slice())
  }

  addView(view: NatureView) {
    this.natureViewList.push(view)
    this.storeOnDevice()
    this.emitNatureView()
  }

  deleteView(index: number) {
    this.natureViewList.splice(index, 1)
    this.storeOnDevice()
    this.emitNatureView()
  }

  storeOnDevice() {
    this.storage.set('views', this.natureViewList)
  }

  async getFromDevice() {
    try {
      this.natureViewList = await this.storage.get('views') || []
      this.emitNatureView()
    } catch (e) {
      throw e
    }
  }
}
