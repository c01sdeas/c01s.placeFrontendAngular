import { TestBed } from '@angular/core/testing';

import { BlogCrudService } from './blog-crud.service';

describe('BlogCrudService', () => {
  let service: BlogCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
