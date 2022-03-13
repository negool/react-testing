import React from 'react';
import {setupWorker, rest} from 'msw';
import {setupServer} from 'msw/node';
// import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import {render, fireEvent, waitFor, screen, cleanup} from '../../../test.utils';
// import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import PeopleTable from './';
import People from './..';

const server = setupServer(
  rest.get('/data', (req, res, ctx) => {
    const employment = req.url.searchParams.get('employment');
    const name = req.url.searchParams.get('name_like');
    
    if ((employment === 'contractor') || (name === "Vitt")){
      return res(ctx.json([
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
    } else if ((employment === 'employee') || (name === "An")){
      return res(ctx.json([
        {
          "id": 1,
          "name": "Ann Henry",
          "jobTitle": "Product manager",
          "country": "Germany",
          "salary": 120000,
          "currency": "EUR",
          "employment": "employee"
        }
      ]))
    } else {
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
    }
   
  }),
);

beforeAll(() => jest.setTimeout(90 * 1000));

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('PeopleTable', () => {
  it('table loads and displays data', async () => {
    render(<People url="/data"><PeopleTable /></People>);

    await (waitFor(() => {
      expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    }));
    
    expect(screen.getByText(/Italy/i).textContent).toBe("Italy");
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  it('filters by employee type contractor', async () => {
    render(<People url="/data"><PeopleTable /></People>);

    await (waitFor(() => {
      expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    }));
    expect(screen.getByText(/Italy/i).textContent).toBe("Italy");
    expect(screen.getAllByRole('row')).toHaveLength(3);

    const contractorCheckbox = screen.getByTestId('contractor');
    const employeeCheckbox = screen.getByTestId('employee');

    fireEvent.click(contractorCheckbox);
    expect(contractorCheckbox.checked).toEqual(true);
    // screen.debug(contractorCheckbox);
    expect(employeeCheckbox.checked).toEqual(false);
    
    await (waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    }));
    expect(screen.getByText(/Italy/i).textContent).toBe("Italy");
    expect(screen.getByText(/Vittoria/i).textContent).toBe("Vittoria Janson");
    expect(screen.queryByText(/Ann/i)).not.toBeInTheDocument();

  });

  it('filters by employee type employee', async () => {
    render(<People url="/data"><PeopleTable /></People>);

    await (waitFor(() => {
      expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    }));
    expect(screen.getByText(/Italy/i).textContent).toBe("Italy");
    expect(screen.getAllByRole('row')).toHaveLength(3);

    const contractorCheckbox = screen.getByTestId('contractor');
    const employeeCheckbox = screen.getByTestId('employee');

    fireEvent.click(employeeCheckbox);
    expect(contractorCheckbox.checked).toEqual(false);
    expect(employeeCheckbox.checked).toEqual(true);
    
    await (waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    }));
    expect(screen.queryByText(/Product manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    expect(screen.queryByText(/Italy/i)).not.toBeInTheDocument();
  });

  it('filters by employee type employee and contractor', async () => {
    render(<People url="/data"><PeopleTable /></People>);

    await (waitFor(() => {
      expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    }));
    expect(screen.getByText(/Italy/i).textContent).toBe("Italy");
    expect(screen.getAllByRole('row')).toHaveLength(3);

    const contractorCheckbox = screen.getByTestId('contractor');
    const employeeCheckbox = screen.getByTestId('employee');

    fireEvent.click(employeeCheckbox);
    fireEvent.click(contractorCheckbox);
    expect(contractorCheckbox.checked).toEqual(true);
    expect(employeeCheckbox.checked).toEqual(true);
    
    await (waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(3);
    }));
    expect(screen.queryByText(/Product manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    expect(screen.queryByText(/Italy/i)).toBeInTheDocument();
  });

  it('filters by name', async () => {
    render(<People url="/data"><PeopleTable /></People>);

    await (waitFor(() => {
      expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    }));
    expect(screen.getByText(/Italy/i).textContent).toBe("Italy");
    expect(screen.getAllByRole('row')).toHaveLength(3);

    const input = screen.getByTestId('search');
    fireEvent.change(input, {target: {value: 'An'}});

    await (waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    }));
    expect(screen.queryByText(/Product manager/i)).toBeInTheDocument();
    expect(screen.getByText(/Ann/i).textContent).toBe("Ann Henry");
    expect(screen.queryByText(/Italy/i)).not.toBeInTheDocument();

    fireEvent.change(input, {target: {value: 'Vitt'}});
    await (waitFor(() => {
     expect(screen.getByText(/Italy/i).textContent).toBe("Italy");
    }));
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getByText(/Vittoria/i).textContent).toBe("Vittoria Janson");
    expect(screen.queryByText(/Ann/i)).not.toBeInTheDocument();

  });

});
