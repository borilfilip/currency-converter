import { Currencies } from "./helpers";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-spacing: 0;

  th {
    text-align: start;

    &:not(:last-of-type) {
      padding-inline-end: 0.5rem;
    }
  }

  th,
  td {
    padding: 0.5rem 0;
    border-bottom: lightgray 1px solid;
  }
`;

function CurrencyTable({ currencies }: { currencies: Currencies }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Currency</th>
          <th>Code</th>
          <th>Amount</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(currencies).map((currency) => (
          <tr key={currency.code}>
            <td>{currency.country}</td>
            <td>{currency.currency}</td>
            <td>{currency.code}</td>
            <td>{currency.amount}</td>
            <td>{currency.rate}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CurrencyTable;
