import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HermesComponent } from './hermes.component';

describe('HermesComponent', () => {
  let component: HermesComponent;
  let fixture: ComponentFixture<HermesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HermesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HermesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
