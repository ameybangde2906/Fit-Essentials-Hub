import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAccDealsComponent } from './top-acc-deals.component';

describe('TopAccDealsComponent', () => {
  let component: TopAccDealsComponent;
  let fixture: ComponentFixture<TopAccDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAccDealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopAccDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
