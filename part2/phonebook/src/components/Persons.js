import React from "react";
import Person from "./Person";

const Persons = ({personsToShow, delName}) => {
    return (
    <div>
        <ul>
            {personsToShow.map(person =>
            <Person key={person.name} person={person} delName={() => delName(person.id, person.name)} />
            )}
        </ul>
    </div>
    )
}


export default Persons