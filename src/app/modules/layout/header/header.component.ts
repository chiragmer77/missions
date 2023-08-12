import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  language: any = {};


  constructor(
    private toastr: ToastrService,
    private router: Router,
    public translate: TranslateService,
    public cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang: any = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    setTimeout(() => {
      // Set the default language in localStorage if not set before
      const storedLanguage = localStorage.getItem('selectedLanguage');
      if (storedLanguage) {
        this.language.defualtLanguage = storedLanguage;
        this.changeLanguage(storedLanguage);
      }
    }, 500);
  }

  /** Change language */
  changeLanguage(lang: any) {
    this.translate.use(lang);
    this.language.defaultLanguage = lang;
    localStorage.setItem('selectedLanguage', lang); // Store the selected language in local storage
    this.cd.detectChanges();

    setTimeout(() => {
      // Set the default language in localStorage if not set before
      const storedLanguage = localStorage.getItem('selectedLanguage');
      if (storedLanguage) {
        this.language.defualtLanguage = storedLanguage;
        this.changeLanguage(storedLanguage);
      }
    }, 500);
  }

  logoutUser() {
    this.router.navigateByUrl('/auth/login');
    localStorage.clear();
  }

}
