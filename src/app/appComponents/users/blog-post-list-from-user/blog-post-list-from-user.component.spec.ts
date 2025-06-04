import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostListFromUserComponent } from './blog-post-list-from-user.component';

describe('BlogPostListFromUserComponent', () => {
  let component: BlogPostListFromUserComponent;
  let fixture: ComponentFixture<BlogPostListFromUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostListFromUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostListFromUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
