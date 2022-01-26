import React, { useEffect, useState } from "react";

import "rc-slider/assets/index.css";
import { RangeProps } from "rc-slider";
//@ts-ignore
import s from "./SuperRange.module.scss";

const Slider = require("rc-slider");

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

type DoubleRangePropsType = RangeProps;

export const SuperRange = (props: DoubleRangePropsType) => {
  const { min, max, ...restProps } = props;
  const [value, setValue] = useState([0, 0]);
  useEffect(() => {
    if (
      min !== undefined &&
      max !== undefined &&
      min !== null &&
      max !== null
    ) {
      setValue([min, max]);
    }
  }, [min, max]);

  return (
    <div className={s.range}>
      <div className={s.range__box}>
        <span className={s.range__spanMin}>{min}</span>
        <span className={s.range__spanMax}>{max}</span>
      </div>

      <Range
        handleStyle={[{ backgroundColor: "#21268F" }]}
        trackStyle={[{ backgroundColor: "#21268F" }]}
        className={s.range__input}
        min={min}
        max={max}
        defaultValue={value}
        {...restProps}
      />
    </div>
  );
};
