import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Converter from "./Converter";

// Create a client
const queryClient = new QueryClient();

export const apiUrl = "/.netlify/functions/cnb-rates";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Converter />
    </QueryClientProvider>
  );
}

export default App;
