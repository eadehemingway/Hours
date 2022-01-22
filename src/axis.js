const lines = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const moon_path = "M12,2.57A6.45,6.45,0,0,0,9.63,1.06,6.19,6.19,0,0,1,1.1,9.59,6.61,6.61,0,1,0,12,2.57Z";
const sun_path = "M7.46,0l.77,3.91L10.53.65l-.9,3.89,3.43-2-2.4,3.18,4-.47L11.14,7.15,15,8.33l-4,.35,3,2.63L10.21,10l1.68,3.63L9,10.91l.07,4L7.46,11.23,5.89,14.92l.06-4L3,13.64,4.71,10,.93,11.31l3-2.63L0,8.33,3.78,7.15.29,5.21l4,.47L1.85,2.5l3.43,2L4.39.65l2.3,3.26Z";
const icon_size = 15;

export function drawAxis(ctx) {
    
    let font = new FontFace('goudy-old-style', 'url(https://use.typekit.net/af/4d44c2/00000000000000007735a6eb/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3)');
    let start;
    const y_space_for_labels = 30;
    const x_space_for_labels = 10;
    const axis_width = 1000 - (x_space_for_labels * 2);
    const axis_height = 600;
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
    const short_line_length = long_line_length * 0.9;

    function drawLines(timestamp) {

        if (!start) start = timestamp;
        let time_elapsed = timestamp - start;
        let decimal_elapsed = time_elapsed / duration_total; // 0 start, 1 finish
    
        axis_lines.forEach((d, i) => {
            let delay = ((lines_count - i) * delay_per_line) / duration_total;
            let x = x1 + (hour_width * i);
            let midnight = i === 0 || i === lines_count;
            let midday = d.hour === 12 && !midnight;
            let line_length = midnight || midday ? long_line_length : short_line_length;
            let addition = line_length * Math.min(decimal_elapsed + delay, 1); // Add delay here

            ctx.beginPath();
            ctx.moveTo(x, y1);
            ctx.lineTo(x, y1 + addition);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";
            ctx.stroke();

            if ((decimal_elapsed + delay) >= 1 && !d.completed) {
                if (midday || midnight) {
                    ctx.save();
                    ctx.translate(x - (icon_size / 2), (y1 + addition) - (15 + (icon_size / 2)))
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
            ctx.font = '13px goudy-old-style';
            window.requestAnimationFrame(drawLines);
        }
    }
    
    font.load().then(window.requestAnimationFrame(drawLines));
}