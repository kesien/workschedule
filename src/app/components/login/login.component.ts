import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { UserLogin } from 'src/app/shared/models/login.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup

  user: UserLogin = {
    username: '',
    password: '',
  }
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {}

  checkBeforeSubmit(event: KeyboardEvent) {
    if (this.loginForm.valid && event.key === 'Enter') {
      this.login()
    }
    return
  }

  login() {
    this.ref.close(this.loginForm.value)
  }

  close() {
    this.ref.close()
  }
}
