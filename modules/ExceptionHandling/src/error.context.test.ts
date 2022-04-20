import { getErrorContext } from './error.context';
import { HttpException } from '@nestjs/common';

describe('getErrorContext function', () => {
  it('should return correct context', () => {
    const error = new Error('Dummy error');
    const result = getErrorContext(error);

    expect(result).toEqual({
      message: error.message,
      stack: error.stack
    });
  });

  it('should return default context', () => {
    const result = getErrorContext(null);

    expect(result).toEqual({
      message: 'Unknown error',
      stack: ''
    });
  });

  it('should return context with message from HttpException', () => {
    const error = new HttpException({ message: 'Validation error' }, 400);
    const result = getErrorContext(error);

    expect(result).toEqual({
      message: 'Validation error',
      stack: ''
    });
  });
});
