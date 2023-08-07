import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'missions';

  constructor(public fb: FormBuilder) {
  }

  ngOnInit() {
  }
}
