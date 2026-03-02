const express = require("express");
const logger = require("morgan");

var DataLayer = require("./companydata/index.js");
const COMPANY_NAME = "cdb9772";
var dl = new DataLayer(COMPANY_NAME);

var app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());

// utils
function sendError(res, status, message) {
  res.status(status).json({ error: message });
}

//root / health routes
app.get("/CompanyServices", (req, res) => {
  res.json({
    service: "CompanyServices",
    company: COMPANY_NAME,
    status: "ok",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Use /CompanyServices for the timecard API.",
  });
});


//Company
// Spec path: /CompanyServices/company
// Verb: DELETE
// Query param: company=yourRitId
//
// Behavior:
//   - Calls dl.deleteCompany(companyName)
//   - On success: {"success":"companyName's information deleted."}
//   - On error:   {"error":"An appropriate error message."}
app.delete("/CompanyServices/company", async (req, res) => {
  try {
    const company = req.query.company;

    if (!company) {
      return sendError(res, 400, "Missing required query parameter: company");
    }

    const rowsDeleted = await dl.deleteCompany(company);

    res.json({
      success: `${company}'s information deleted.`,
      rowsDeleted: rowsDeleted,
    });
  } catch (err) {
    console.error("Error in DELETE /CompanyServices/company:", err);
    sendError(res, 500, err.message || "An appropriate error message.");
  }
});

// ----- 404 for unknown API routes -----
app.use("/CompanyServices", (req, res) => {
  sendError(res, 404, "Endpoint not found.");
});

// ----- Global error handler (safety net) -----
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  sendError(res, 500, "Internal server error.");
});

const PORT = parseInt(process.env.PORT || "8282", 10);
app.listen(PORT, () => {
  console.log(`Express started on port ${PORT}`);
});
