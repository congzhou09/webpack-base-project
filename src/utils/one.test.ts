import oneFish from '@/utils/one';

describe('check swim method', () => {
  it('console', () => {
    const logSpy = jest.spyOn(console, 'log');
    oneFish.swim();
    expect(logSpy).toHaveBeenCalledWith('I swim');
  });
});
