import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";

// This is a functional component, it is a function that returns JSX.
// JSX is a syntax extension to JavaScript, it allows us to write HTML in JavaScript
// The function is called User, and it is exported as the default export from this module.
const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId));
    const navigate = useNavigate();

    // if the user exists, then the user is returned, otherwise the user is null.
    if (user){
        // The handleEdit function is called when the edit button is clicked.
        const handleEdit = () => navigate(`/dash/users/${userId}`);

        // The userRolesString is the user roles string.
        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        // The cellStatus is the cell status if the user is active, otherwise the
        // cellStatus is an empty string.
        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            // The user is returned.
            // The user is a table row with the user username, roles and edit button.
            // The user is returned if the user exists, otherwise the user is null.
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button className="icon-button table__button" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )


    } else return null
}

export default User