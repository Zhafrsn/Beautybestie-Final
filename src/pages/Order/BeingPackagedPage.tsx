import { OrderComp } from "components/Order/orderComp"
import ProfileComp from "components/Profile/ProfileComp"
import { MainLayout } from "layout"

export const BeingPackaged: React.FC = () => {
    return (
        <div>
            <MainLayout>
                <div className="order-container">
                    <ProfileComp />
                    <div className="order-content">
                        <OrderComp />
                        <div className="order-items">
                            <div className="order-product">
                                <img src="/images/FaceWash1.png" alt="img" className="order__product-img"/>
                                <div className="order__product-detail">
                                    <p className="order__product-title">Bright Stuff Face Wash</p>
                                    <p className="order__product-category">Toner</p>
                                    <p className="order__product-quantity">2x</p>
                                </div>
                                <p className="order__product-price">IDR 100.000</p>
                            </div>
                            <div className="order-product">
                                <img src="/images/FaceWash2.png" alt="img" className="order__product-img"/>
                                <div className="order__product-detail">
                                    <p className="order__product-title">Bright Stuff Face Wash</p>
                                    <p className="order__product-category">Toner</p>
                                    <p className="order__product-quantity">1x</p>
                                </div>
                                <p className="order__product-price">IDR 200.000</p>
                            </div>
                            <hr />
                            <div className="order__amount-action">
                                <div className="order-amount">
                                    <p>Amount :</p>
                                    <p>IDR 400.000</p>
                                </div>
                                <div className="order-action">
                                    <button className="order__chat-btn">Chat</button>
                                    <button className="order__cancel-btn">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}