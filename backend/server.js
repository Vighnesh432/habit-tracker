const express = require("express");
const cors = require("cors");

const habitsRoutes = require("./routes/habits");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/habits", habitsRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
