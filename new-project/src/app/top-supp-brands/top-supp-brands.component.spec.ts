import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSuppBrandsComponent } from './top-supp-brands.component';

describe('TopSuppBrandsComponent', () => {
  let component: TopSuppBrandsComponent;
  let fixture: ComponentFixture<TopSuppBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSuppBrandsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopSuppBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
