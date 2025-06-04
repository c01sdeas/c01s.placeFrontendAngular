import { TestBed } from '@angular/core/testing';

import { BlogPostsCrudService } from './blog-posts-crud.service';

describe('BlogPostsCrudService', () => {
  let service: BlogPostsCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogPostsCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
