import React, { useState } from "react";


export  function HourLabels({ index}) {

  return (
          <div
            className="text-center text-xs text-red-900 pb-2 border-r border-l mt-4"
          >
            {index % 12 ? index % 12 : 12}
            <span className="text-xs">{index > 11 ? "pm" : "am"}</span>
          </div>

  );
}
