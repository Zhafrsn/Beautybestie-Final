import { faBoxArchive, faChartColumn, faCheckToSlot, faCircle, faGauge, faRightFromBracket, faSearch, faUser, faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import '../../../styles/Admin/SidebarAdmin.css'

export const siderbarItems = [
    { label: 'Dashboard', href: '/dashboard', icon: <FontAwesomeIcon icon={faGauge} /> },
    { label: 'Products', href: '/admin/productlist', icon: <FontAwesomeIcon icon={faBoxArchive} /> },
    { label: 'Customers', href: '/admin/customers', icon: <FontAwesomeIcon icon={faUsers} /> },
    { label: 'Transactions', href: '/admin/transactions', icon: <FontAwesomeIcon icon={faCheckToSlot} /> },
    { label: 'Reports', href: '/admin/reports', icon: <FontAwesomeIcon icon={faChartColumn} />}
]

interface SiderbarAdminProps {
    username: string;
  }

export const Sidebar: React.FC<SiderbarAdminProps> = ({ username }) => {
    const isAdmin = true;
    
    return (
        <div className="siderbar-admin">
            <div className="siderAdmin-header">
                <div className="sideAdmin-container">
                    <FontAwesomeIcon icon={faUserCircle} className='sideAdmin__user-icon'/>
                    <div className="sideAdmin-user">
                        <span>{username}</span>
                        <span>Admin</span> {/*sementara*/}
                        <div className="sideAdmin-status">
                            <FontAwesomeIcon icon={faCircle} className="sideAdmin__circle-icon"/>
                            <p>Online</p>
                        </div>
                    </div>
                </div>
                <button className="sidebarAdmin__search-btn">
                    <input
                        type="text"
                        className="sidebarAdmin__search-input"
                        placeholder="Search..."
                    />
                    <FontAwesomeIcon icon={faSearch} className='sidebarAdmin__search-icon'/>
                </button>
            </div>
            <p className="sideAdmin-text">MAIN MENU</p>
            <div className="sideAdmin-items">
                {siderbarItems.map((item) => (
                    <div key={item.label} className="sideAdmin-label">
                        <div className="sideAdmin-icons">{item.icon}</div>
                        <a href={item.href} className={`sideAdmin_items-label ${!isAdmin ? 'disabled' : ''}`}>{item.label}</a>
                    </div>
                ))}
            </div>
            <p className="sideAdmin-text">SETTINGS</p>
            <div className="sideAdmin-settings">
                <div className="sideAdmin_setting-items">
                    <FontAwesomeIcon icon={faUser} className="sideAdmin-icons"/>
                    <a href="/admin/users" className="sideAdmin_setting-label">Users</a>
                </div>
                <div className="sideAdmin_setting-items">
                    <FontAwesomeIcon icon={faRightFromBracket} className="sideAdmin-icons"/>
                    <a href="/admin" className="sideAdmin_setting-label">Logout</a>
                </div>
            </div>
        </div>
    )
}