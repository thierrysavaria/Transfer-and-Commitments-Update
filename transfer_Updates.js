// Normalize text by removing accents and special characters
function normalizeName(name) {
  if (!name) return ""; // Prevents errors if name is null/undefined
  return name
    .normalize("NFD") // Decomposes accented characters (e.g., ö → o + ̈)
    .replace(/\p{Diacritic}/gu, "") // Removes diacritical marks
    .replace(/[^\w\s\/\(\)]/g, '') // Keeps letters, numbers, spaces, slashes, and parentheses
    .trim();
}

function getTeamLeague(teamName) {
  const ohlTeams = Object.keys(getOHLTeamEquivalents());
  const whlTeams = Object.keys(getWHLTeamEquivalents());
  const qmjhlTeams = Object.keys(getQMJHLTeamEquivalents());

  if (ohlTeams.includes(teamName)) return "OHL";
  if (whlTeams.includes(teamName)) return "WHL";
  if (qmjhlTeams.includes(teamName)) return "QMJHL";

  return null; // Return null if the team is not found in any league
}


function trackPlayerTransfers() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transactionSheet = ss.getSheetByName('Transactions');

  if (!transactionSheet) {
    console.error('Transactions sheet not found!');
    return;
  }

  const leagueSheets = [
    {name: 'OHL', equivalents: getOHLTeamEquivalents()},
    {name: 'WHL', equivalents: getWHLTeamEquivalents()},
    {name: 'QMJHL', equivalents: getQMJHLTeamEquivalents()}
  ];

  const transactions = transactionSheet.getDataRange().getValues();
  
  // Process transactions from BOTTOM to TOP
  for (let i = transactions.length - 1; i > 0; i--) {
    const playerName = normalizeName(transactions[i][2]);
    const fromTeam = normalizeName(transactions[i][3]);
    const toTeam = normalizeName(transactions[i][4]);

    let fromLeague = getTeamLeague(fromTeam);
    let toLeague = getTeamLeague(toTeam);

    if (!fromLeague || !toLeague) {
      console.error(`Error: Unrecognized league for From: ${fromTeam}, To: ${toTeam}`);
      continue;
    }

    console.log(`Processing transaction for ${playerName} from ${fromTeam} (${fromLeague}) to ${toTeam} (${toLeague})`);

    leagueSheets.forEach(sheet => {
      if (fromLeague === sheet.name || toLeague === sheet.name) {
        const leagueSheet = ss.getSheetByName(sheet.name);
        if (!leagueSheet) {
          console.error(`Sheet for league ${sheet.name} not found!`);
          return;
        }

        const leagueData = leagueSheet.getDataRange().getValues();
        let playerFound = false;

        for (let j = 1; j < leagueData.length; j++) {
          if (normalizeName(leagueData[j][4]) === playerName) {
            playerFound = true;
            console.log(`Match found for player ${playerName} in ${sheet.name} league`);

            // Always update Column M (13th column)
            const teamColumnIndex = 13;

            if (fromLeague === toLeague) {
              const mappedToTeam = sheet.equivalents[toTeam] || toTeam;
              console.log(`Player stays in the same league. Updating team to ${mappedToTeam}`);
              leagueSheet.getRange(j + 1, teamColumnIndex).setValue(mappedToTeam);
            } else {
              const rowToMove = leagueData[j];
              console.log(`Player is changing leagues. Moving player to ${toLeague}`);

              leagueSheet.deleteRow(j + 1);

              const newLeagueSheet = ss.getSheetByName(toLeague);
              if (!newLeagueSheet) {
                console.error(`Sheet for new league ${toLeague} not found!`);
                return;
              }

              const newLeagueEquivalents = leagueSheets.find(sheet => sheet.name === toLeague)?.equivalents || {};
              const mappedToTeamNewLeague = newLeagueEquivalents[toTeam] || toTeam;

              newLeagueSheet.appendRow(rowToMove);
              const newRow = newLeagueSheet.getLastRow();
              newLeagueSheet.getRange(newRow, teamColumnIndex).setValue(mappedToTeamNewLeague);
              console.log(`Player ${playerName} moved to ${mappedToTeamNewLeague} in ${toLeague}`);
            }
            break;
          }
        }

        if (!playerFound) {
          console.error(`Error: Player ${playerName} not found in ${sheet.name} league.`);
        }
      }
    });
  }
}

// Team Equivalents Functions
function getOHLTeamEquivalents() {
  return {
    "Barrie Colts": "Barrie",
    "Brampton Steelheads": "Brampton",
    "Brantford Bulldogs": "Brantford",
    "Erie Otters": "Erie",
    "Guelph Storm": "Guelph",
    "Flint Firebirds": "Flint",
    "Kingston Frontenacs": "Kingston",
    "Kitchener Rangers": "Kitchener",
    "London Knights": "London",
    "Niagara IceDogs": "Niagara",
    "North Bay Battalion": "North Bay",
    "Oshawa Generals": "Oshawa",
    "Ottawa 67's": "Ottawa",
    "Owen Sound Attack": "Owen Sound",
    "Peterborough Petes": "Peterborough",
    "Saginaw Spirit": "Saginaw",
    "Sarnia Sting": "Sarnia",
    "Soo Greyhounds": "SOO",
    "Sudbury Wolves": "Sudbury",
    "Windsor Spitfires": "Windsor"
  };
}

function getWHLTeamEquivalents() {
  return {
    "Brandon Wheat Kings": "Brandon",
    "Calgary Hitmen": "Calgary",
    "Edmonton Oil Kings": "Edmonton",
    "Everett Silvertips": "Everett",
    "Kamloops Blazers": "Kamloops",
    "Kelowna Rockets": "Kelowna",
    "Lethbridge Hurricanes": "Lethbridge",
    "Medicine Hat Tigers": "Medicine Hat",
    "Moose Jaw Warriors": "Moose Jaw",
    "Portland Winterhawks": "Portland",
    "Prince Albert Raiders": "Prince Albert",
    "Prince George Cougars": "Prince George",
    "Red Deer Rebels": "Red Deer",
    "Regina Pats": "Regina",
    "Saskatoon Blades": "Saskatoon",
    "Seattle Thunderbirds": "Seattle",
    "Spokane Chiefs": "Spokane",
    "Swift Current Broncos": "Swift Current",
    "Tri-City Americans": "Tri-City",
    "Vancouver Giants": "Vancouver",
    "Victoria Royals": "Victoria",
    "Wenatchee Wild": "Wenatchee"
  };
}

function getQMJHLTeamEquivalents() {
  return {
    "Acadie-Bathurst Titan": "Acadie-Bathurst",
    "Baie-Comeau Drakkar": "Baie-Comeau",
    "Blainville-Boisbriand Armada": "Blainville-Boisbriand",
    "Cape Breton Eagles": "Cape-Breton",
    "Charlottetown Islanders": "Charlottetown",
    "Chicoutimi Saguenéens": "Chicoutimi",
    "Drummondville Voltigeurs": "Drummondville",
    "Gatineau Olympiques": "Gatineau",
    "Halifax Mooseheads": "Halifax",
    "Québec Remparts": "Quebec",
    "Moncton Wildcats": "Moncton",
    "Rimouski Océanic": "Rimouski",
    "Rouyn-Noranda Huskies": "Rouyn-Noranda",
    "Saint John Sea Dogs": "Saint John",
    "Shawinigan Cataractes": "Shawinigan",
    "Sherbrooke Phoenix": "Sherbrooke",
    "Val-d'Or Foreurs": "Val d'Or",
    "Victoriaville Tigres": "Victoriaville"
  };
}
