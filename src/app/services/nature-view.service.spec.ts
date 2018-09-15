import { TestBed, inject } from '@angular/core/testing';

import { NatureViewService } from './nature-view.service';

describe('NatureViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NatureViewService]
    });
  });

  it('should be created', inject([NatureViewService], (service: NatureViewService) => {
    expect(service).toBeTruthy();
  }));
});
