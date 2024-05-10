import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarFormComponent } from './auxiliar-form.component';

describe('AuxiliarFormComponent', () => {
  let component: AuxiliarFormComponent;
  let fixture: ComponentFixture<AuxiliarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuxiliarFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuxiliarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
