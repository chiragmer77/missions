import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GantChartComponent } from './gant-chart.component';

describe('GantChartComponent', () => {
  let component: GantChartComponent;
  let fixture: ComponentFixture<GantChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GantChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GantChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
