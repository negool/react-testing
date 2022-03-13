import { Table, TableThCell, TableCell, TableRow, TableContainer, TableFilterContainer } from 'components/Table';
import { useState, useEffect, useCallback } from 'react';
import LoadingLogo from 'components/LoadingLogo';
import Checkbox from 'components/Checkbox';
import SearchInput from 'components/SearchInput/SearchInput';
import debounce from "lodash/debounce";


// async function getPeople(params = '') {
//   return fetch(`http://localhost:4002/people?${params}`, { method: 'GET' }).then((response) =>
//     response.json()
//   );
// }
async function getPeople(url, searchFilters) {
  let params = searchFilters.filters.join('&');
  if (searchFilters.search) {
    params += `&name_like=${searchFilters.search}`;
  }
  return fetch(`${url}?${params}`, { method: 'GET' }).then((response) =>
    response.json()
  );
}

// Again, feel free to modify any code as much as you need.
// We know some of these things are incorrect, so please
// show us how to do it right! ✨
export default function PeopleTable(props) {
  const [people, setPeople] = useState([]);
  const [filters, setFilters] = useState([]);
  const [search, setSearch] = useState("");

  const initialFilters = [];
  const initialSearch = '';

  const doGet = useCallback(async (params, mounted) => {
    
    const result = await getPeople(props.url, params);
    if (mounted) {
      setPeople(result);
      props.handleCountUpdate(result.length);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    doGet({
      filters: initialFilters,
      search: initialSearch
    }, mounted);
    return () => { mounted = false; }
  }, []);

  const handleFilterChange = (filter) => {
    filters.includes(filter)
      ? setFilters(filters.filter((value) => value !== filter))
      : setFilters(filters.concat(filter));
  }

  // Delay search by 600ms
  const delayedSearch = useCallback(
    debounce((params, mounted) => {
      doGet(params, mounted);
    }, 600),
    []
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }
  //on search and filter change retrieve data again
  useEffect(() => {
    let mounted = true;
    const params = {
      filters,
      search
    };
    delayedSearch(params, mounted);
    return () => { mounted = false; }
  }, [filters, search]);

  if (!people) {
    return <LoadingLogo />;
  }

  return (
    <>
      <TableContainer>
        <TableFilterContainer>
          <div>
            <SearchInput 
              id="name"
              name="name"
              value={search}
              onChange={handleSearchChange}
              label="Search People"
              placeholder="Search People..."
              data-testid="search"
            />
            {/* <label htmlFor="name">Search by Name:</label>
            <input id="name" type="text" name="name" value={search} onChange={handleSearchChange}/> */}
          </div>
          <div>
            <Checkbox
              id="contractor"
              name="contractor"
              onChange={() => handleFilterChange('employment=contractor')}
              data-type="employment"
              label="Contractor"
              checked={filters.includes('employment=contractor')}
              data-testid="contractor"
            />
            <Checkbox
              id="employee"
              name="employee"
              onChange={() => handleFilterChange('employment=employee')}
              data-type="employment"
              label="Employee"
              checked={filters.includes('employment=employee')}
              data-testid="employee"
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
