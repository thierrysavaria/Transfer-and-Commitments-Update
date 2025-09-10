function Transactions_Update() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('A1').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed", "table", 3)');
  spreadsheet.getRange('A118').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=2", "table", 3)');
  spreadsheet.getRange('A228').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=3", "table", 3)');
  spreadsheet.getRange('A346').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=4", "table", 3)');
  spreadsheet.getRange('A463').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=5", "table", 3)');
  spreadsheet.getRange('A587').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=6", "table", 3)');
  spreadsheet.getRange('A704').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=7", "table", 3)');
  spreadsheet.getRange('A827').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=8", "table", 3)');
  spreadsheet.getRange('A938').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=9", "table", 3)');
  spreadsheet.getRange('A1065').activate();
  spreadsheet.getCurrentCell().setValue('')
  .setFormula('=IMPORTHTML("https://www.eliteprospects.com/transfers/confirmed?page=10", "table", 3)');
  spreadsheet.getRange('A1066').activate();
};