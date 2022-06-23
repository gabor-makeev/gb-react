import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Input } from './Input';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  it('should render', () => {
    const mockHandler = jest.fn();

    render(<Input setValue={mockHandler} />);
  });

  it('should render with value', () => {
    const mockHandler = jest.fn();

    render(<Input setValue={mockHandler} value={'test value'} />);

    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    const mockHandler = jest.fn();

    render(<Input setValue={mockHandler} placeholder={'test placeholder'} />);

    expect(screen.getByPlaceholderText('test placeholder')).toBeInTheDocument();
  });

  it('should render with snapshot', () => {
    const mockHandler = jest.fn();

    const { asFragment } = render(
      <Input
        setValue={mockHandler}
        placeholder={'test placeholder'}
        value={'test value'}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should call setValue() on change', async () => {
    const mockHanlder = jest.fn();
    render(<Input setValue={mockHanlder} placeholder={'test placeholder'} />);

    const input = screen.getByPlaceholderText('test placeholder');
    await userEvent.type(input, 'test');

    expect(mockHanlder).toHaveBeenCalledTimes(4);
  });
});
