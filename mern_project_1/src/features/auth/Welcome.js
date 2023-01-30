import { Link } from 'react-router-dom'

// This is a functional component, it is a function that returns JSX.
// The function is called Welcome, and it is exported as the default export from this module.
// JSX is a syntax extension to JavaScript, it allows us to write HTML in JavaScript
const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/notes">View techNotes</Link></p>

            <p><Link to="/dash/users">View User Settings</Link></p>

        </section>
    )

    return content
}
export default Welcome;