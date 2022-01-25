const lines = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const moon_path = "M12,2.57A6.45,6.45,0,0,0,9.63,1.06,6.19,6.19,0,0,1,1.1,9.59,6.61,6.61,0,1,0,12,2.57Z";
const sun_path = "M7.46,0l.77,3.91L10.53.65l-.9,3.89,3.43-2-2.4,3.18,4-.47L11.14,7.15,15,8.33l-4,.35,3,2.63L10.21,10l1.68,3.63L9,10.91l.07,4L7.46,11.23,5.89,14.92l.06-4L3,13.64,4.71,10,.93,11.31l3-2.63L0,8.33,3.78,7.15.29,5.21l4,.47L1.85,2.5l3.43,2L4.39.65l2.3,3.26Z";
const icon_size = 15;

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


  function drawCircle(ctx, x, y, radius, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(x, y, radius, 2 * Math.PI, false);
    ctx.fill();
  }

export function drawAxis(ctx, width, height, x, y) {
    if (!width || !height || isNaN(x) || isNaN(y)) {
        console.warn("Axis not drawn");
        return;
    }

    ctx.fillStyle = "#000000";
    let font = new FontFace('goudy-old-style', 'url(https://use.typekit.net/af/4d44c2/00000000000000007735a6eb/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)');
    let start;
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