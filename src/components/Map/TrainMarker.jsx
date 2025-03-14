import React from "react";
import { OverlayView } from "@react-google-maps/api";

const TrainMarker = ({train, setSelectedTrain}) => {
    const calculateRed = (delay) => {
        switch (delay) {
            case "5":
                return "bg-red-50";
            case "10":
                return "bg-red-100";
            case "15":
                return "bg-red-200";
            case "20":
                return "bg-red-300";
            default:
                return "bg-red-400";
        }
    };
    const color = train.delay.includes("delay") ? calculateRed(train.delay.split(' ')[0]) : "bg-green-500";

    return (
        <OverlayView
            position={train.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div className={`w-min rounded border whitespace-nowrap p-1 rounded-tl-none ${color}`}
                onClick={() => setSelectedTrain(train)}
            >
                <span className="font-bold">{train.trainNumber}</span><br/>
                {train.city}<br/>
                {train.delay}
            </div>
        </OverlayView>
    )
}

export default React.memo(TrainMarker);
