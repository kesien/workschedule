import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/shared/models/user.model'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ChristmassService } from 'src/app/shared/services/christmass.service'
import { UserService } from 'src/app/shared/services/user.service'

@Component({
  selector: 'app-christmass-layout',
  templateUrl: './christmass-layout.component.html',
  styleUrls: ['./christmass-layout.component.css'],
})
export class ChristmassLayoutComponent implements OnInit {
  isAdminUser = false
  showIniter = false
  users: User[] = []

  constructor(
    private authService: AuthService,
    private xmassService: ChristmassService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin()

    if (this.isAdminUser) {
      this.getChristmassAdmin()
    }
  }

  getChristmassAdmin() {
    this.xmassService.getChristmassAdmin().subscribe((response) => {
      if (!response) {
        this.getAllUsers()
        this.showIniter = true
      }
    })
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe((response) => {
      this.users = response
    })
  }
}
