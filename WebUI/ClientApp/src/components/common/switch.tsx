import * as React from "react";

export interface ISwitchProps {
  className?: string;
}

const Switch = ({ className }: ISwitchProps) => {
  return (
    <div className="form-check form-switch text-right">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        Dark theme
      </label>
    </div>
  );
};

export default Switch;
