function updatePlayerCommitments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transactionSheet = ss.getSheetByName('Transactions');

  if (!transactionSheet) {
    console.error('Transactions sheet not found!');
    return;
  }

  const leagueSheets = [
    { name: 'NCAA', equivalents: getNCAATeamEquivalents() },
    { name: 'USport', equivalents: getUSportTeamEquivalents() },
    { name: 'OHL', equivalents: getOHLTeamEquivalents() },
    { name: 'WHL', equivalents: getWHLTeamEquivalents() },
    { name: 'QMJHL', equivalents: getQMJHLTeamEquivalents() }
  ];

  // Load all the league data once
  const leagueData = {};
  leagueSheets.forEach(sheet => {
    const leagueSheet = ss.getSheetByName(sheet.name);
    if (leagueSheet) {
      leagueData[sheet.name] = leagueSheet.getDataRange().getValues();
      console.log(`Loaded ${leagueData[sheet.name].length} rows from ${sheet.name} sheet.`);
    } else {
      console.error(`Sheet for league ${sheet.name} not found!`);
    }
  });

  const transactions = transactionSheet.getDataRange().getValues();
  console.log(`Transactions sheet loaded with ${transactions.length} rows.`);

  for (let i = transactions.length - 1; i > 0; i--) {
    const playerName = transactions[i][2];
    const commitToSchool = transactions[i][4];

    if (!playerName) {
      console.warn(`Skipping row ${i + 1}: Missing player name.`);
      continue;
    }

    if (!commitToSchool) {
      console.warn(`Skipping row ${i + 1}: No commitment found for ${playerName}.`);
      continue;
    }

    console.log(`Processing ${playerName}, committed to ${commitToSchool}.`);

    leagueSheets.forEach(sheet => {
      const leagueSheetData = leagueData[sheet.name];
      if (leagueSheetData) {
        for (let j = 1; j < leagueSheetData.length; j++) {
          if (leagueSheetData[j][4] === playerName) {
            console.log(`Match found for ${playerName} in ${sheet.name} at row ${j + 1}.`);
            const commitmentCell = ss.getSheetByName(sheet.name).getRange(j + 1, 3);

            if (!commitmentCell.getValue()) {
              // Retrieve the equivalent short term (key) if it exists in the dictionary
              const equivalentCommit = sheet.equivalents[commitToSchool] || commitToSchool;
              console.log(`Updating commitment for ${playerName} to ${equivalentCommit}.`);
              commitmentCell.setValue(equivalentCommit);
            } else {
              console.warn(`Commitment cell already filled for ${playerName} in ${sheet.name}. Skipping update.`);
            }
            break;
          }
        }
      }
    });
  }
}



function getUSportTeamEquivalents() {
  return {
    "Acadia Univ.": "Acadia",
    "Univ. of Alberta": "Alberta",
    "Brock Univ.": "Brock",
    "Univ. of Calgary": "Calgary",
    "Carleton Univ.": "Carleton",
    "Concordia Univ.": "Concordia",
    "Grant MacEwan Univ.": "Grant MacEwan",
    "Lakehead Univ.": "Lakehead",
    "Univ. of Manitoba": "Manitoba",
    "McGill Univ.": "McGill",
    "Mount Royal Univ.": "Mount Royal",
    "Queen's Univ.": "Queen's",
    "Univ. of Toronto": "Toronto",
    "Toronto Metro Univ.": "Toronto Metro",
    "Univ. of Québec-Trois-Rivières": "UQTR",
    "Univ. of Western Ontario": "Western Ontario",
    "Wilfrid Laurier Univ.": "Wilfrid Laurier",
    "York Univ.": "York",
    "Univ. of New Brunswick": "UNB",
    "Saint Mary's Univ.": "Saint Mary's",
    "Univ. of Saskatchewan": "Saskatchewan",
    "St. Francis Xavier Univ.": "St. Francis Xavier",
    "Univ. of Waterloo": "Waterloo",
    "Univ. of Prince Edward Island": "UPEI",
    "Univ. of Ottawa": "Ottawa",
    "Univ. of Moncton": "Moncton",
    "Univ. of British Columbia": "UBC",
    "Ontario Tech Univ.": "Ontario Tech",
    "Univ. of Windsor": "Windsor",
    "Univ. of Guelph": "Guelph",
    "Nipissing Univ.": "Nipissing",
    "Royal Military College": "Royal Military",
    "Dalhousie Univ.": "Dalhousie",
    "Univ. of Regina": "Regina",
    "Trinity Western Univ.": "Trinity Western"
  };
}

// NCAA Team Equivalents
function getNCAATeamEquivalents() {
  return {
    "American International College": "AIC",
    "Air Force Academy": "Air Force",
    "U.S. Military Academy": "Army",
    "Arizona State Univ.": "ASU",
    "Augustana Univ.": "Augustana",
    "Boston College": "BC",
    "Boston Univ.": "BU",
    "Bentley Univ.": "Bentley",
    "Bowling Green State Univ.": "BGSU",
    "Brown Univ.": "Brown",
    "Bemidji State Univ.": "BSU",
    "Canisius Univ.": "Canisius",
    "Colorado College": "CC",
    "College of the Holy Cross": "CHC",
    "Clarkson Univ.": "Clarkson",
    "Colgate Univ.": "Colgate",
    "Cornell Univ.": "Cornell",
    "Dartmouth College": "Dartmouth",
    "Univ. of Denver": "Denver",
    "Ferris State Univ.": "Ferris",
    "Harvard Univ.": "Harvard",
    "Lindenwood Univ.": "Lindenwood",
    "Long Island Univ.": "LIU",
    "Lake Superior State Univ.": "LSSU",
    "Mercyhurst Univ.": "Mercyhurst",
    "Merrimack College": "Merrimack",
    "Miami Univ.": "Miami",
    "Univ. of Michigan": "Michigan",
    "Minnesota State Univ.": "Minn State",
    "Univ. of Minnesota Duluth": "Minn-Duluth",
    "Univ. of Minnesota": "Minnesota",
    "Michigan State Univ.": "MSU",
    "Michigan Technological Univ.": "MTU",
    "Niagara Univ.": "Niagara",
    "Univ. of Nebraska Omaha": "Nebraska",
    "Northern Michigan Univ.": "NMU",
    "Univ. of North Dakota": "North Dakota",
    "Northeastern Univ.": "Northeastern",
    "Univ. of Notre Dame": "Notre Dame",
    "Ohio State Univ.": "OSU",
    "Providence College": "PC",
    "Pennsylvania State Univ.": "Penn State",
    "Princeton Univ.": "PU",
    "Quinnipiac Univ.": "QU",
    "RIT (Rochester Inst. of Tech.": "RIT",
    "Robert Morris Univ.": "RMU",
    "St. Cloud State Univ.": "SCSU",
    "Sacred Heart Univ.": "SHU",
    "St. Lawrence Univ.": "SLU",
    "Univ. of St. Thomas": "St. Thomas",
    "Stonehill College": "Stonehill",
    "Univ. of Alaska Anchorage": "UAA",
    "Univ. of Alaska Fairbanks": "UAF",
    "Univ. of Connecticut": "UConn",
    "Univ. of Maine": "Maine",
    "Univ. of Massachusetts": "UMass",
    "Univ. of Massachusetts Lowell": "UMass Lowell",
    "Univ. of New Hampshire": "UNH",
    "Union College": "Union",
    "Univ. of Vermont": "UVM",
    "Univ. of Wisconsin": "Wisconsin",
    "Western Michigan Univ.": "WMU",
    "Yale Univ.": "Yale"
  };
}

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