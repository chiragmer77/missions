import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  logoutUser() {
    this.router.navigateByUrl('/auth/login');
    localStorage.clear();
  }

}
