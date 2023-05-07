import react, { useState, useEffect } from "react";
import fusionChart from "../../data/fusionChart.json";
import demons from "../../data/demons.json";

const Test = ({}): React.ReactElement => {
  //Convert JSON into an array of all demons
  const allDemonsArray = Object.keys(demons).map((key) => [key, demons[key]]);
  const allDemonsNamesArray = Object.keys(demons).map((key) => key);

  // Find demon one from its name
  const [demonOneName, setDemonOneName] = useState("Titania");
  const demonOne = allDemonsArray.find((demon) => demon[0] === demonOneName);
  const demonOneRace = demonOne[1].race;
  const demonOneActualLvl = 1;
  const demonOneRaceIndex = fusionChart.races.indexOf(demonOneRace);
  const demonOneTableRow =
    fusionChart.table[demonOneRaceIndex] || "mitama or element or d-fiend";

  // Find demon two from its name
  const [demonTwoName, setDemonTwoName] = useState("Oni");
  const demonTwo = allDemonsArray.find((demon) => demon[0] === demonTwoName);
  const demonTwoRace = demonTwo[1]?.race;
  const demonTwoActualLvl = 1;

  // I THINK THE PROBLEM IS THAT THE DEMONTWOINDEXONTABLE ROW IS BROKEN DUE TO SPECIAL RACES BUT THIS IS A HUNCH

  // const specialRaceAlert = () => (if(demonOneTableRow = "mitama or element or d-fiend") {alert('special race')})

  // const resultDemonLvl = (demonOneActualLvl + demonTwoActualLvl) / 2;
  const resultDemonBaseLvl = (demonOne[1].lvl + demonTwo[1].lvl) / 2;

  console.log(resultDemonBaseLvl);

  const allDemonRows = fusionChart.table.map((demonRow, i) => demonRow);

  const allDemonRecipes = allDemonRows.flatMap((raceRow, i) => {
    const rowindex = i;
    const rowsArray = raceRow.flatMap((resultRace, i) => ({
      resultDemon: resultRace,
      columnIndex: fusionChart.races[i],
      rowIndex: fusionChart.races[rowindex],
      recipe: `${fusionChart.races[i]}${fusionChart.races[rowindex]}`,
    }));

    return rowsArray;
  });

  const resultRace = allDemonRecipes.find(
    (recepie) =>
      recepie.recipe === `${demonOneRace}${demonTwoRace}` ||
      recepie.recipe === `${demonTwoRace}${demonOneRace}`
  );

  console.log(resultRace);

  // Find final result from resulting demon's lvl and race

  // fitler works by:
  // filtering the list of all demons down to only include
  // demons that share the same race of the result demon.
  // Then it sorts demons in order of lvl.
  // Then it gets rid of demons below the level of the result demon's lvl#

  const testResultDemonArraySorted = allDemonsArray
    .filter((demon) => demon[1].race === resultRace?.resultDemon)
    .sort((a, b) => a[1].lvl - b[1].lvl)
    .filter((demon) => demon[1].lvl >= resultDemonBaseLvl);
  const testResultDemon = testResultDemonArraySorted[0];

  console.log(testResultDemonArraySorted);

  return (
    <>
      {/* Demon one UI */}
      <div className="mb-5">
        <h1>Demon 1</h1>
        <select
          onChange={(e) => setDemonOneName(e.target.value)}
          className="text-black"
        >
          {allDemonsNamesArray.map((demon) => (
            <option key={demon} value={demon}>
              {demon}
            </option>
          ))}
        </select>
      </div>
      {/* Demon two UI */}
      <div className="mb-5">
        <h1>Demon 2</h1>
        <select
          onChange={(e) => setDemonTwoName(e.target.value)}
          className="text-black"
        >
          {allDemonsNamesArray.map((demon) => (
            <option key={demon} value={demon}>
              {demon}
            </option>
          ))}
        </select>
      </div>
      {/* Result demon UI */}
      <h1>Demon Result</h1>
      {testResultDemon ? <p>{testResultDemon[0]}</p> : <p>null</p>}
    </>
  );
};

export default Test;
