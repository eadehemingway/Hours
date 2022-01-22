const lines = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const moon_path = "M23.92,5.13a13.07,13.07,0,0,0-4.66-3,12.36,12.36,0,0,1-17,17.05,13.22,13.22,0,1,0,21.71-14Z";
const sun_path = "M14.92,0l1.54,7.82L21.05,1.3,19.27,9.08,26.13,5l-4.8,6.37,7.93-.94-7,3.87,7.64,2.37-8,.69,6,5.27L20.42,20l3.36,7.26-5.85-5.45.12,8-3.13-7.37-3.14,7.37.13-8L6.05,27.28,9.42,20l-7.56,2.6,6-5.27-8-.69,7.64-2.37-7-3.87,7.94.94L3.71,5l6.86,4.09L8.78,1.3l4.6,6.52Z";
const icon_size = 30;

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


export function drawAxis(ctx, width, height) {
    let font = new FontFace('goudy-old-style', 'url(https://use.typekit.net/af/4d44c2/00000000000000007735a6eb/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)');
    let start;
    const y_space_for_labels = 60;
    const x_space_for_labels = 20;
    const axis_width = width - (x_space_for_labels * 2);
    const axis_height = height;
    let axis_lines = axis_width <= 400 ? lines.filter((d, i) => i % 2 == 0) : lines;
    axis_lines = axis_lines.map(d => ({ hour: d, completed: false }));
    const lines_count = (axis_lines.length - 1);
    const hour_width = axis_width / lines_count;

    const delay_per_line = 50;
    const duration_per_line = 600;
    const delay_total = (delay_per_line * lines_count);
    const duration_total = duration_per_line + delay_total;

    const y1 = axis_height;
    const y2 = 0 + y_space_for_labels;
    const x1 = x_space_for_labels;
    const long_line_length = (y2 - y1);
    const short_line_length = long_line_length * 0.95;

    function drawLines(timestamp) {

        if (!start) start = timestamp;
        let time_elapsed = timestamp - start;

        axis_lines.forEach((d, i) => {
            if (d.completed) return;
            let delay = ((lines_count - i) * delay_per_line) / duration_total;
            let decimal_elapsed = inQuad(Math.min(time_elapsed / duration_total + delay, 1)); // 0 start, 1 finish
            let x = x1 + (hour_width * i);
            let midnight = i === 0 || i === lines_count;
            let midday = d.hour === 12 && !midnight;
            let line_length = midnight || midday ? long_line_length : short_line_length;
            let addition = line_length * decimal_elapsed;

            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y1 + addition);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            if (decimal_elapsed >= 1 && !d.completed) {
                if (midday || midnight) {
                    ctx.save();
                    ctx.translate(x - (icon_size / 2), (y1 + addition) - (30 + (icon_size / 2)));
                    const icon = new Path2D(midday ? sun_path : moon_path);
                    ctx.fill(icon);
                    ctx.restore();
                } else {
                    ctx.textAlign = "center";
                    ctx.fillText(d.hour, x, (y1 + addition) - 10);
                }
                d.completed = true;
            }
        });

        if (time_elapsed < duration_total) {
            ctx.font = '26px goudy-old-style';
            window.requestAnimationFrame(drawLines);
        }
    }

    font.load().then(window.requestAnimationFrame(drawLines));
}