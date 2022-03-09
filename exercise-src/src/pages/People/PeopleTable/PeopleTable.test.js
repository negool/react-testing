import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
// import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import {render, fireEvent, waitFor, screen} from '../../../test.utils';
import '@testing-library/jest-dom';
import PeopleTable from './';
import People from './..';

const server = setupServer(
  rest.get('/data', (req, res, ctx) => {
    return res(ctx.json([
      {
        "id": 1,
        "name": "Ann Henry",
        "jobTitle": "Product manager",
        "country": "Germany",
        "salary": 120000,
        "currency": "EUR",
        "employment": "employee"
      },
      {
        "id": 2,
        "name": "Vittoria Janson",
        "jobTitle": "Pianist",
        "country": "Italy",
        "salary": 70000,
        "currency": "EUR",
        "employment": "contractor"
      }
    ]))
  }),
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// test('loads and displays greeting', async () => {
//   render(<People><PeopleTable
//     url="/people"/></People>);

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toBeDisabled()
// })


describe('PeopleTable', () => {
  it('loads and displays greeting', async () => {
    render(<People><PeopleTable
      url="/data"/></People>);
  
    // fireEvent.click(screen.getByText('Load Greeting'))
  
    const rows = await screen.getAllByRole('column');
    expect(rows).toHaveLength(2);
    // const items = await screen.findAllByText(/employee/);
    // expect(items).toHaveLength(1);

    // expect(screen.getAllByRole('row')[1]).toHaveTextContent(/Ann Henry/);

    // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    // expect(screen.getByRole('button')).toBeDisabled()
  });

  // it('spreads custom attributes', () => {
  //   const clickFn = jest.fn();
  //   render(<Checkbox
  //     id="cb2"
  //     name="cb2"
  //     label="My Checkbox"
  //     data-foo="test"
  //     onChange={clickFn}
  //   />);

  //   const input = screen.getByLabelText('My Checkbox');
  //   expect(input.getAttribute('data-foo')).toBe('test');

  //   fireEvent.click(input);
  //   expect(clickFn).toHaveBeenCalledTimes(1);
  // });
  // it('gets checked on click', () => {
  //   const clickFn = jest.fn();
  //   render(<Checkbox
  //     id="cb3"
  //     name="cb3"
  //     label="My Checkbox"
  //     onChange={clickFn}
  //   />);

  //   const input = screen.getByLabelText('My Checkbox');

  //   fireEvent.click(input);
  //   expect(clickFn).toHaveBeenCalledTimes(1);
  // })
});
