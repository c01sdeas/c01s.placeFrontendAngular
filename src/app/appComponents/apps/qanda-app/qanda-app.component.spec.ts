import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QandaAppComponent } from './qanda-app.component';

describe('QandaAppComponent', () => {
  let component: QandaAppComponent;
  let fixture: ComponentFixture<QandaAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QandaAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QandaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
