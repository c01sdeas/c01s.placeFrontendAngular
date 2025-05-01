import { TestBed } from '@angular/core/testing';

import { TodoCrudService } from './todo-crud.service';

describe('TodoCrudService', () => {
  let service: TodoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
