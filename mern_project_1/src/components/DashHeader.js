import {Link} from 'react-router-dom';

// This is a functional component, it is a function that returns JSX.
// JSX is a syntax extension to JavaScript, it allows us to write HTML in JavaScript
// The function is called DashHeader, and it is exported as the default export from this module.
const DashHeader = () => {
    return (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash/notes">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>
    )
}

export default DashHeader;