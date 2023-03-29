import { ChangeEvent, useEffect, useState } from "react";
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
    margin: 0.3rem 0;
  }

  & > *:not(:last-child) {
    margin-inline-end: 0.8rem;
  }
`;

const Input = styled.input`
  width: 7rem;
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

const Text = styled.span`
  font-size: 2rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

function CurrencyCalculator({ currencies }: { currencies: Currencies }) {
  const [foreignAmountInput, setForeignAmountInput] = useState<string>("1");
  const [czkAmountInput, setCzkAmountInput] = useState<string>("");
  const [currencySelect, setCurrencySelect] = useState<string | undefined>();

  const round = (amount: number) => Math.round(amount * 1000) / 1000;

  const selectedCurrency = currencySelect || Object.values(currencies)[0].code;
  const rate = currencies[selectedCurrency].rate;
  const amount = currencies[selectedCurrency].amount;

  const convertFromCzk = (input: string) => {
    const toConvert = Number.parseFloat(input);
    return !isNaN(toConvert)
      ? round((toConvert / rate) * amount).toString()
      : "";
  };

  const convertToCzk = (input: string) => {
    const toConvert = Number.parseFloat(input);
    return !isNaN(toConvert)
      ? round((toConvert * rate) / amount).toString()
      : "";
  };

  useEffect(() => {
    setCzkAmountInput(convertToCzk(foreignAmountInput));
    // We want this only on currency change (= also when currencies are loaded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency]);

  const onForeignAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setForeignAmountInput(input);
    setCzkAmountInput(convertToCzk(input));
  };

  const onCzkAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setForeignAmountInput(convertFromCzk(input));
    setCzkAmountInput(input);
  };

  return (
    <Wrapper>
      <Input
        type="number"
        value={foreignAmountInput}
        onChange={onForeignAmountInputChange}
      />
      <Select
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setCurrencySelect(event.target.value)
        }
      >
        {Object.values(currencies).map((currency) => (
          <option key={currency.code}>{currency.code}</option>
        ))}
      </Select>
      <Text>=</Text>
      <Input
        type="number"
        value={czkAmountInput}
        onChange={onCzkAmountInputChange}
      />
      <Text>CZK</Text>
    </Wrapper>
  );
}

export default CurrencyCalculator;
