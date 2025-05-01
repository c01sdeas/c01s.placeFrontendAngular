import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPannelComponent } from './blog-pannel.component';

describe('BlogPannelComponent', () => {
  let component: BlogPannelComponent;
  let fixture: ComponentFixture<BlogPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
