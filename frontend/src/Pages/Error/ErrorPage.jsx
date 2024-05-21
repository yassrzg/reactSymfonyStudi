import React from 'react';
import { Messages } from 'primereact/messages';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';

const ErrorPage = () => {

    return (
        <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100vh' }}>
            <div className="p-text-center">
                <h2>Page Not Found</h2>
                <Messages severity="error" content="The requested page could not be found." />
                <Link to="/" className="p-button p-button-text p-mt-3"><Button>Back to Home</Button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;
