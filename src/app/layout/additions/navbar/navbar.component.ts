import { Component } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isRegisterPage: boolean = false;
  constructor(
    private flowbiteService: FlowbiteService,
    private _Router: Router
  ) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {});
    this._Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          this._Router.url.includes('/register') ||
          this._Router.url.includes('/signin')
        ) {
          this.isRegisterPage = true;
        } else {
          this.isRegisterPage = false;
        }
      }
    });
  }
}
