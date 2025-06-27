import { TestBed } from '@angular/core/testing';
import { CommentFormService } from './comments-form.service';

describe('FormService', () => {
  let service: CommentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
