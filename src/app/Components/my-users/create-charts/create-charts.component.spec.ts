import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChartsComponent } from './create-charts.component';

describe('CreateChartsComponent', () => {
  let component: CreateChartsComponent;
  let fixture: ComponentFixture<CreateChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
