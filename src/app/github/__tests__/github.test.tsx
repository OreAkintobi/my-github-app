import React from 'react';
import { render } from '@testing-library/react';
import { Github } from '../';

describe('Github', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Github />);
    expect(asFragment()).toMatchSnapshot();
  });
});
