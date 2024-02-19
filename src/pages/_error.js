import React from 'react';

const ErrorPage = ({ statusCode }) => {
    return (
        <div>
            <h1>
                {statusCode
                    ? `An error ${this.props.statusCode} occurred on server`
                    : 'An error occurred on client'}
            </h1>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
};

export default ErrorPage;
