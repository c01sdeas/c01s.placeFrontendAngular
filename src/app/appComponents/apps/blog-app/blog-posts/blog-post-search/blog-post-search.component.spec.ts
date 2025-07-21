import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostSearchComponent } from './blog-post-search.component';

describe('BlogPostSearchComponent', () => {
  let component: BlogPostSearchComponent;
  let fixture: ComponentFixture<BlogPostSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
