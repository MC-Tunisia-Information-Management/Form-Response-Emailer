function sendEmailsToAllResponses(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  for (var i = 1; i < data.length; i++) {
    // Start from index 1 to skip headers
    var email = data[i][5]; // Assuming the email is in the third column (adjust index as needed)
    var timestamp = data[i][0]; // Assuming the timestamp is in the first column

    if (e && e.range.getRow() === i + 1) {
      // Check if triggered by form submission and process only new response
      var draft = getDraftEmail(); // Retrieve the draft email

      // Send the email if the email address is not empty and a draft email is found
      if (email && draft) {
        var subject = draft.getSubject();
        var body = draft.getBody();

        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: body,
        });
      }
    }
  }
}

function getDraftEmail() {
  var drafts = GmailApp.getDrafts();
  var draft;

  for (var i = 0; i < drafts.length; i++) {
    draft = drafts[i];
    if (
      draft.getMessage().getSubject() ===
      "Start living your AIESEC experience ✈️"
    ) {
      return draft.getMessage(); // Return the entire draft message
    }
  }

  return null; // Return null if draft email is not found
}
