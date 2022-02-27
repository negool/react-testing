import React, { useState } from "react";
import * as Styled from "./Checkbox.styled";

const Checkbox = ({ id, name, value, label, onChange, ...props }) => {
  return (
    <Styled.Container>
      <Styled.Label htmlFor={id}>{label}
        <Styled.CheckboxInput
          id={id} name={name}
          type="checkbox"
          onChange={onChange}
          {...props} />
      </Styled.Label>
    </Styled.Container>
  );
}

export default Checkbox;