import React from "react";
import Person from "./Person";

const Persons = ({personsToShow}) => {
    return (
    <div>
        <ul>
            {personsToShow.map(person =>
            <Person key={person.name} person={person} />
            )}
        </ul>
    </div>
    )
}


export default Persons