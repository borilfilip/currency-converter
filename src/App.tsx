import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Converter from "./Converter";

// Create a client
const queryClient = new QueryClient();

export const apiUrl =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Converter />
    </QueryClientProvider>
  );
}

export default App;
