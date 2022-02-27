import { ButtonStyled, Text, Loading } from './Button.styled';
import SROnly from 'components/SROnly';

export default function Button({ children, isLoading, ...props }) {
  return (
    <ButtonStyled type="button" {...props}>
      <Text isLoading={isLoading}>{children}</Text>
      {isLoading && (
        <>
          <SROnly aria-live="assertive">Loading</SROnly>
          <Loading />
        </>
      )}
    </ButtonStyled>
  );
}
