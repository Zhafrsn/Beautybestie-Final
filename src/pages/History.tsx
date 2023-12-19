import React from 'react';
import Historypage from "../components/History";
import {MainLayout} from "../layout";
import ProfileComp from 'components/Profile/ProfileComp';
import '../styles/History.css';

const History: React.FC = () => {
    return (
        <MainLayout>
            <div className='HistoryPage'>
                <ProfileComp/>
                <Historypage/>
            </div>
        </MainLayout>
        );
};

export default History;
