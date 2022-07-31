import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { ChristmassAdmin } from '../models/christmas.model'

@Injectable({
  providedIn: 'root',
})
export class ChristmassService {
  baseUrl = environment.baseApiUrl + 'christmass'
  constructor(private http: HttpClient) {}

  public getChristmassAdmin() {
    return this.http.get<ChristmassAdmin>(
      this.baseUrl + `/admin/${new Date().getFullYear()}`,
    )
  }
}
