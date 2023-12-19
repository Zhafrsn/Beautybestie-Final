import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../../styles/popUp.css';
    
export const SuccessTransaction: React.FC = () => {
    return (
        <div className="popUp-background">
            <div className="popUp-container">
                <FontAwesomeIcon icon={faCircleCheck} className="popUp-icon" />
                <div className="popUp-text">
                    <p className="popUp-text1">Transaction Successful</p>
                    <p className="popUp-text2">Thank you for your purchase</p>
                </div>
                <a href="/order" className="popUp-btn" >OK</a>
            </div>
        </div>
    )
}