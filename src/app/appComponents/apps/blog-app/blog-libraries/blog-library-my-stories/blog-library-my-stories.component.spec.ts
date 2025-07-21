import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLibraryMyStoriesComponent } from './blog-library-my-stories.component';

describe('BlogLibraryMyStoriesComponent', () => {
  let component: BlogLibraryMyStoriesComponent;
  let fixture: ComponentFixture<BlogLibraryMyStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLibraryMyStoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLibraryMyStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
