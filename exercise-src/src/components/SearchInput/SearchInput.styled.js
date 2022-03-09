import styled from 'styled-components';
import searchSvgURL from '../../theme/icons/search.svg';
import { ReactComponent as IconSearch } from 'theme/icons/search.svg';


export const SearchInput = styled.input`
  border: 1px solid var(--colors-lynch);
  box-sizing: border-box;
  border-radius: 25px; 
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  margin: 15px 20px;
  height: 34px;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--colors-bayoux);
  }
  :-ms-input-placeholder {
     color: var(--colors-bayoux);
  }
  
`;


export const SearchLabel = styled.label`
  position relative;
  :before {
    content: "";
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 20px;
    background-image: url("theme/icons/search.svg");
  }
`;

