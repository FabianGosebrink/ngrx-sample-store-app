import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartButtonComponent } from './add-to-cart-button.component';

describe('AddToCartButtonComponent', () => {
  let component: AddToCartButtonComponent;
  let fixture: ComponentFixture<AddToCartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
