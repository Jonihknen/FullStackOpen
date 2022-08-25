interface courseParts {
  courseParts: Array<coursePartBase>;
}
interface coursePartBase {
  name: string;
  exerciseCount: number;
}

const Total = (props: courseParts) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
export default Total;
