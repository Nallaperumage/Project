import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SieveComponent } from './sieve.component';

describe('SieveComponent', () => {
  let component: SieveComponent;
  let fixture: ComponentFixture<SieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SieveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
