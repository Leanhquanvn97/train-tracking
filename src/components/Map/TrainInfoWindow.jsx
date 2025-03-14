import React from "react";
import { InfoWindow } from "@react-google-maps/api";

const TrainInfoWindow = ({ selectedTrain, setSelectedTrain }) => {
    return (
        <InfoWindow
            position={selectedTrain.position}
            onCloseClick={() => setSelectedTrain(null)}
        >
            <div className="text-left leading-relaxed">
                <h3 className="font-bold">{selectedTrain.trainNumber}</h3>
                <p>City: {selectedTrain.city}</p>
                <p>Status: {selectedTrain.delay}</p>
                <p>Start: {selectedTrain.start}</p>
                <p>Destination: {selectedTrain.destination}</p>
            </div>
        </InfoWindow>
    )
};

export default React.memo(TrainInfoWindow);
