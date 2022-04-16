import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppFunctional from './AppFunctional';


beforeEach(() => {
  render(<AppFunctional/>);
})
// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('renders header', () => {

  const header = screen.queryByText(/Coordinates/i);
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/coordinates/i)
})

test('submits email', () => {

  const submitBtn = screen.getByRole('button', {name: /submit/i})
  expect(submitBtn).toBeInTheDocument();

})

test('testing right button', () => {

  fireEvent.click(screen.getByText(/right/i))
  expect(screen.queryByText(/Coordinates (3,2)/i)
)})

test('testing up button', () => {

  fireEvent.click(screen.getByText(/up/i))
  expect(screen.queryByText(/Coordinates (2,1)/i)
)})

test('testing the counter', () => {

  const counter = screen.queryByText(/You moved 0 times/i)
  expect(counter).toBeInTheDocument();

  fireEvent.click(screen.getByText(/up/i))
  expect(screen.queryByText(/Coordinates (2,1)/i))
  const updatedCounter = screen.queryByText(/You moved 1 time/i)
  expect(updatedCounter).toBeInTheDocument();
})