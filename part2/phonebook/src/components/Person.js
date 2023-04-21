const Person = ({ name, number, toggleDelete }) => {
    return (
        <tr><td>{name} {number} <button onClick={toggleDelete}>delete</button></td></tr>    
    )
}

export default Person