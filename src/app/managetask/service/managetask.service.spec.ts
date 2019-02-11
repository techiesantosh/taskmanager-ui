import { TestBed, inject } from '@angular/core/testing';

import { ManagetaskService } from './managetask.service';

describe('ManagetaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagetaskService]
    });
  });

  it('should be created', inject([ManagetaskService], (service: ManagetaskService) => {
    expect(service).toBeTruthy();
  }));
});
