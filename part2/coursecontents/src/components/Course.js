const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) =>
  <p><b>total of {(parts.reduce((s, p) => s + p.exercises, 0))} exercises</b></p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => parts.map(part =>
  <Part key={part.id} part={part} />
)


function Course ({ courses }) {
    return <div>
    {courses.map(course =>
      <div key = {course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </div>
    )}
  </div>
}

export default Course