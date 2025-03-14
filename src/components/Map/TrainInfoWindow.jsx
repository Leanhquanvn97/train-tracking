import React from "react";
import { InfoWindow } from "@react-google-maps/api";

const TrainInfoWindow = ({ selectedTrain, setSelectedTrain }) => {
    return (
        <InfoWindow
            position={selectedTrain.position}
            onCloseClick={() => setSelectedTrain(null)}
        >
            <div>
                <h3>{selectedTrain.trainNumber}</h3>
                <p>City: {selectedTrain.city}</p>
                <p>Status: {selectedTrain.delay}</p>
            </div>
        </InfoWindow>
    )
};

export default React.memo(TrainInfoWindow);
