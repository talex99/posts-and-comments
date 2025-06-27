import { TestBed } from '@angular/core/testing';
import { CommentsHttpService } from './comments-http.service';

describe('HttpService', () => {
  let service: CommentsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
