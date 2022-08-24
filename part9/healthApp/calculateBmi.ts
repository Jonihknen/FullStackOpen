interface HeightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): HeightWeight => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
let result: string;

const calculate = (height: number, weight: number) => {
  const bmi: number = (weight / height / height) * 10000;
  console.log(bmi);
  if (bmi < 18.5) {
    console.log("underweight");
    result = "underweight";
  }
  if (bmi >= 18.5 && bmi <= 24.9) {
    console.log("healthy weight");
    result = "healthy weight";
  }
  if (bmi >= 25 && bmi <= 29.9) {
    console.log("overweight");
    result = "overweight";
  }
  if (bmi >= 30 && bmi <= 40) {
    console.log("obese");
    result = "obese";
  }
  return {
    weight: weight,
    height: height,
    bmi: result,
  };
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculate(height, weight);
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
export { calculate };
