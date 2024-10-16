import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellComponent } from './shell.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from '../../presentational/header/header.component';
import { selectCartProductsCount } from '../../../checkout/state/checkout.selectors';
import { RouterOutlet } from '@angular/router';

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [provideMockStore()],
    })
      .overrideComponent(ShellComponent, {
        set: { imports: [RouterOutlet, MockComponent(HeaderComponent)] },
      })
      .compileComponents();

    mockStore = TestBed.inject(MockStore);

    mockStore.overrideSelector(selectCartProductsCount, 0);

    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockStore.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
