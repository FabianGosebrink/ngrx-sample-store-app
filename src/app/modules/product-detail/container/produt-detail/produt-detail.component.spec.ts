import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutDetailComponent } from './produt-detail.component';

describe('ProdutDetailComponent', () => {
  let component: ProdutDetailComponent;
  let fixture: ComponentFixture<ProdutDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
