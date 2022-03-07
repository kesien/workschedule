import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private alertService: AlertService) {}

  download(id: string) {
    this.downloads(id).subscribe(
      blob => saveAs(blob, `${id}.docx`),
      error => {
        if (error.Messages) {
          for (const message of error.Messages) {
            this.alertService.error(message);
          }
        } else {
          this.alertService.error(error)
        }
      }
    )
  }

  private downloads(id: string): Observable<Blob> {
    return this.http.get(environment.baseApiUrl + `files/${id}`, {
      responseType: 'blob'
    })
  }
}
