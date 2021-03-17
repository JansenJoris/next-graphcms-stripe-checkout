import { useEffect, useState } from "react";
import { connectRange } from "react-instantsearch-dom";

// Prerequisite: install rheostat@4
import "rheostat/initialize";
import Rheostat from "rheostat";
import "rheostat/css/rheostat.css";

function RangeSlider({ min, max, currentRefinement, canRefine, refine }) {
  const [stateMin, setStateMin] = useState(min);
  const [stateMax, setStateMax] = useState(max);

  useEffect(() => {
    if (canRefine) {
      setStateMin(currentRefinement.min);
      setStateMax(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  const onValuesUpdated = ({ values: [min, max] }) => {
    setStateMin(min);
    setStateMax(max);
  };

  return (
    <Rheostat
      min={min}
      max={max}
      values={[currentRefinement.min, currentRefinement.max]}
      onChange={onChange}
      onValuesUpdated={onValuesUpdated}
    >
      <div className="rheostat-marker rheostat-marker--large" style={{ left: 0 }}>
        <div className="rheostat-value">{stateMin}</div>
      </div>
      <div className="rheostat-marker rheostat-marker--large" style={{ right: 0 }}>
        <div className="rheostat-value">{stateMax}</div>
      </div>
    </Rheostat>
  );
}

const CustomRangeSlider = connectRange(RangeSlider);
export default CustomRangeSlider;
