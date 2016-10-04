import { AmdfPage } from './app.po';

describe('amdf App', function() {
  let page: AmdfPage;

  beforeEach(() => {
    page = new AmdfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
