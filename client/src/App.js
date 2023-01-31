import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";


// App is the main component that is rendered by ReactDOM.render in index.js, it is the parent of all other components
// App is a functional component that returns a Routes component, which is a React Router component
// Routes is a React Router component that is used to define the routes for the application
function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route path="/" element={<Public />} />
            <Route path="/login" element={<Login />} />
            <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route path="notes">
                    <Route index element={<NotesList />} />
                </Route>
                <Route path="users">
                    <Route index element={<UsersList />} />
                </Route>
            </Route>

        </Route>{/* end of public routes */}
    </Routes>
  );
}
// App is exported as the default export from this module
export default App;
