import { ChangeEvent, useState } from "react";
import { Currencies } from "./helpers";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 3rem 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;

  & > * {
    margin: 0.2rem 0;
  }

  & > *:not(:last-child) {
    margin-inline-end: 0.8rem;
  }
`;

const Input = styled.input`
  width: 5rem;
  flex: 1;
  font-size: 2rem;
  text-align: end;
  border: lightgray 1px solid;
  border-radius: 0.3rem;
  padding: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Select = styled.select`
  font-size: 2rem;
  border: lightgray 1px solid;
  border-radius: 0.3rem;
  padding: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Result = styled.span`
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

function CurrencyCalculator({ currencies }: { currencies: Currencies }) {
  const [input, setInput] = useState<string>("1");
  const [select, setSelect] = useState<string | undefined>();

  const amount = Number.parseFloat(input);
  const selectedCurrency = select || Object.values(currencies)[0].code;
  const result =
    amount || amount === 0
      ? Math.round(
          ((amount * currencies[selectedCurrency].rate) /
            currencies[selectedCurrency].amount) *
            1000
        ) / 1000
      : "?";

  return (
    <Wrapper>
      <Input
        type="number"
        value={input}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setInput(event.target.value)
        }
      />
      <Select
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setSelect(event.target.value)
        }
      >
        {Object.values(currencies).map((currency) => (
          <option key={currency.code}>{currency.code}</option>
        ))}
      </Select>
      <Result>{` = ${result} CZK`}</Result>
    </Wrapper>
  );
}

export default CurrencyCalculator;
