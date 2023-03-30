import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import styled, { css } from "styled-components";
import { apiUrl } from "./App";
import { parseCurrencies } from "./helpers";
import CurrencyTable from "./CurrencyTable";
import CurrencyCalculator from "./CurrencyCalculator";

const Wrapper = styled.div`
  max-width: 960px;
  padding: 20px;
  margin: auto;
`;

const Status = styled.div<{ red?: boolean }>`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

function Converter(): ReactElement {
  const { isLoading, error, data } = useQuery({
    queryKey: ["currencies"],
    queryFn: () =>
      axios.get(apiUrl).then(({ data }) => {
        if (data?.statusCode !== 200) {
          throw new Error(data?.body || "Unknown error");
        }
        return data.body;
      }),
  });

  if (isLoading) return <Status>Loading...</Status>;

  if (error)
    return (
      <Status red>
        An error has occurred:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </Status>
    );

  const currencies = parseCurrencies(data);

  return (
    <Wrapper>
      <CurrencyCalculator currencies={currencies} />
      <CurrencyTable currencies={currencies} />
    </Wrapper>
  );
}

export default Converter;
