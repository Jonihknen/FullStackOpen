import React from "react";

const Person = ({person, delName}) => {
    return (
    <li key = {person.name}> {person.name} {person.number}
    <button onClick={delName}>Delete</button>
    </li>
    )
  }

export default Person