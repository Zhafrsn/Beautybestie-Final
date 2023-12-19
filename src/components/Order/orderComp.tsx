import React from "react";
import { useLocation } from "react-router-dom";

import '../../styles/Order.css';

export const orderItems = [
    { label: 'Not Paid', href: '/order' },
    { label: 'Being Packaged', href: '/order/being-packaged' },
    { label: 'Sent', href: '/order/sent' }
];

export const OrderComp: React.FC = () => {
    const location = useLocation();
    
    return (
        <div className="orderComp-container">
            {orderItems.map((item) => (
                <div key={item.label} className={`orderComp-items ${location.pathname === item.href ? 'active' : ''}`}>
                    <a href={item.href} className="orderComp-label">{item.label}</a>
                </div>
            ))}
        </div>
    )
}