import { useState } from "react";
import { map } from "../assets/images";
import {
  delta,
  france,
  hawaiian,
  japan,
  quantas,
  united,
} from "../assets/logo";
import { FlightCard, PriceDetails, PriceGraph } from "../container";
import { Link, useNavigation } from "react-router-dom";
import { useFilterContext } from "../container/provider/conntextprovider";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {useLocation} from "react-router-dom";
import flightData from "../../flights.json";

const FlightChoose = () => {
  const [priceShown, setPriceShow] = useState(true);
const navigate=useLocation();
  const { date, source, destination } = useFilterContext();
  const [flightsData, setFlightsData] = useState([]);
  const [currentFlight, setCurrentFlight] = useState(null);
 

  const {data} = useQuery({
    queryKey: ['flightData'],
    queryFn: () =>
      fetch('https://api.npoint.io/4829d4ab0e96bfab50e7').then((res) =>
        res.json(),
      ),
  });
 
  useEffect(() => {
    const apiFlightData = data?.data;
    if (apiFlightData && apiFlightData.result.length > 0) {
      const filteredFlights = flightData.data.result.filter((flight) => {
        // Implement your filter logic here
        const isMatchingSource = source
          ? flight.displayData.source.airport.cityName.toLowerCase()=== source.toLowerCase()
          : true;
        const isMatchingDestination = destination
          ? flight.displayData.destination.airport.cityName.toLowerCase() === destination.toLowerCase()
          : true;
       
        
        // console.log(
        //   flight.displayData.source.airport.cityName,
        //   source,
        //   "source"
        // );
        // console.log(
        //   flight.displayData.destination.airport.cityName,
        //   destination,
        //   "destination"
        // );
       
        console.log(isMatchingSource, isMatchingDestination, "matching");

        // const isMatchingSourceDate = date[0] ? flight.displayData.source.depTime.includes(date[0]) : true;
        // const isMatchingDestinationDate = date[1] ? flight.displayData.destination.arrTime.includes(date[1]) : true;

        // Return flights where all conditions are true
        return isMatchingSource && isMatchingDestination ;
      });
      setFlightsData(filteredFlights);
    }
  });

  return (
    <>
      <div className="flex lg:flex-row flex-col items-start justify-between gap-16 ">
        <div className="w-full lg:w-[872px] h-full flex flex-col gap-5">
          <div className="flex items-start justify-start">
            <h1 className="text-[#6E7491]  text-lg leading-6 font-semibold">
              Choose a <span className="text-[#605DEC]">departing </span>/{" "}
              <span className="text-[#605DEC]">returning </span>flight
            </h1>
          </div>
          <div className="w-full flex flex-col items-start justify-start  border-[1px] border-[#E9E8FC] rounded-xl">
            {flightsData &&
              flightsData.length > 0 &&
              flightsData.map((flight) => {
                return (
                  <div
                    className="w-full cursor-pointer border-b-[1px] border-[#E9E8FC] hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
                    onClick={() => {
                      setPriceShow(false);
                      setCurrentFlight(flight);
                      console.log(currentFlight, "flight", flight);
                    }}
                    key={flight.id}
                  >
                    <FlightCard
                      key={flight.id}
                      img={hawaiian}
                      arrival={flight.displayData.destination.airport.cityName || ""}
              departure={flight.displayData.source.airport.cityName || ""}
                      duration={flight.displayData.totalDuration}
                      name={flight.displayData.airlines[0].airlineName || ""}
                      time={`${flight.displayData.source.depTime} - ${flight.displayData.destination.arrTime}`}
                      stop={`${flight.displayData.stopInfo}`}
                      // hnl={`${flight.displayData.stopCount}h ${flight.displayData.stopDuration}m in ${flight.displayData.stopCity}`}
                      hnl={`INR ${flight.fare}`}
                      price={flight.displayData.price}
                      // trip="round trip"
                    />
                  </div>
                );
              })}
            <div
              className="w-full cursor-pointer border-b-[1px] border-[#E9E8FC]  hover:bg-[#F6F6FE] transition-all duration-300 focus:bg-[#F6F6FE]"
              onClick={() => setPriceShow(false)}
            >
              <FlightCard
                img={delta}
                duration="18h 52m"
                name="Delta Airlines"
                time="9:47 AM - 4:15 PM"
                stop="1 stop"
                hnl="4h 05m in ICN"
                price="$756"
                trip="round trip"
              />
            </div>
          </div>
          <div className="w-full lg:mt-12">
            <img src={map} alt="map" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* {priceShown && <PriceGraph />} */}

        {currentFlight && (
          <div className="mt-10 flex flex-col gap-10 justify-end items-start lg:items-end">
            <PriceDetails 
              key={currentFlight.id}
              img={hawaiian}
              arrival={currentFlight.displayData.destination.airport.cityName || ""}
              departure={currentFlight.displayData.source.airport.cityName || ""}
              flightCode={currentFlight.displayData.airlines[0].flightNumber || ""}
              duration={currentFlight.displayData.totalDuration}
              name={currentFlight.displayData.airlines[0].airlineName || ""}
              time={`${currentFlight.displayData.source.depTime} - ${currentFlight.displayData.destination.arrTime}`}
              stop={`${currentFlight.displayData.stopInfo}`}
              // hnl={`${flight.displayData.stopCount}h ${flight.displayData.stopDuration}m in ${flight.displayData.stopCity}`}
              fee={`${currentFlight.fare}`}
            />
            <Link to="/passenger-info" className="mt-5">
              <button className="text-[#605DEC] border-2 border-[#605DEC] py-2 px-3 rounded hover:bg-[#605DEC] hover:text-white transition-all duration-200">
                Save & Close
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default FlightChoose;
