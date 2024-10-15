import React from 'react';

interface CompassProps {
    direction: number; // Direction in degrees (0 to 360)
}

const Compass: React.FC<CompassProps> = ({ direction }) => {
    // Style to rotate the compass arrow based on direction
    const rotateStyle = {
        transform: `rotate(${direction}deg)`,
    };

    return (
            <div className="absolute bg-black bg-opacity-60 h-12 w-12 p-10 m-2 right-0 rounded-2xl flex items-center justify-center ">
                <div
                    className="compass-arrow w-1 h-10 bg-red-700 rounded-full absolute bottom-0 transform-origin-bottom"
                    style={rotateStyle}
                ></div>
                <div className="p-5 text-white font-bold absolute w-full h-full flex items-center justify-center">
                    <span className="absolute top-0 p-1.5">N</span>
                    <span className="absolute right-0 p-1.5">E</span>
                    <span className="absolute bottom-0 p-1.5">S</span>
                    <span className="absolute left-0 p-1.5">W</span>
                </div>
            </div>
    );
}

export default Compass;
