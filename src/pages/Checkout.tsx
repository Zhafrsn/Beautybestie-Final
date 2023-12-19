import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../styles/Checkout.css';
import { MainLayout } from "layout";
import { useState } from "react";
import { SuccessTransaction } from "components/PopUp/SuccessTransaction";

export const Checkout: React.FC = () => {
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleCheckout = () => {
        setShowSuccessPopup(true);
    };
    return (
        <MainLayout>
        <div className="checkout-container">
            <div className="checkout-header">
                <h1 className="checkout__header-text">Checkout</h1>
                <hr className="checkout__header-line"/>
            </div>
            <div className="checkout-content">
                <div className="checkout-wrapper1">
                    <div className="checkout-items">
                        <h3 className="checkout-text">Delivery Address</h3>
                        <div className="checkout-fill">
                            <h4 className="checkout__user-name">Nama Pengguna</h4>
                            <div className="checkout__user-text">
                                <p>ini adalah contoh alamat lengkap blok M/12 di jalan apa yaa,
                                    kecamatan, KOTA MAKASSAR, SULAWESI SELATAN, 90235</p>
                                <p>No. Telp: no telp pengguna</p>
                            </div>
                            <button className="checkout__btn-addr">CHANGE ADDRESS</button>
                        </div>
                    </div>
                    <div className="checkout-items">
                        <h3 className="checkout-text">Order List</h3>
                        <div className="checkout-product">
                            <img src="/images/FaceWash1.png" alt="img" className="checkout__product-img"/>
                            <div className="checkout__product-fill">
                                <div className="checkout__product-detail">
                                    <p className="checkout__product-text">Product name</p>
                                    <p className="checkout-quantity">2x</p>
                                    <p className="checkout__product-text">IDR 100.000</p>
                                </div>
                                <p className="checkout-total">Total : IDR 200.000</p>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-items">
                        <h3 className="checkout-text">Delivery Option</h3>
                        <div className="checkout__option-btn">
                            <p>Choose a delivery option</p>
                            <FontAwesomeIcon icon={faAngleRight}/>
                        </div>
                    </div>
                </div>
                <div className="checkout-wrapper2">
                    <div className="checkout__option-btn">
                        <p>Payment Option</p>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </div>
                    <div className="checkout-summary">
                        <h3 className="checkout-text">Summary</h3>
                        <hr />
                        <div className="checkout__summary-ps">
                            <div className="checkout__summary-price">
                                <p>Price</p>
                                <p>IDR 200.000</p>
                            </div>
                            <div className="checkout__summary-shipping">
                                <p>Shipping</p>
                                <p>IDR 50.000</p>
                            </div>
                        </div>    
                        <hr />
                        <div className="checkout__summary-total">
                            <p>Total Price</p>
                            <p>IDR 250.000</p>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
        {showSuccessPopup && <SuccessTransaction/>}
        </MainLayout>
    )
}