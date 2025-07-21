import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPostsComponent } from './check-posts.component';

describe('CheckPostsComponent', () => {
  let component: CheckPostsComponent;
  let fixture: ComponentFixture<CheckPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
