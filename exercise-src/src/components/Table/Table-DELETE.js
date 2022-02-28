import styled from 'styled-components';

export const TableTheme = {
  Table: `
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0 0;
    ${({ theme }) => theme.typography.bodySmall};
    color: var(--colors-bayoux);

    thead {
      border-bottom: 4px solid var(--colors-blank);
    }
  `,
  HeaderCell: `
    white-space: nowrap;
    padding: 18px 0 18px 20px;
    text-align: left;
    font-size: 0.6875rem;
    align: 'left';
    text-transform: uppercase;
    font-weight: 600;
    color: var(--colors-darkBlue);
    background-color: var(--colors-catskillWhite);
    text-align: ${({ align }) => align};

    // &:first-child {
    //   border-top-left-radius: 10px;
    // }

    &:last-child {
      padding-right: 20px;
      // border-top-right-radius: 10px;
    }
  `,
  Row: `
    &:first-child & {
      border-top: 0;
    }
    &:last-child & {
      &:first-child {
        border-bottom-left-radius: 10px;
      }
      &:last-child {
        border-bottom-right-radius: 10px;
      }
    }
  `,
  BaseCell: `
    border-right: 1px solid transparent;
    text-align: center;

    &:first-child {
      text-align: left;
    }

    &:last-child {
      text-align: right;
    }
  `,
  Cell:`
    height: 64px;
    padding: 8px 0 8px 20px;
    border-top: 1px solid var(--colors-mischka);
    text-align: ${({ align }) => align};
    border-radius: 0;
    background-color: var(--colors-blank);

    &:last-child {
      padding-right: 20px;
    }
  `,
}

export const TableContainer = styled.div`
  background-color: var(--colors-blank);
`;

export const TableFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// export const Table = styled.table`
export const Table = styled.div.attrs({ role: "grid" })`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0 0;
  ${({ theme }) => theme.typography.bodySmall};
  color: var(--colors-bayoux);

  thead {
    border-bottom: 4px solid var(--colors-blank);
  }
`;

export const TableRow = styled.tr``;

// export const TableThCell = styled.th`
export const TableThCell = styled.div.attrs({role: "rowheader"})`
  white-space: nowrap;
  padding: 18px 0 18px 20px;
  text-align: left;
  font-size: 0.6875rem;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--colors-darkBlue);
  background-color: var(--colors-catskillWhite);
  text-align: ${({ align }) => align};

  // &:first-child {
  //   border-top-left-radius: 10px;
  // }

  &:last-child {
    padding-right: 20px;
    // border-top-right-radius: 10px;
  }
`;

TableThCell.defaultProps = {
  align: 'left',
};

export const TableCell = styled.td`
  height: 64px;
  padding: 8px 0 8px 20px;
  border-top: 1px solid var(--colors-mischka);
  text-align: ${({ align }) => align};
  border-radius: 0;
  background-color: var(--colors-blank);

  &:last-child {
    padding-right: 20px;
  }

  ${TableRow}:first-child & {
    border-top: 0;
  }

  ${TableRow}:last-child & {
    &:first-child {
      border-bottom-left-radius: 10px;
    }
    &:last-child {
      border-bottom-right-radius: 10px;
    }
  }
`;

TableCell.defaultProps = {
  align: 'left',
};
