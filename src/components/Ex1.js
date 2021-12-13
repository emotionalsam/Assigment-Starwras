import React from "react";
import { getVehicle, get } from "../api";
import { Table } from "react-bootstrap";

function Ex1({ setIsLoading }) {
  const [wantedInformation, setWantedInformation] = React.useState({});

  const getVehicles = async (page = 1, results = []) => {
    //recursive getting all pages
    const res = await getVehicle(page);
    if (res.next) await getVehicles(page + 1, [...results, ...res.results]);
    else {
      // getting all links
      const vehiclesInfo = [...results, ...res.results];

      //needed variables
      let maxPopulation = 0;
      let wantedVehicle;
      let wantedPilotes = [];
      let maxPopulationPlanetNames = [];

      //collection all vehicles
      for (const { name: vehicleName, pilots } of vehiclesInfo) {
        //temp variables
        let sum = 0;
        let planetNames = [];
        let pilotsNames = [];

        //pilots-homeworld
        for (const pilot of pilots) {
          const { name: pilotName, homeworld } = await get(pilot);
          const { name: planetName, population } = await get(homeworld);
          planetNames = [...planetNames, { planetName, population }];
          pilotsNames = [...pilotsNames, pilotName];
          sum += population === "unknown" ? 0 : parseInt(population);
        }

        //max population
        if (sum > maxPopulation) {
          maxPopulation = sum;
          wantedVehicle = vehicleName;
          maxPopulationPlanetNames = planetNames;
          wantedPilotes = pilotsNames;
        }
      }
      setWantedInformation({
        maxPopulation,
        wantedVehicle,
        maxPopulationPlanetNames,
        wantedPilotes,
      });
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    //triger function on componentdidmount
    getVehicles();
  }, []);

  return wantedInformation.maxPopulation ? (
    <>
      <Table
        style={{
          width: "50%",
          margin: "auto",
          marginTop: 100,
          marginBottom: 50,
        }}
        striped
        bordered
        hover
      >
        <tbody>
          <tr>
            <td>Vehicle name with the largest sum</td>
            <td>{wantedInformation.wantedVehicle}</td>
          </tr>
          <tr>
            <td>Related home planets and their respective population</td>
            <td>
              {wantedInformation.maxPopulationPlanetNames.map(
                ({ planetName, population }) => (
                  <>
                    <span>{planetName} </span>
                    <span>{"< " + population + " >"} </span>
                  </>
                )
              )}
            </td>
          </tr>
          <tr>
            <td>Related pilot names </td>
            <td>
              {wantedInformation.wantedPilotes.map((pilot) => (
                <span>{pilot} </span>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  ) : null;
}

export default Ex1;
