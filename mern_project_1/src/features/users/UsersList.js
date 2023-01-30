import { useGetUsersQuery } from "./usersApiSlice";

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

    return (
        <h1>UsersList</h1>
    )
}

export default UsersList