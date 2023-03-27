import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, ReactElement, useState } from "react";
import { apiUrl } from "./App";

interface Currency {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

function Converter(): ReactElement {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => axios.get(apiUrl).then((res) => res.data),
  });
  const [input, setInput] = useState<string>("");
  const [select, setSelect] = useState<string | undefined>();

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
            amount: Number.parseInt(cols[2]),
            code: cols[3],
            rate: Number.parseFloat(cols[4]),
          },
        };
      }
    });
  }

  const amount = Number.parseFloat(input);
  const selectedCurrency = select || Object.values(currencies)[0].code;
  const result = amount
    ? (amount * currencies[selectedCurrency].rate) /
      currencies[selectedCurrency].amount
    : "?";

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
          {Object.values(currencies).map((currency) => (
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
      <input
        type="number"
        value={input}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setInput(event.target.value)
        }
      />{" "}
      <select
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setSelect(event.target.value)
        }
      >
        {Object.values(currencies).map((currency) => (
          <option key={currency.code}>{currency.code}</option>
        ))}
      </select>{" "}
      = {result} CZK
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

export default Converter;
