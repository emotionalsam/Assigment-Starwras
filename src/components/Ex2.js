import React from "react";
import { searchPlanetByName } from "../api";
import Bar from "./Bar";

const planetsData = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

function Ex2() {
  const [planets, setPlanets] = React.useState([]);

  //planets info
  async function getPlanets() {
    let planetsInfo = [];
    for (const planet of planetsData)
      planetsInfo.push(await searchPlanetByName(planet));

    return planetsInfo;
  }
  React.useEffect(() => {
    getPlanets().then((res) => setPlanets(res));
  }, []);
  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        height: 380,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingTop: 20,
      }}
    >
      {planets.map(({ name, population }) => (
        <Bar name={name} population={population} />
      ))}
    </div>
  );
}

export default Ex2;
