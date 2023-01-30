import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";

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
            </Route>

        </Route>
    </Routes>
  );
}

export default App;
