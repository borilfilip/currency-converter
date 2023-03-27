export interface Currency {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface Currencies {
  [code: string]: Currency;
}

export function parseCurrencies(input: string): Currencies {
  let currencies: Currencies = {};
  if (input) {
    const rows = input.split("\n");
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
  return currencies;
}
