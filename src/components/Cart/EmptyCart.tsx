import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const EmptyCart: React.FC = () => {
    return (
        <section className='emptycart__container'>
            <FontAwesomeIcon icon={faCartShopping} className="emptycart-icon"/>
            <div className="emptycart__container-text">
                <div><b>Your Cart is Still Empty</b></div>
                <p className="emptycart__text">{"Let's start Purchasing your dream products here!"} </p>
            </div>
        </section>
    )
}