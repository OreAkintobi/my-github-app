import React from 'react';
import { render } from '@testing-library/react';
import Page from '../page';

describe('Page', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Page />);
    expect(asFragment()).toMatchSnapshot();
  });
});
