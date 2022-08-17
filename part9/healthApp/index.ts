import express from "express";
import { calculate } from "./calculateBmi";
import { calculateExercises, dataParser } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  const result = calculate(height, weight);
  res.send(result);
});

app.post("/exercises", (req, res) => {
  const target = Number(req.body.target);
  const daily_exercises: Array<number> = req.body.daily_exercises;

  if (!target || !daily_exercises) {
    res.status(400).send({ error: "parameter missing" });
  }
  try {
    const parsedData = dataParser(target, daily_exercises);

    const result = calculateExercises(
      parsedData.exerciseList,
      parsedData.targetNumber
    );

    res.send({ result });
  } catch (e) {
    res.status(400);
    res.send({ error: e.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
