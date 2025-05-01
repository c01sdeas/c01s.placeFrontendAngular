import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedErrorComponent } from './banned-error.component';

describe('BannedErrorComponent', () => {
  let component: BannedErrorComponent;
  let fixture: ComponentFixture<BannedErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannedErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannedErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
