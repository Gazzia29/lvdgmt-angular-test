import { TestBed } from '@angular/core/testing';

import { StringLogicService } from './stlogic.service';

describe('StringLogicService', () => {
  let service: StringLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
