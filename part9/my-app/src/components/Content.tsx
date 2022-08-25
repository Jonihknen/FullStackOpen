import { CourseParts } from "../App";
import Part from "./Part";

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courseParts.map((item) => (
        <div key={item.name}>
          <Part part={item}></Part>
        </div>
      ))}
    </div>
  );
};

export default Content;
