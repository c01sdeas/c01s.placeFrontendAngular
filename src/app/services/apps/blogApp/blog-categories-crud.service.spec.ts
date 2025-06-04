import { TestBed } from '@angular/core/testing';

import { BlogCategoriesCrudService } from './blog-categories-crud.service';

describe('BlogCategoriesCrudService', () => {
  let service: BlogCategoriesCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogCategoriesCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
