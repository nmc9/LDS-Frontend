import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Register from '../src/profiles/Register';

require('../src/bootstrap');

// test('renders correctly', () => {
//   const tree = renderer.create(<Profile />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

test('User Registers a profile correctly', () => {
  const { getByPlaceholderText, getByText, getAllByText } = render(
    <Register />
    );

  fireEvent.changeText(
    getByPlaceholderText('Username'),
    'banana'
    );
  fireEvent.press(getByText('Register'));

  // const bananaElements = getAllBy('banana');
  // expect(bananaElements).toHaveLength(1); // expect 'banana' to be on the list
});