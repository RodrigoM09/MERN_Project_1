import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div class="dash-container">
                <Outlet />
            </div>
        </>
    );
}

export default DashLayout;