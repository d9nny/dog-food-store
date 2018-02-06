import { DogFoodStorePage } from './app.po';

describe('dog-food-store App', () => {
  let page: DogFoodStorePage;

  beforeEach(() => {
    page = new DogFoodStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
