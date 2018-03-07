import { TestBed, inject } from '@angular/core/testing';

import { TwitterFavService } from './twitter-fav.service';

describe('TwitterFavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwitterFavService]
    });
  });

  it('should be created', inject([TwitterFavService], (service: TwitterFavService) => {
    expect(service).toBeTruthy();
  }));
});
