import { TestBed } from '@angular/core/testing';

import { BlogLibrariesService } from './blog-libraries.service';

describe('BlogLibrariesService', () => {
  let service: BlogLibrariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogLibrariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
