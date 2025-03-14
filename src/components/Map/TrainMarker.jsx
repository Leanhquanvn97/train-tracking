import React from "react";
import { OverlayView } from "@react-google-maps/api";

const TrainMarker = ({train, setSelectedTrain}) => {
    return (
        <OverlayView
            position={train.position}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
            <div className="bg-white w-min rounded border whitespace-nowrap p-1 rounded-tl-none"
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
