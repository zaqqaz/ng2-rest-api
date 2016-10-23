import { DenisByPage } from './app.po';

describe('denis-by App', function() {
  let page: DenisByPage;

  beforeEach(() => {
    page = new DenisByPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
