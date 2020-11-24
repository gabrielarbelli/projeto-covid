import { ThousandPlacesPipe } from './thousand-places.pipe';

describe('ThousandPlacesPipe', () => {
  it('create an instance', () => {
    const pipe = new ThousandPlacesPipe();
    expect(pipe).toBeTruthy();
  });
});
