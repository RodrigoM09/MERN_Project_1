import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

// UsersList is a component that returns the usersApiSlice endpoints getUsers select data
// The data is the users, the isLoading is the loading state, the isSuccess is the success state,
// the isError is the error state and the error is the error message. The component returns the
// users list if the loading state is false and the success state is true, otherwise it returns
// the error message if the error state is true, otherwise it returns the loading message.
const UsersList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery()

    let content

    // if the loading state is false and the success state is true
    if(isLoading) content = <p>Loading...</p>

    // if the error state is true
    if(isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    // if isSuccess is true, then the users list is returned.
    // The users list is a table with the users username, roles and edit button.
    // The users list is returned if the users ids length is greater than 0, otherwise
    // the users list is null.
    if (isSuccess) {
        // The users ids are destructured from the users
        const { ids } = users
        // The tableContent is the users list if the users ids length is greater than 0, otherwise
        // the tableContent is null.
        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null
        // The content is the users list if the users ids length is greater than 0, otherwise
        // the content is null.
        content = (
            <table className="table table--users">
                <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th user__username">Username</th>
                    <th scope="col" className="table__th user__roles">Roles</th>
                    <th scope="col" className="table__th user__edit">Edit</th>
                </tr>
                </thead>
                <tbody>
                {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default UsersList