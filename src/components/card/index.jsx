import './style.css'

export function Card({ student, setStudents, students }) {
    const { id, name, time } = student
    function handleRemoveStudent() {
        setStudents([...students.filter(student => student.id !== id)])
    }

    return (
        <div className="card">
            <strong>{name}</strong>
            <small>{time}</small>
            <button onClick={handleRemoveStudent}>Remove</button>
        </div>
    )
}