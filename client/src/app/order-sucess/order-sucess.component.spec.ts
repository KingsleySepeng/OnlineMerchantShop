import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSucessComponent } from './order-sucess.component';

describe('OrderSucessComponent', () => {
  let component: OrderSucessComponent;
  let fixture: ComponentFixture<OrderSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderSucessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
