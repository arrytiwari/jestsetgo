import React from "react";
import { useState } from "react";
import ReactQueryProvider from "./queryProvider";

const FilterContext = React.createContext();
export const useFilterContext = () => React.useContext(FilterContext);

export default function ContextProvider({ children }) {
  const [destination, setDestination] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  
  const value = {
    destination,
    setDestination,
    source,
    setSource,
    date,
    setDate,
    
  };
  console.log(date, destination, source);
  return (
    <ReactQueryProvider>
      <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
    </ReactQueryProvider>
  );
}
