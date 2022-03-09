import React, { useState } from "react";
import * as Styled from "./SearchInput.styled";
import SROnly from 'components/SROnly';
import { ReactComponent as IconSearch } from 'theme/icons/search.svg';


export default function SearchInput({ id, name, value, label, onChange, ...props }) {
  return (
    <>
      
      <Styled.SearchLabel htmlFor={id}>
        <IconSearch />
        <SROnly>{label}</SROnly>
      </Styled.SearchLabel>
      <Styled.SearchInput id={id} type="text" name={name} value={value} onChange={onChange} {...props}/>
    </>
  );
}
