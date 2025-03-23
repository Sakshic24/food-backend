const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mongoDB = require("./db");
const myOrderRoute = require("./Routes/myorder.js");
const paymentRoute = require('./Routes/payment.js');
// const createuser = require("./Routes/Loginuser.js")

mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(cors());
app.use(express.json());
app.use("/api", require("./Routes/Createuser.js"));
app.use("/api", require("./Routes/Loginuser.js"));
app.use("/api", require("./Routes/DisplayData.js"));
app.use('/api', paymentRoute);
app.use("/api", myOrderRoute); 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

