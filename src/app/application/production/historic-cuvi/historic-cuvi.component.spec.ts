import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricCuviComponent } from './historic-cuvi.component';

describe('HistoricCuviComponent', () => {
  let component: HistoricCuviComponent;
  let fixture: ComponentFixture<HistoricCuviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricCuviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricCuviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
