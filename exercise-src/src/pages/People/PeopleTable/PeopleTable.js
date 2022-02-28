import { Table, TableThCell, TableCell, TableRow, TableContainer, TableFilterContainer } from 'components/Table';
import { useState, useEffect, useCallback, useRef } from 'react';
import LoadingLogo from 'components/LoadingLogo';
import Checkbox from 'components/Input/Checkbox';

// async function getPeople(params = '') {
//   return fetch(`http://localhost:4002/people?${params}`, { method: 'GET' }).then((response) =>
//     response.json()
//   );
// }
async function getPeople(searchFilters) {
  let params = searchFilters.filters.join('&');
  if (searchFilters.search) {
    params += `&name_like=${searchFilters.search}`;
  }
  return fetch(`http://localhost:4002/people?${params}`, { method: 'GET' }).then((response) =>
    response.json()
  );
}

// Again, feel free to modify any code as much as you need.
// We know some of these things are incorrect, so please
// show us how to do it right! ✨
export default function PeopleTable() {
  const [people, setPeople] = useState(null);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");

  const initialFilters = [];
  const initialSearch = '';

  const doGet = useCallback(async (params) => {
    setPeople(await getPeople(params));
  }, []);

  useEffect(() => {
    doGet({
      filters: initialFilters,
      search: initialSearch
    });
  }, []);

  const handleFilterChange = (filter) => {
    filters.includes(filter)
      ? setFilters(filters.filter((value) => value !== filter))
      : setFilters(filters.concat(filter));
  }

  const timeout = useRef();
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const params = {
      filters,
      search
    };
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => doGet(params), 100);
    // setTimeout(() => doGet(params), 1000);
  }
  // const timeout = React.useRef();

  // function onSearchChange(action, state) {
  //   const params = {
  //     search: state.search,
  //   };

  //   if (timeout.current) clearTimeout(timeout.current);

  //   timeout.current = setTimeout(() => doGet(params), 500);
  // }

  useEffect(() => {
    const params = {
      filters,
      search
    };
    doGet(params);
  }, [filters]);

  

  if (!people) {
    return <LoadingLogo />;
  }

  return (
    <>
      <TableContainer>
        <TableFilterContainer>
          <div>
            <label htmlFor="name">Search by Name:</label>
            <input id="name" type="text" name="name" value={search} onChange={handleSearchChange}/>
          </div>
          <div>
            <Checkbox
              id="contractor"
              name="contractor"
              onChange={() => handleFilterChange('employment=contractor')}
              data-type="employment"
              label="Contractor"
              checked={filters.includes('employment=contractor')}
            />
            <Checkbox
              id="employee"
              name="employee"
              onChange={() => handleFilterChange('employment=employee')}
              data-type="employment"
              label="Employee"
              checked={filters.includes('employment=employee')}
            />
          </div>
        </TableFilterContainer>
        <Table>
          <thead>
            <tr>
              <TableThCell>Name</TableThCell>
              <TableThCell>Role</TableThCell>
              <TableThCell>Type</TableThCell>
              <TableThCell>Country</TableThCell>
              <TableThCell align="right">Salary</TableThCell>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.jobTitle}</TableCell>
                <TableCell>{person.employment}</TableCell>
                <TableCell>{person.country}</TableCell>
                <TableCell align="right">{person.salary}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}
