import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutDetailComponent } from './produt-detail.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductDetailActions } from '../../state/product-detail.actions';
import { MockComponents, MockPipes } from 'ng-mocks';
import { CurrencyPipe } from '@angular/common';
import { CategoryNamePipe } from '../../../shared/pipes/category-name.pipe';
import { ProductImageComponent } from '../../presentational/product-image/product-image.component';
import { ProductInfoComponent } from '../../presentational/product-info/product-info.component';
import { selectProductDetail } from '../../state/product-detail.selectors';

describe('ProdutDetailComponent', () => {
  let component: ProdutDetailComponent;
  let fixture: ComponentFixture<ProdutDetailComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutDetailComponent],
      providers: [provideMockStore()],
    })
      .overrideComponent(ProdutDetailComponent, {
        set: {
          imports: [
            MockPipes(CurrencyPipe, CategoryNamePipe),
            MockComponents(ProductImageComponent, ProductInfoComponent),
          ],
        },
      })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);

    mockStore.overrideSelector(selectProductDetail, null);

    fixture = TestBed.createComponent(ProdutDetailComponent);
    fixture.componentRef.setInput('id', '1234');

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should dispatch loadProduct action', () => {
      // arrange
      const id = '998877';
      const dispatchSpy = jest.spyOn(mockStore, 'dispatch');

      fixture.componentRef.setInput('id', id);

      // act
      component.ngOnInit();

      // assert
      expect(dispatchSpy).toHaveBeenCalledWith(
        ProductDetailActions.loadProduct({ id }),
      );
    });
  });
});
