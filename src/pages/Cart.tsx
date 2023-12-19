import { MainLayout } from "layout"
import { CartCard } from "../components/Cart/CartCard"
import "../styles/Cart.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TWishlist } from "../types/wishlist.type";
import { useCartItems } from "../firebase/cart";

export const Cart: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<TWishlist[]>([]);
    const [userId, setUserId] = useState<string>('');
    
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    
    const handleBuy = () => {
        navigate('/checkout');
    };
    const cartData = useCartItems(userId);

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserId(user.uid);  
            setCartItems(cartData);
          } else {
              setUserId('');
              setCartItems([]);
          }
        });
        
        return () => unsubscribe();
    }, [cartData, userId]);

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.productPrice * (quantity || 1); 
    }, 0);
      
    return (
        <MainLayout>
            <div className='Cart'>
                <section className="Cart__container">
                    <h1 className="Cart__title">Cart</h1>
                    <hr className='Cart__line' />
                </section>
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="cartCard__container">
                        <div className="cartCard__products-item">
                            {cartItems.map((item) => (
                                <CartCard
                                    key={item.productId}
                                    productId={item.productId}
                                    productName={item.productName}
                                    productPrice={item.productPrice}
                                    productImage={item.productImage}
                                    createdAt={item.createdAt}
                                    updatedAt={item.updatedAt}
                                    quantity={quantity}
                                    onIncreaseQuantity={increaseQuantity}
                                    onDecreaseQuantity={decreaseQuantity}
                                    onRemoveFromCart={() => ({})}
                                />
                            ))}
                        </div>
                        <div className="cartCard__summary">
                            <h2 className='cartCard__summary-title'>Summary</h2>
                            <hr />
                            <div className='cartCard__Totalorders'>
                                <p>Total Orders</p>
                                <p>IDR {totalPrice}</p>
                            </div>
                            <button className='cartCard_buy-btn' onClick={handleBuy}>Buy</button>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

