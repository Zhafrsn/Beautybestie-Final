/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import NotFound from "../components/NotFound"
import { Sidebar } from 'components/Sidebar';

const _404: React.FC = () => {
    return (
        <>
            <Sidebar contentId="side-bar" isOpen={false} toggleSidebar={() => {}} />
            <div>
                <NotFound />
            </div>
        </>
    );
};

export default _404