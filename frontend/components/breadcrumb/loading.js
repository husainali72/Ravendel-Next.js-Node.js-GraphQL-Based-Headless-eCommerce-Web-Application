import React from "react";

function LoadingSpinner() {
    return (
        <>
            <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', backgroundColor: "black", opacity: 0.7, zIndex: "999", alignItems: "center", position: "fixed", height: "100vh", width: "100vw", top: 0 }}>
                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: "center"
                }}>
                    <div className="loading-spinner">
                    </div>
                </div>
                <h4 className="loading-text">Loading...</h4>
            </div>
        </>

    );
}
export default LoadingSpinner;


