/* day XX1a
Plan:
  use a for loop 64 times and basically "flip" bits
  Flip all "O" to "." but also flip all adjacent cells of what was "O" to "O"
    Make sure logically it's not possible for a cell to become inaccessible and accessible on the same turn (it might be)
    I should be able to "step" my solution to avoid this issue, though, by removing previous "O"'s first.
*/

var fs = require("fs"); // imports fs

function DayTwentyOne()
{
  // 1. Parse input
  let currentStepArray = fs.readFileSync("day-XX1/sample-input-2023-21.txt", "utf-8")
  .replace(/\r/gm, "")
  .split("\n")
  .map(i => i.split(""));

  let templateStepArray = GenerateTemplateStepArray(currentStepArray);

  PrintStepArray(currentStepArray);

  for (let s = 0; s < 64; s++)
  {
    currentStepArray = TakeAStep(currentStepArray, templateStepArray);

    PrintStepArray(currentStepArray);
  }

}

function TakeAStep(currentStepArray, templateStepArray)
{
  let nextStepArray = templateStepArray;

  for (let r = 0; r < currentStepArray.length; r++)
  {
    for (let c = 0; c < currentStepArray[r].length; c++)
    {
      if (currentStepArray[r][c] === "O" || currentStepArray[r][c] === "S")
      {
        // Flip the bits of all cells surrounding O in the templateStepArray (todo: as long as they don't contain #)
        if (r > 0) //N
        {
          nextStepArray[r - 1][c] = "O";
        }

        if (c < currentStepArray[r].length - 1) //E
        {
          nextStepArray[r][c + 1] = "O";
        }

        if (r < currentStepArray.length - 1) //S
        {
          nextStepArray[r + 1][c] = "O";
        }

        if (c > 0) //W
        {
          nextStepArray[r][c - 1] = "O";
        }
      }
    }
  }

  return nextStepArray;
}

function GenerateTemplateStepArray(inputStepArray)
{
  let currentStepArray = inputStepArray.map(row => [...row]);

  for (let r = 0; r < currentStepArray.length; r++)
  {
    for (let c = 0; c < currentStepArray[r].length; c++)
    {
      if (currentStepArray[r][c] === "S")
      {
        currentStepArray[r][c] = ".";
        return currentStepArray;
      }
    }
  }
}

function PrintStepArray(stepArray)
{
  console.log("Printing Step Array:");
  for (let r = 0; r < stepArray.length; r++)
    {
      let column = "";
      for (let c = 0; c < stepArray[r].length; c++)
      {
        column += stepArray[r][c];
      }
      console.log(column);
    }
}

DayTwentyOne();