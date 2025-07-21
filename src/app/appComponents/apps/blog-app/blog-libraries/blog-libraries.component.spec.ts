import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLibrariesComponent } from './blog-libraries.component';

describe('BlogLibrariesComponent', () => {
  let component: BlogLibrariesComponent;
  let fixture: ComponentFixture<BlogLibrariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLibrariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
