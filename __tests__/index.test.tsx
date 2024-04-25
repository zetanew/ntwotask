import React from 'react';
import { render } from '@testing-library/react-native';

import Index from '../app/(tabs)/index';
describe('Index', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Index />);
    expect(getByText('Hosgeldiniz')).toBeTruthy();
  });
});