import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OrderComp } from "components/Order/orderComp"
import ProfileComp from "components/Profile/ProfileComp"
import { MainLayout } from "layout"

export const NotPaid: React.FC = () => {
    return (
        <div>
            <MainLayout>
                <div className="order-container">
                    <ProfileComp />
                    <div className="order-content">
                        <OrderComp />
                        <div className="order-items">
                            <div className="notPaid">
                                <FontAwesomeIcon icon={faFileCircleXmark} className="notPaid-icon"/>
                                <p>No orders yet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}