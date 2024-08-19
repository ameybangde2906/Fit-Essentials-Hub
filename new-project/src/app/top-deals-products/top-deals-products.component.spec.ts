import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDealsProductsComponent } from './top-deals-products.component';

describe('TopDealsProductsComponent', () => {
  let component: TopDealsProductsComponent;
  let fixture: ComponentFixture<TopDealsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopDealsProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopDealsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
