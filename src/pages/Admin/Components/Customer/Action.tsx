import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../../../../styles/Admin/UserAdmin.css';

const CustomerAction: React.FC = () => {
    return (
            <div>
                <div className='admin-user__action'>
                    <div className="admin-user__search-container">
                        <FontAwesomeIcon icon={faSearch} className="admin-user__search-icon" />
                        <input type="text" className="admin-user__search-input" placeholder="Search here" />
                    </div>
                    <button className='admin-user__add'>
                        <FontAwesomeIcon icon={faPlus} className='admin-user__plus-icon'/>
                         Add Customer
                    </button>
                </div>
             </div>
    )
}

export default CustomerAction;
