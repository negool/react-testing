import styled from 'styled-components';
import PeopleTable from './PeopleTable';
import LinkPlayground from 'components/LinkPlayground';

const Container = styled.main`
  margin: 40px auto;
  padding: 0 16px;
  width: 100%;
  max-width: var(--layout-width);
`;

export default function People() {
  return (
    <Container>
      <PeopleTable />
      <LinkPlayground />
    </Container>
  );
}
