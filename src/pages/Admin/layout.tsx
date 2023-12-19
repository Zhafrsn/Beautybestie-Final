import React from "react";
import NavbarAdmin from "./Components/Navbar"
import { Sidebar } from "./Components/Sidebar"

interface LayoutProps {
    children: React.ReactNode;
  }

export const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            <Sidebar username={""}/>
            <NavbarAdmin username={""}/>
            <div>
                {children}
            </div>
        </div>
    )
}