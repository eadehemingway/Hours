import { section_colour } from "./shared_styles";
const lines = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const moon_path = "M12,2.57A6.45,6.45,0,0,0,9.63,1.06,6.19,6.19,0,0,1,1.1,9.59,6.61,6.61,0,1,0,12,2.57Z";
const sun_path = "M7.46,0l.77,3.91L10.53.65l-.9,3.89,3.43-2-2.4,3.18,4-.47L11.14,7.15,15,8.33l-4,.35,3,2.63L10.21,10l1.68,3.63L9,10.91l.07,4L7.46,11.23,5.89,14.92l.06-4L3,13.64,4.71,10,.93,11.31l3-2.63L0,8.33,3.78,7.15.29,5.21l4,.47L1.85,2.5l3.43,2L4.39.65l2.3,3.26Z";
const icon_size = 15;
const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function inQuad(n) {
    return n * n;
  };

  function inOutQuad(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n;
    return - 0.5 * (--n * (n - 2) - 1);
  };

  function inCube(n) {
    return n * n * n;
  };

  function outCube(n) {
    return --n * n * n + 1;
  };

  function inOutCube(n) {
    n *= 2;
    if (n < 1) return 0.5 * n * n * n;
    return 0.5 * ((n -= 2 ) * n * n + 2);
  };

  function inQuart(n) {
    return n * n * n * n;
  };

  function inQuint(n) {
    return n * n * n * n * n;
  }

  function outSine(n) {
    return Math.sin(n * Math.PI / 2);
  };

  function inOutSine(n) {
    return .5 * (1 - Math.cos(Math.PI * n));
  };

  function inExpo(n) {
    return 0 == n ? 0 : Math.pow(1024, n - 1);
  };

  function inOutExpo(n) {
    if (0 == n) return 0;
    if (1 == n) return 1;
    if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
    return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  };

  function inCirc(n) {
    return 1 - Math.sqrt(1 - n * n);
  };

  function outCirc(n) {
    return Math.sqrt(1 - (--n * n));
  };

  function inOutCirc(n) {
    n *= 2;
    if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
    return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
  };

  function degreesToRadians(deg) {
      return deg * (Math.PI / 180);
  }

  function radiansToDegrees(rad) {
      return rad * (180 / Math.PI);
  }

  function inOutBack(n){
    var s = 1.70158 * 1.525;
    if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
    return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
  };

  function outBounce(n){
    if ( n < ( 1 / 2.75 ) ) {
      return 7.5625 * n * n;
    } else if ( n < ( 2 / 2.75 ) ) {
      return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
    } else if ( n < ( 2.5 / 2.75 ) ) {
      return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
    } else {
      return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
    }
  };

  function inBounce(n){
    return 1 - outBounce(1 - n);
  };

  function inOutBounce(n){
    if (n < .5) return inBounce(n * 2) * .5;
    return outBounce(n * 2 - 1) * .5 + .5;
  };

  function drawCircle(ctx, x, y, radius, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x, y, radius, 2 * Math.PI, false);
    ctx.fill();
  }

  let colors = ["#A2E2FF","#55009B","#FF71C6","#009318","#FF0000","#010C70","#FFDA00","#FF860D"];

function getXY(r, angle) {
  return [r * Math.cos(degreesToRadians(angle)), r * Math.sin(degreesToRadians(angle))];
}

function drawTypography(ctx) {
  ctx.fillStyle = "#000000";

  const h = new Path2D();
  h.moveTo(-99.3347,18.9184);
  h.lineTo(-126.2489,18.9184 );
  h.lineTo(-126.2489,-114.6248);
  h.lineTo(-270.4179,-54.2103);
  h.lineTo(-270.4179,79.3329);
  h.lineTo(-297.3322,79.3329);
  h.lineTo(-297.3322,-177.5853);
  h.lineTo(-270.4179,-177.5853);
  h.lineTo(-270.4179,-76.3382);
  h.lineTo(-126.2489,-136.7526);
  h.lineTo(-126.2489,-114.6248);
  h.lineTo(-126.2489,-237.9997);
  h.lineTo(-99.3347,-237.9997);
  h.closePath();
  ctx.fill(h);

  const o = new Path2D();
  o.arc(0, 0, 62.345, 0, degreesToRadians(360));
  o.arc(0, 0, 28.271, 0, degreesToRadians(360));
  o.closePath();
  ctx.fill(o, "evenodd");

  const u = new Path2D();
  u.moveTo(89.9335, -45.6357);
  u.lineTo(89.767, -149.0488);
  u.lineTo(112.7446, -149.0488);
  u.lineTo(112.5779, -44.9698);
  u.bezierCurveTo(112.5779, -38.8055, 114.0764, -34.3135, 118.9052, -34.3135); // 118.9052, -34.3135
  u.bezierCurveTo(124.0832, -34.3135, 125.2322, -38.8055, 125.2322, -44.9698); // 125.2322, -44.9698;
  u.lineTo(125.2324, -149.0488);
  u.lineTo(148.2099, -149.0488);
  u.lineTo(148.2099, -45.6357);
  u.bezierCurveTo(148.0432, -25.3223, 137.4971, -14, 118.9052, -14); //118.9052, -34.3135
  u.bezierCurveTo(100.313, -14, 89.9333, -25.3223, 89.9335, -45.6357); //89.9335, -45.6357
  u.closePath();
  ctx.fill(u);

  const r = new Path2D();
  r.moveTo(179.0879, 0);
  r.lineTo(179.0879, 79.3331);
  r.lineTo(197.1078, 79.3331);
  r.lineTo(197.1078, 52.3597);
  r.lineTo(275.2858, 52.3597);
  r.lineTo(295.6854, 119.0517);
  r.lineTo(317.332, 119.0517);
  r.lineTo(295.2321, 51.1135);
  r.bezierCurveTo(307.593, 48.2612, 317.3318, 40.3326, 317.332, 26.1798); //bezier
  r.bezierCurveTo(317.3318, 8.122, 301.5755, 0, 283.3323, 0); //bezier
  r.closePath();
  r.moveTo(197.1078, 15.1866);
  r.lineTo(197.1078, 37.3998);
  r.lineTo(282.3125, 37.3997);
  r.bezierCurveTo(294.6976, 37.3997, 298.8586, 33.2952, 298.8588, 26.2936); // bezier
  r.bezierCurveTo(298.8588, 18.5428, 293.6293, 15.1866, 282.3125, 15.1866); // bezier
  r.closePath();
  ctx.fill(r, "evenodd");

  const s = new Path2D();
  s.moveTo(97.8591, 126.3132);
  s.lineTo(91.6859, 133.6273);
  s.bezierCurveTo(98.8659, 139.7342, 108.5284, 143.0891, 120.4057, 143.0891); //bezier
  s.bezierCurveTo(137.047, 143.0891, 145.8374, 136.6476, 145.8374, 127.387); //bezier
  s.bezierCurveTo(145.8374, 117.0534, 135.3026 , 113.8998, 120.3387, 112.6918); //bezier
  s.bezierCurveTo(111.0114, 111.9533, 104.3009, 111.5509, 104.3009, 107.5246); //bezier
  s.bezierCurveTo(104.3007, 103.23, 112.0847, 102.0891, 118.4596, 102.1562); //bezier
  s.bezierCurveTo(126.1092, 102.2232, 132.4841, 103.8344, 137.651, 107.7929); //bezier
  s.lineTo(143.556, 100.3446);
  s.bezierCurveTo(137.5838, 95.7148, 128.7264, 93.1647, 118.4596, 93.1647); //bezier
  s.bezierCurveTo(103.9654, 93.1647, 93.4973, 98.5331, 93.4975, 108.3302); //bezier
  s.bezierCurveTo(93.4975, 118.3956, 105.9786, 121.348, 119.3994, 122.4889); //bezier
  s.bezierCurveTo(130.2028, 123.4278, 135.0339, 124.5017, 135.0339, 128.3938); //bezier
  s.bezierCurveTo(135.0337, 132.2852, 130.2026, 134.0976, 120.674, 134.0976); //bezier
  s.bezierCurveTo(111.0783, 134.0976, 103.6301, 131.6145, 97.8591, 126.3132); //bezier
  s.closePath();
  ctx.fill(s);
}

function drawSquares(ctx, colors) {
  let size = 80;
  let squares = [
    { x: 0, y: -size * 3, color: colors[0] },
    { x: size * 3, y: -size * 2, color: colors[1] },
    { x: size, y: 0, color: colors[2] },
    { x: size * 2, y: size * 2, color: colors[3] },
    { x: -size, y: size, color: colors[4] },
    { x: -size * 3, y: size * 2, color: colors[5] },
    { x: -size * 4, y: 0, color: colors[6] },
    { x: -size, y: -size * 2, color: colors[7] },
  ];

  ctx.save();

  squares.forEach(d => {
    ctx.fillStyle = d.color;
    ctx.fillRect(d.x, d.y, size, size);
  });

  ctx.restore();
}

export function drawClock(ctx, width, height, x, y) {
    if (!width || !height || isNaN(x) || isNaN(y)) {
        console.warn("Clock not drawn");
        return;
    }

    // Draw frame
    let frame_outer = 20;
    let frame_inner = 50;
    let frames = frame_outer + frame_inner;
    ctx.fillStyle = section_colour;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(frame_outer, frame_outer, width - (frame_outer * 2), height - (frame_outer * 2));
    ctx.fillStyle = section_colour;
    ctx.fillRect(frames, frames, width - (frames * 2), height - (frames * 2));


    let clock_radius = 300;
    let angle_per_marker = 360 / hours.length;
    let angles = hours.map((d, i) => angle_per_marker * i);
    let tick_length = 20;
    let centre = { x: width / 2, y: height / 2 };
    let start;
    let square_colors = [...colors];
    let prev_ticked = -1;


    // drawCircle(ctx, centre.x, centre.y, clock_radius, "rgba(0,0,0,0)");
    // ctx.strokeStyle = "black";
    // ctx.stroke();

    const duration_per_tick = 1000; // milliseconds;

    function tickHours(timestamp) {
      if (!start) start = timestamp;
      let time_elapsed = timestamp - start;
      let tick_progress = time_elapsed / duration_per_tick;
      let ticked = Math.floor(tick_progress);
      tick_progress -= ticked;
      ctx.fillRect(frames, frames, width - (frames * 2), height - (frames * 2));

      if (ticked > prev_ticked) {
        let pop = square_colors.pop();
        square_colors.unshift(pop);
      }

      angles.forEach(d => {
          let [inner_x, inner_y] = getXY(clock_radius, d);
          let [outer_x, outer_y] = getXY(clock_radius + tick_length, d);
          ctx.save();
          ctx.translate(centre.x, centre.y);
          drawSquares(ctx, square_colors);
          drawTypography(ctx);
          ctx.rotate(degreesToRadians(angle_per_marker * inOutBack(tick_progress)));
          ctx.beginPath();
          ctx.moveTo(inner_x, inner_y);
          ctx.lineTo(outer_x, outer_y);
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
      });

      prev_ticked = ticked;

      window.requestAnimationFrame(tickHours);
    }

  window.requestAnimationFrame(tickHours);



    let tr = true;
    if (tr) return;

    let font = new FontFace('goudy-old-style', 'url(https://use.typekit.net/af/4d44c2/00000000000000007735a6eb/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)');
    // let start;
    const y_space_for_labels = 30;
    let axis_lines = width <= 400 ? lines.filter((d, i) => i % 2 == 0) : lines;

    const line_variation = 40;
    const y1 = y + height;
    const y2 = y - line_variation;
    const x1 = x;
    const long_line_length = (y2 - y1);
    const short_line_length = long_line_length + line_variation;

    const lines_count = axis_lines.length;
    const duration_per_line = 2000;
    const delay_per_line = 100;
    const duration_total = duration_per_line + (delay_per_line * lines_count);
    const hour_width = width / (lines_count - 1);

    axis_lines = axis_lines.map(function(d, i){
      let midnight = i === 0 || i === (lines_count - 1);
      let midday = d === 12 && !midnight;
      let line_length = midnight || midday ? long_line_length : short_line_length;
      let icon_path = null;
      if (midnight) icon_path = moon_path;
      if (midday) icon_path = sun_path;

      return ({
        hour: d,
        completed: false,
        start_time: ((delay_per_line * i) / duration_total),
        end_time: (((delay_per_line * i) + duration_per_line) / duration_total),
        length: line_length,
        x1: x + (hour_width * i),
        icon_path: icon_path,
      });
    });

    function drawVerticals(timestamp) {

        if (!start) start = timestamp;
        let time_elapsed = timestamp - start;
        let progress_total = outSine(time_elapsed / duration_total); // 0 start, 1 finish

        axis_lines.forEach((d, i) => {
          let duration = d.end_time - d.start_time;
          d.progress = (progress_total - d.start_time) / duration; // 0 start, 1 finish
          if (d.progress >= 0 && d.progress <= 1) {
            ctx.beginPath();
            ctx.moveTo(d.x1, y1 + (d.prev_progress) * d.length);
            ctx.lineTo(d.x1, y1 + (d.progress) * d.length);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(0, 0, 0, ${Math.max(0.3, Math.min(0.5, Math.random()))})`;
            ctx.stroke();
          }
          d.prev_progress = d.progress;

          if (d.progress >= 1 && !d.completed) {
            if (d.icon_path) {
                ctx.save();
                ctx.translate(d.x1 - (icon_size / 2), (y1 + d.length) - (icon_size * 1.5));
                const icon = new Path2D(d.icon_path);
                ctx.fill(icon);
                ctx.restore();
            } else {
                ctx.textAlign = "center";
                ctx.fillText(d.hour, d.x1, (y1 + d.length) - 10);
            }
            d.completed = true;
          }
        });

        // let decimal_elapsed = (Math.min(time_elapsed / duration_total, 1)); // 0 start, 1 finish
        // let x = x1 + (hour_width * i);
        // let addition = line_length * decimal_elapsed;
        // let prev_addition = line_length * prev_decimal_elapsed;
      // });

        if (time_elapsed < duration_total) {
          ctx.font = '16px';
          window.requestAnimationFrame(drawVerticals);
        }
    }

    font.load().then(window.requestAnimationFrame(drawVerticals));
}