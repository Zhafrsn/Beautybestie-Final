import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../../styles/popUp.css';
    
export const LoginFailed: React.FC = () => {
    return (
        <div className="popUp-background">
            <div className="popUp-container">
                <div className="popUp-text">
                    <FontAwesomeIcon icon={faXmark} className="popUp-icon-error" />
                    <p className="popUp-text-error">Error</p>
                    <p className="popUp__text">Please check your email or password.</p>
                </div>
                <a href="/login" className="popUp-btn">OK</a>
            </div>
        </div>
    )
}