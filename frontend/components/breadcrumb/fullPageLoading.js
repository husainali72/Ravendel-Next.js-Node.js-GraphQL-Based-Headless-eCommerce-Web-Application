import React from "react";

function LoadingSpinnerFull() {
    return (
        <>
            <div className="spinner-container" style={{ display: 'flex', 
                            justifyContent: 'center', backgroundColor: "transparent", opacity: 1, 
                            zIndex: "999", alignItems: "center",position: "absolute", 
                            top:'0',left:'0', right:'50',height: "100%", width: "100%" }}>
                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: "center"
                }}>
                    <div className="loading-spinner">
                    </div>
                </div>
                <h4 className="loading-text-full">Loading...</h4>
            </div>
        </>

    );
}
export default LoadingSpinnerFull;


