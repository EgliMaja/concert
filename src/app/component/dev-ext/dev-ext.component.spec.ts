import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevExtComponent } from './dev-ext.component';

describe('DevExtComponent', () => {
  let component: DevExtComponent;
  let fixture: ComponentFixture<DevExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevExtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
