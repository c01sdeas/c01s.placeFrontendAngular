import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryContentComponent } from './blog-category-content.component';

describe('BlogCategoryContentComponent', () => {
  let component: BlogCategoryContentComponent;
  let fixture: ComponentFixture<BlogCategoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCategoryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogCategoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
