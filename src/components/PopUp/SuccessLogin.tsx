import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../../styles/popUp.css';
    
export const SuccessLogin: React.FC = () => {
    return (
        <div className="popUp-background">
            <div className="popUp-container">
                <FontAwesomeIcon icon={faCircleCheck} className="popUp-icon" />
                <div className="popUp-text">
                    <p className="popUp-text1">Success</p>
                    <p className="popUp-text2">Login Successfully</p>
                </div>
                <a href="/" className="popUp-btn" >OK</a>
            </div>
        </div>
    )
}