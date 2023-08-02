import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttechmentsComponent } from './attechments.component';

describe('AttechmentsComponent', () => {
  let component: AttechmentsComponent;
  let fixture: ComponentFixture<AttechmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttechmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttechmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
