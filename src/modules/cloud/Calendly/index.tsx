import React from "react"
import { InlineWidget } from "react-calendly";

const Calendly = () => {
  return (
    <div className="Calendly">
      <InlineWidget url="https://calendly.com/frostibuild/30min" />
    </div>
  );
};

export default Calendly;