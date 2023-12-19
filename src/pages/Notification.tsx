import ProfileComp from "components/Profile/ProfileComp"
import { MainLayout } from "layout"
import { faBellSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../styles/Notification.css';

export const Notification: React.FC = () => {
  return (
    <div>
        <MainLayout>
            <div className="Notification-container">
                <ProfileComp />
                <div className="Notification-content">
                    <div className="Notification-items">
                        <div className="Notification">
                            <FontAwesomeIcon icon={faBellSlash} className="Notification-Empty"/>
                            <p>Notification Empty</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    </div>
)
}
  