// import { Table, TableThCell, TableCell, TableRow, TableContainer, TableFilterContainer } from 'components/Table';
import { TableTheme } from 'components/Table';
import { TableContainer, TableFilterContainer } from 'components/Table';
import { useTheme } from '@table-library/react-table-library/theme';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';

import { useCallback, useState, useEffect } from 'react';
import LoadingLogo from 'components/LoadingLogo';
import Checkbox from 'components/Input/Checkbox';

async function getPeople(param = '') {
  return fetch(`http://localhost:4002/people?${param}`, { method: 'GET' }).then((response) =>
    response.json()
  );
}
const BASE_URL = "http://localhost:4002/people";
const INITIAL_PARAMS = {
  search: '',
};
// Again, feel free to modify any code as much as you need.
// We know some of these things are incorrect, so please
// show us how to do it right! ✨
export default function PeopleTable() {
  // const [people, setPeople] = useState({nodes:[]});
  const [filters, setFilters] = useState([]);
  const [people, setPeople] = useState({ nodes: [] });

  const theme = useTheme(TableTheme);

  const fetchData = useCallback(async (params) => {
    const url = `${BASE_URL}?${params.search}`;
    const result = await fetch(url, { method: 'GET' })
    .then((response) =>
    response.json());
    
    // axios.get(url);

    setPeople({ nodes: result});
  }, []);
  useEffect(() => {
    fetchData({
      search: INITIAL_PARAMS.search,
    });
  }, [fetchData]);
  // useEffect(() => {
  //   async function loadPeople() {
  //     const people = await getPeople();
  //     setPeople(people);
  //   }
  //   loadPeople();
  // }, []);

  const handleCheckboxChange = (e) => {
    const target = e.target;
    let filterList = filters;
    let curFilter = `${target.dataset.type}=${target.name}`;
    if (target.checked) {
      filterList.push(curFilter);
    } else {
      filterList = filters.filter((value, index, array) => {
        return value !== curFilter;
      });
    }
    setFilters(filterList);
    getPeople(filterList.join('&')).then((ppl) => setPeople(ppl));

  }

  if (!people) {
    return <LoadingLogo />;
  }

  return (
    <>
      <TableContainer>
        <TableFilterContainer>
          <div>
            <label htmlFor="search">Search by Name:</label>
            <input id="search" type="text" name="search" />
          </div>
          <div>
            <Checkbox
              id="contractor"
              name="contractor"
              onChange={handleCheckboxChange}
              data-type="employment"
              label="Contractor"
            />
            <Checkbox
              id="employee"
              name="employee"
              onChange={handleCheckboxChange}
              data-type="employment"
              label="Employee"
            />
          </div>
        </TableFilterContainer>
        <Table data={people} theme={theme}>
          {(tableList) => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>Name</HeaderCell>
                  <HeaderCell>Role</HeaderCell>
                  <HeaderCell>Type</HeaderCell>
                  <HeaderCell>Country</HeaderCell>
                  <HeaderCell>Salary</HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {tableList.map((person) => (
                  <Row key={person.id} item={person}>
                    <Cell>{person.name}</Cell>
                    <Cell>{person.jobTitle}</Cell>
                    <Cell>{person.employment}</Cell>
                    <Cell>{person.country}</Cell>
                    <Cell>{person.salary}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
