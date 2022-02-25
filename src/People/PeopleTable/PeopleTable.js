import { Table, TableThCell, TableCell, TableRow } from 'components/Table';
import { useState, useEffect } from 'react';
import LoadingLogo from 'components/LoadingLogo';

async function getPeople(param='') {
  return fetch(`http://localhost:4002/people?${param}`, { method: 'GET' }).then((response) =>
    response.json()
  );
}

// Again, feel free to modify any code as much as you need.
// We know some of these things are incorrect, so please
// show us how to do it right! ✨
export default function PeopleTable() {
  const [people, setPeople] = useState(null);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    async function loadPeople() {
      const people = await getPeople();
      setPeople(people);
    }
    loadPeople();
  }, []);

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
      <div>
        <div>
          <label htmlFor="search">Search by Name:</label>
          <input id="search" type="text" name="search" /> 
        </div>
        <div className="right-align">
          <label htmlFor="contractor">Contractor</label>
          <input id="contractor" name="contractor" data-type="employment" type="checkbox" onChange={handleCheckboxChange}/>
          <label htmlFor="employee">Employee</label>
          <input id="employee" name="employee" data-type="employment" type="checkbox" onChange={handleCheckboxChange} />
        </div>
        
      </div>
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
    </>
  );
}
