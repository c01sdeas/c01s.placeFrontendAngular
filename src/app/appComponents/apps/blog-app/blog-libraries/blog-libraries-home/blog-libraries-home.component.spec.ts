import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLibrariesHomeComponent } from './blog-libraries-home.component';

describe('BlogLibrariesHomeComponent', () => {
  let component: BlogLibrariesHomeComponent;
  let fixture: ComponentFixture<BlogLibrariesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLibrariesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLibrariesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
