const { google } = require("googleapis");

exports.getLeaderBoard = async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: `credentials.json`,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // create client instance for auth
  const client = await auth.getClient();

  // Instance of google sheets Api
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadSheetId = "1Usc_AXEJmYI7B_btOa08n8wAr_OEfJVX4OJJ1jy6ir4";
  // Get metadata about spreadsheet
  try {
    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId: spreadSheetId,
    });

    // Read rows from spreadsheet
    googleSheets.spreadsheets.values
      .get({
        auth,
        spreadsheetId: spreadSheetId,
        range: "Sheet1!A:J",
      })
      .then((getRows) => {
        if (getRows != null) {
          const rows = getRows.data.values;
          if (rows.length != 0) {
            var rowHead = rows.shift();
            const formatedUsers = rows.map((row) => {
              return rowHead.reduce((obj, key, i) => {
                obj[key] = row[i];
                return obj;
              }, {});
            });
            res
              .status(200)
              .json({
                status: 200,
                message: "Ok",
                result: formatedUsers,
              })
              .end();
          } else {
            res
              .status(200)
              .json({
                status: res.status,
                message: "Ok",
                result: [],
              })
              .end();
          }
        } else {
          return res
            .json({ status: 500, message: "Error", result: error })
            .end();
        }
      });
  } catch (error) {
    return res.json({ status: 500, message: "Error", result: error }).end();
  }
};
