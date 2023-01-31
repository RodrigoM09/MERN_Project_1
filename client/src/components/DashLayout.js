import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import DashFooter from "./DashFooter";

// This is the layout for the dashboard, it will be used for all routes in the dashboard
// It will render the DashHeader and DashFooter components, and the Outlet component
// The Outlet component is a React Router component that will render the component that matches the current route
const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div class="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    );
}

export default DashLayout;