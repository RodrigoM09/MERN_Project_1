import {Outlet} from "react-router-dom";

// This is the layout for the dashboard, it will be used for all routes in the dashboard
// It will render the DashHeader and DashFooter components, and the Outlet component
// The Outlet component is a React Router component that will render the component that matches the current route
const Layout = () => {
    return <Outlet />
}

export default Layout;