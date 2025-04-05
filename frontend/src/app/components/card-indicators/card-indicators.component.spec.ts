import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIndicatorsComponent } from './card-indicators.component';

describe('CardIndicatorsComponent', () => {
  let component: CardIndicatorsComponent;
  let fixture: ComponentFixture<CardIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardIndicatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
