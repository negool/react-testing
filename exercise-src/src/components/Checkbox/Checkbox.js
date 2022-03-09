import React, { useState } from "react";
import * as Styled from "./Checkbox.styled";

export default function Checkbox({ id, name, value, label, onChange, ...props }) {
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
