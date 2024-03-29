//day 5a
var fs = require("fs"); // imports fs
const Map = require("./Map.js");

function DayFive()
{
    // 1) first identify all symbols and mark around them in an array the same size as the input
    let lines = fs.readFileSync("day-5/input-2023-5.txt", "utf-8")
        .replace("\r\r", "")
        .split("\n")
        .filter(line => line.trim() !== "")

    var mapList = [];

    // Generate seeds list
    let seedsListIndex = lines.findIndex(i => i.match(/seeds:.*/));
    let seedsList = lines[seedsListIndex].replace("\r", "").split(" ").filter(value => value.trim() !== "seeds:").map(Number);
    //console.log(seedsList);

    
    // Generate maps
    for (let line = 0; line < lines.length; line++)
    {
        if (lines[line].match(/[a-z]*-to-[a-z]* map:/))
        {
            let mapData = [];
            let mapSrc = lines[line].split("-to-")[0];
            let mapDest = lines[line].split("-to-")[1].split(" map:")[0];

            let pointer = 1;
            while (line + pointer < lines.length && lines[line + pointer][0].match(/\d/))
            {
                mapData.push(lines[line + pointer].replace("\r", "").split(" ").map(Number));
                pointer++;
            }

            mapData.sort((a,b) => b[1] - a[1]);

            //console.log(`Source: "${mapSrc}"`);
            //console.log(`Destination: "${mapDest}"`);
            //console.log(mapData[0]);
            mapList.push(new Map(mapSrc, mapDest, mapData));
        }
    }

    // Process every seed
    finalValuesList = [];
    for (let s = 0; s < seedsList.length; s++)
    {
        let mapSource = "seed";
        let theValue = seedsList[s];

        while (mapSource !== "location")
        {
            mapIndex = mapList.findIndex(obj => obj.mapSrc === mapSource);
            //console.log(mapSource);
            //console.log(mapIndex);
            theValue = MapAValue(mapList[mapIndex].mapData, theValue);
            mapSource = mapList[mapIndex].mapDest;
        }

        finalValuesList.push(theValue);
    }

    console.log(seedsList);
    console.log(`The lowest value is: ${finalValuesList.sort((a, b) => a - b)[0]}`);
    
}

/// returns an integer value using a sorted map (descending)
function MapAValue(mapData, value)
    {
        value = parseInt(value);
        //console.log("Your current map data is:");
        //console.log(mapData);
        for (let i = 0; i < mapData.length; i++)
        {
            if (value >= mapData[i][1] && value < mapData[i][1] + mapData[i][2])
            {
                //console.log(`a map was found for value ${value} at mapSource ${mapData[i][1]}`);
                //console.log(mapData[i][0]);
                value = mapData[i][0] + (value - mapData[i][1]);
                //console.log(value);
                return value;
            }
        }

        //console.log(`no match was found for value ${value}`);
        return value; // no map was found
    }

DayFive();