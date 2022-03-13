import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PeopleTable from './PeopleTable';
import LinkPlayground from 'components/LinkPlayground';

const Container = styled.main`
  margin: 40px auto;
  padding: 0 16px;
  width: 100%;
  max-width: var(--layout-width);
`;
const Header = styled.h1 `
  font-size: 1.624rem;
  font-family: Inter;
  font-weight: 500;
  display: inline-block;
  margin: 6px 8px 39px 0px;
  line-height: 32px;
  color: var(--colors-darkBlue); 
`
const Counter = styled.span `
  color: var(--colors-bayoux);
  font-family: Inter;
  font-size: 14px;
`
export default function People({url}) {
  const [count, setCount] = useState(0);
  const handleCountChange = (curCount) => {
    setCount(curCount);
  }
  return (
    <Container>
      <Header>People</Header>
      <Counter>{count} members</Counter>
      <PeopleTable url={url} handleCountUpdate={handleCountChange} />
      <LinkPlayground />
    </Container>
  );
}
