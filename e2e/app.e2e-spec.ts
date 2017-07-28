import { LaesoChascomusPage } from './app.po';

describe('laeso-chascomus App', () => {
  let page: LaesoChascomusPage;

  beforeEach(() => {
    page = new LaesoChascomusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
