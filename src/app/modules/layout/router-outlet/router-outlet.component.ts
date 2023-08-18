import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.css']
})
export class RouterOutletComponent {
  @ViewChild('bigLogo', { static: true }) bigLogo: ElementRef | undefined;
  @ViewChild('smallLogo', { static: true }) smallLogo: ElementRef | undefined;
  @ViewChild('leftArrow', { static: true }) leftArrow: ElementRef | undefined;
  @ViewChild('rightArrow', { static: true }) rightArrow: ElementRef | undefined;

  isClassAdded: boolean = true;
  isMenuSubmenu: boolean = true;

  constructor(private renderer: Renderer2) { }



  // toggleClass() {
  //   this.isClassAdded = !this.isClassAdded;
  //   console.log(this.isClassAdded)
  //   if (this.isClassAdded) {
  //     this.renderer.setStyle(this.bigLogo?.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.smallLogo?.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.leftArrow?.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.rightArrow?.nativeElement, 'display', 'none');
  //   } else {
  //     this.renderer.setStyle(this.bigLogo?.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.smallLogo?.nativeElement, 'display', 'block');
  //     this.renderer.setStyle(this.leftArrow?.nativeElement, 'display', 'none');
  //     this.renderer.setStyle(this.rightArrow?.nativeElement, 'display', 'block');
  //   }
  // }

  toggleClass() {
    // Get the current screen width
    const screenWidth = window.innerWidth;

    // Determine whether to reverse behavior based on screen width
    const shouldReverse = screenWidth < 768;

    console.log(shouldReverse)

    // Toggle class logic
    this.isClassAdded = !this.isClassAdded;

    console.log(this.isClassAdded)

    if (this.isClassAdded) {
      this.renderer.setStyle(this.bigLogo?.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.smallLogo?.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.leftArrow?.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.rightArrow?.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.bigLogo?.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.smallLogo?.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.leftArrow?.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.rightArrow?.nativeElement, 'display', 'block');
    }
  }


  menuSubmenu() {
    this.isMenuSubmenu = !this.isMenuSubmenu;
  }

}
