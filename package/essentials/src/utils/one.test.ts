import oneFish from './one';

describe('check swim method', () => {
  it('console', () => {
    console.log = jest.fn();
    oneFish.swim();
    expect(console.log).toHaveBeenCalledWith('I swim');
  });
});
