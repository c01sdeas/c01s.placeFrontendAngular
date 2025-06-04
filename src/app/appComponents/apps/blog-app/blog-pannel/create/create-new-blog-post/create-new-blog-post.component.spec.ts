import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewBlogPostComponent } from './create-new-blog-post.component';

describe('CreateNewBlogPostComponent', () => {
  let component: CreateNewBlogPostComponent;
  let fixture: ComponentFixture<CreateNewBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewBlogPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
