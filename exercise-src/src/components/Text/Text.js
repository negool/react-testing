import styled from 'styled-components';

const Text = styled.span`
  ${({ theme, size }) => theme.typography[size || 'body']}
`;

export default Text;

export const TextLight = styled(Text)`
  color: var(--colors-lynch);
`;
