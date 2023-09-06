const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const auth = require("./routes/authentication");

app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.listen(5000, () => {
	console.log("server started");
});
