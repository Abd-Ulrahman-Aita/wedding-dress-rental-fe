import React from 'react';
import DressList from '../components/DressList';

const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            {/* <h1>Available Wedding Dresses</h1> */}
            <DressList />
        </div>
    );
};

export default HomePage;