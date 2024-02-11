import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseModelColorComponent } from './choose-model-color.component';

describe('ChooseModelColorComponent', () => {
  let component: ChooseModelColorComponent;
  let fixture: ComponentFixture<ChooseModelColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseModelColorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseModelColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
