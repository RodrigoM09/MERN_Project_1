import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import  { faHouse} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";


// This is the footer for the dashboard, it will be used for all routes in the dashboard
// It will render the DashHeader and DashFooter components, and the Outlet component
// The Outlet component is a React Router component that will render the component that matches the current route
const DashFooter = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const onGoHomeClick = () => navigate("/dash")

    let goHomeButton = null
    if (pathname !== "/dash") {
        goHomeButton = (
            <button className="dash-footer__button" title= onClick={onGoHomeClick}>
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="dash__footer">
            {goHomeButton}
            <p>Current User:</p>
            <p>Status:</p>
        </footer>
    )
    return content
}

export default DashFooter;