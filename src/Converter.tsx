import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { apiUrl } from "./App";

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

  return (
    <div>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}

export default Converter;
