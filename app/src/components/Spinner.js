import React from 'react';
import { Spinner as BootstrapSpinner } from 'reactstrap';

const Spinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <BootstrapSpinner color="primary" />
    </div>
);

export default Spinner;
