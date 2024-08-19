import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSuppDealsComponent } from './top-supp-deals.component';

describe('TopSuppDealsComponent', () => {
  let component: TopSuppDealsComponent;
  let fixture: ComponentFixture<TopSuppDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSuppDealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopSuppDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
