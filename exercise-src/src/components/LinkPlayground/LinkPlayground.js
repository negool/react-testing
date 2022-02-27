import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkPlayground = styled(Link).attrs({
  to: '/playground',
  children: 'Playground',
})`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 16px;
  background-color: var(--colors-blank);
  color: var(--colors-irisBlue);
  font-weight: 600;
  transition: background-color 200ms, color 200ms;
  border-top-left-radius: 6px;

  &:hover,
  &:focus {
    outline: none;
    background-color: var(--colors-irisBlue);
    color: var(--colors-blank);
  }
`;

export default LinkPlayground;
