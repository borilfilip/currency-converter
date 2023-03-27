import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { apiUrl } from "./App";

interface Currency {
  country: string;
  currency: string;
  amount: string;
  code: string;
  rate: string;
}

function Converter(): ReactElement {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => axios.get(apiUrl).then((res) => res.data),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error)
    return (
      <div>
        An error has occurred:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  let currencies: { [code: string]: Currency } = {};
  if (data) {
    const rows = data.split("\n");
    rows.forEach((entry: string, line: number) => {
      if (line > 1 && entry) {
        const cols = entry.split("|");
        currencies = {
          ...currencies,
          [cols[3]]: {
            country: cols[0],
            currency: cols[1],
            amount: cols[2],
            code: cols[3],
            rate: cols[4],
          },
        };
      }
    });
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Code</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(currencies).map((currency: Currency) => (
            <tr key={currency.code}>
              <td>{currency.country}</td>
              <td>{currency.currency}</td>
              <td>{currency.amount}</td>
              <td>{currency.code}</td>
              <td>{currency.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

export default Converter;
