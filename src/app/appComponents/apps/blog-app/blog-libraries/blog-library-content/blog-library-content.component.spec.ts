import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLibraryContentComponent } from './blog-library-content.component';

describe('BlogLibraryContentComponent', () => {
  let component: BlogLibraryContentComponent;
  let fixture: ComponentFixture<BlogLibraryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLibraryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLibraryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
