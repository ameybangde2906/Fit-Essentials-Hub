import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyFitessentialsComponent } from './why-fitessentials.component';

describe('WhyFitessentialsComponent', () => {
  let component: WhyFitessentialsComponent;
  let fixture: ComponentFixture<WhyFitessentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyFitessentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhyFitessentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
