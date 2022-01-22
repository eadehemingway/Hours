import React, { useState } from "react";
import cs from "classnames";
import { fillHours, emptyHours, FILLED, UNFILLED, HOURS_ARR } from "./hours";
import { HourLabels } from './HourLabels'
import { Aggregate } from "./Aggregate";
import { Row } from "./Row";


export default function Day({ day_data, day_index, updateDay}) {
  const [isDragging, setIsDragging] = useState(false);
  const [pending_from, setPendingFrom] = useState(undefined);
  const [pending_to, setPendingTo] = useState(undefined);

  function startDragging({ category, hour }) {
    setIsDragging(true);
    setPendingFrom({ category, hour });
    setPendingTo({ category, hour: hour + 1 });
  }

  function onDraggedOver({ category, hour }) {
    if (!isDragging) return;
    setPendingTo({ category, hour });
  }

  function endDragging(to) {
    if (!isDragging) return;
    setIsDragging(false);

    let isAdding = false;
    let fromHour = to.hour > pending_from.hour ? pending_from.hour : to.hour - 1;
    let toHour = to.hour > pending_from.hour ? to.hour : pending_from.hour + 1;

    for (let play = fromHour; play < toHour; play++) {
      const cat = day_data.categories.find((c) => c.name === pending_from.category);
      if (cat[play] === UNFILLED) {
        isAdding = true;
        break;
      }
    }

    const fillOrEmptyHours = isAdding ? fillHours : emptyHours;

    const updated = fillOrEmptyHours(day_data, {
      category: pending_from.category,
      from: fromHour,
      to: toHour,
    });
    updateDay(day_index, updated);
    setPendingFrom(undefined);
    setPendingTo(undefined);
  }

  function isPending(category_name, hour) {
    if (!pending_from || !pending_to) return false;

    let fromHour =
      pending_to.hour > pending_from.hour ? pending_from.hour : pending_to.hour - 1;
    let toHour =
      pending_to.hour > pending_from.hour ? pending_to.hour : pending_from.hour + 1;

    return (
      pending_from?.category === category_name &&
      hour >= fromHour &&
      hour < toHour
    );
  }


  return (
    <div>
      <div className="grid grid-cols-[auto,repeat(24,_minmax(0,_1fr))]">
        <div />
        {HOURS_ARR.map((_, i) => <HourLabels key={i} index={i}/>)}

        {day_data.categories.map((cat, i) => ( <Row
               cat={cat}
               key={i}
               startDragging={startDragging}
               onDraggedOver={onDraggedOver}
               endDragging={endDragging}
               isPending={isPending}
        /> ))}

        <div />
        {HOURS_ARR.map((_, i) => <Aggregate key={i}  ag_data={day_data.aggregate[i]}/>)}
      </div>
    </div>
  );
}
