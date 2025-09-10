# Hockey Player Transactions & Commitments Tracker

This repository contains a set of Google Apps Script files designed to automate the process of collecting and managing hockey player transfers and commitments from **Elite Prospects**.  
The scripts pull raw data and process it to update various league and commitment sheets, helping to maintain a comprehensive and accurate database of player movements.

---

## Features

- **Automated Data Collection**  
  Scripts can be set up with time-driven triggers to automatically scrape and update player transfers from Elite Prospects.

- **Player Transfer Data**  
  The `transfer_BoardMacro.js` script fetches and populates confirmed players transfer data from Elite Prospects.

- **Commitment Tracking**  
  The `commitments_Updates.js` script processes raw transfer data to track player commitments to various leagues (NCAA, USport, OHL, WHL, QMJHL).

- **Data Normalization**  
  Includes a helper script with functions to normalize text, making it easier to match player and team names and categorize them by league.

---

## How to Use

1. **Create a Google Sheet**  
   Open a new Google Sheet.

2. **Create Tabs**  
   The scripts rely on specific sheet names. You must create separate tabs with the exact names:  
   - `Transactions`  
   - `NCAA`  
   - `USport`  
   - `OHL`  
   - `WHL`  
   - `QMJHL`

3. **Create an Apps Script Project**  
   From your Google Sheet, go to **Extensions > Apps Script** and start a new project.

4. **Copy the Code**  
   Copy the contents of the `.js` files from this repository into your Apps Script project.

5. **Set up Triggers**  
   For automation, go to the **Triggers section** (the clock icon on the left) in your Apps Script project and set up a time-driven trigger for the `Transactions_Update` and `updatePlayerCommitments` functions to run daily.

---

## File Breakdown

- **`transfer_BoardMacro.js`**  
  Uses `IMPORTHTML` to pull the latest player transfer data from Elite Prospects and populates the `Transactions` sheet.  
  This is the initial data-gathering step.

- **`commitments_Updates.js`**  
  Processes the data in the `Transactions` sheet and updates player commitment information across the `NCAA`, `USport`, `OHL`, `WHL`, and `QMJHL` sheets.

- **`transfer_Updates.js`**  
  Contains helper functions like `normalizeName` and `getTeamLeague` that are used by the other scripts to ensure data consistency and accuracy.

---

## Disclaimer

Please note that these scripts rely on the specific HTML structure of the Elite Prospects website.  
If the website changes its structure, the scripts may break and require updates.

---

## Contributing

I welcome contributions to this project! If you have any ideas for new features, bug fixes, or improvements, please feel free to open a pull request.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE.md](LICENSE.md) file for details.

---

## Contact

**Thierry Savaria**  
GitHub: [thierrysavaria](https://github.com/thierrysavaria)
