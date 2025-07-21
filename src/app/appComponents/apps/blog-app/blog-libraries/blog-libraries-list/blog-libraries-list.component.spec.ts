import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLibrariesListComponent } from './blog-libraries-list.component';

describe('BlogLibrariesListComponent', () => {
  let component: BlogLibrariesListComponent;
  let fixture: ComponentFixture<BlogLibrariesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLibrariesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLibrariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
