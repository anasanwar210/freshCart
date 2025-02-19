import { Component } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import 'flowbite';
import { ThemeService } from '../../../shared/services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  isRegisterPage: boolean = false;
  isLogin: boolean = false;
  constructor(
    private flowbiteService: FlowbiteService,
    public _AuthService: AuthService,
    public themeService: ThemeService
  ) {}
  ngOnInit(): void {
    this._AuthService.userData.subscribe((res) => {
      if (res != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    });
  }
}
