interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}
interface ExerciseValues {
  exerciseList: Array<number>;
  targetNumber: number;
}
const parseInput = (args: Array<string>): ExerciseValues => {
  const numList = args.slice(2).map((str) => Number(str));
  const target: number = numList.shift()!;
  console.log(target);
  console.log(numList);
  if (args.length < 4) throw new Error("Not enough arguments");

  if (numList.every((elem) => !isNaN(elem))) {
    return {
      exerciseList: numList,
      targetNumber: target,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (
  exercises: Array<number>,
  target: number
): Result => {
  let ratingDesc: string = "almost there";
  let rating: number = 2;

  const average: number =
    exercises.reduce((a, b) => a + b, 0) / exercises.length;
  if (average < target / 2) {
    rating = 1;
    ratingDesc = "did you even try?";
  }
  if (average >= target) {
    rating = 3;
    ratingDesc = "yeee you made it";
  }
  const Result = {
    periodLength: exercises.length,
    trainingDays: exercises.filter((a) => a !== 0).length,
    target: target,
    average: average,
    success: average >= target ? true : false,
    rating: rating,
    ratingDescription: ratingDesc,
  };
  return Result;
};

try {
  const { exerciseList, targetNumber } = parseInput(process.argv);
  console.log(calculateExercises(exerciseList, targetNumber));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
