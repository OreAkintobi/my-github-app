import { render, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context';
import React from 'react';
import { Theme } from '..';

const { expect, describe, it } = require('@jest/globals');

// Mock component to trigger useTheme
const MockComponent = () => {
  const { color, changeTheme } = useTheme();

  // Change theme on component mount
  React.useEffect(() => {
    changeTheme(Theme.Green);
  }, [changeTheme]);

  return <div>{color}</div>;
};

describe('ThemeContext', () => {
  it('throws error when useTheme is used outside of ThemeProvider', () => {
    // Suppress console error for this test
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => render(<MockComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    // Restore console error
    console.error = consoleError;
  });
});
