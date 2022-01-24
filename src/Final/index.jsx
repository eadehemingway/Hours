
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader } from "../shared_styles";
import { dummy_week_data, dummy_categories } from "../data";
import { drawAxis } from "../axis";
import grain_2 from "../wood_grain-02.jpg";
import grain_3 from "../wood_grain-03.jpg";
import grain_4 from "../wood_grain-04.jpg";
import grain_5 from "../wood_grain-05.jpg";
import grain_6 from "../wood_grain-06.jpg";
import grain_7 from "../wood_grain-07.jpg";
import grain_8 from "../wood_grain-08.jpg";
import grain_9 from "../wood_grain-09.jpg";
import { Nav } from "../Nav";
import { ROUTES } from "../App";


export  function FinalViz({ week_data, category_palette }) {
    week_data = dummy_week_data; // for dev
    category_palette = dummy_categories; // for dev

    const [main_data, setMainData] = useState();
    const [accumulation_data, setAccumulationData] = useState(); // we can use to do accu
    const $canvas = useRef(null);
    const navigate = useNavigate();
    const handleBack = () => navigate(ROUTES.INPUT_HOURS);

    const window_width = document.body.clientWidth;
    const window_height = window.innerHeight;
    const img_sources = [grain_2, grain_3, grain_4, grain_5, grain_6, grain_7, grain_8, grain_9];
    let imgs = [];
    const chart_margin_left = 300;
    const chart_margin_top = 200;
    const square_size = (window_width - (chart_margin_left * 2)) / 24;


    useEffect(()=>{
        if (!week_data) return;
        const aggregate_data = week_data.map(d=> d.aggregate);
        setMainData(aggregate_data);

        const aggregates_values = aggregate_data.map(d=> Object.values(d)).flat();
        let acc_data = [];
        category_palette.forEach(c=> {
            let indices = [];
            let idx = aggregates_values.indexOf(c.category);
            while (idx !== -1) {
                indices.push(idx);
                idx = aggregates_values.indexOf(c.category, idx + 1);
            }
            const cat_accumulation = { label: c.category, total: indices.length };
            acc_data.push(cat_accumulation);
        });
        setAccumulationData(acc_data); // this data can be used to plot accumulative bars...

    },[week_data, category_palette]);

    useEffect(()=>{
        if (!$canvas.current) return;
        if (!week_data) return;
        const ctx = $canvas.current.getContext("2d");
        ctx.clearRect(0, 0, window_width, window_height);
        ctx.scale(2, 2);
        let img_load_count = 0;
        let img_count = img_sources.length;

        for (let i = 0; i < img_count; i++) {
            let img = new Image();
            img.onload = function() {
                img_load_count++;
                imgs.push(img);
                if (img_load_count == img_count) {
                    week_data.forEach((day_data, day_index)=>{
                        drawRow(ctx, day_index, day_data);
                    });
                }
            };
            img.src = img_sources[i];
        }
    }, [week_data]);

    function download(){
        var canvas = $canvas.current;
        var url = canvas.toDataURL("image/png");
        var link = document.createElement("a");
        link.download = "filename.png";
        link.href = url;
        link.click();
    }


    function getColor(category, opacity){
        let block_opacity = opacity || 1;
        let categories = category_palette.map(d => d.category);
        const index = categories.findIndex(c => c == category);
        console.log('index:', index);
        const colors = [
            `rgba(29,7,126,${block_opacity})`, // Blue: CIE 15 Lightness
            `rgba(220,60,7,${block_opacity})`, // Red: CIE 50 Lightness
            `rgba(252,206,106,${block_opacity})`, // Yellow: CIE 85 Lightness
            `rgba(7,77,101,${block_opacity})`, // Dark Green: CIE 30 Lightness
            `rgba(250,220,217,${block_opacity})`, // Pink: CIE 90 Lightness
            `rgba(107,79,160,${block_opacity})`, // Purple: CIE 40 Lightness
            `rgba(49,164,108,${block_opacity})`, // Green: 60 CIE Lightness
            `rgba(254,143,6,${block_opacity})`, // Orange: 70 CIE Lightness
        ];
        return colors[index];
    }

    function getRandomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function drawBlock(ctx, x, y, color){

        const img_source_index = getRandomBetween(0, img_sources.length - 1);
        const rotations = [0, 90, 180, 270];
        const rotation_index = getRandomBetween(0, rotations.length);

        x = x + chart_margin_left;
        y = y + 0;
        let half_square = square_size / 2;
        ctx.save();
        ctx.translate(x + half_square, y + half_square);
        ctx.rotate(rotations[rotation_index] * Math.PI / 180);
        ctx.translate(-(x + half_square), -(y + half_square));
        ctx.drawImage(imgs[img_source_index], x, y, square_size, square_size);
        ctx.globalCompositeOperation = "hard-light"; // xor quite nice for faded blocks
        ctx.fillStyle = color;
        ctx.fillRect(x, y, square_size, square_size);
        ctx.restore();
        drawAxis(ctx, window_width - (chart_margin_left * 2), window_height - (chart_margin_top * 2), chart_margin_left, chart_margin_top);
    }

    function drawRow(ctx, day_index, day_data){
        let aggregate = day_data.aggregate;
        for (const hour in aggregate) {
            let opacity = Math.max(0.8, Math.random());
            drawBlock(ctx, hour * square_size, (day_index * square_size) + (chart_margin_top + 200), getColor(aggregate[hour], opacity));
        }
    }


    return (
        <Section>
            <Nav
                show_back={true}
                show_next={false}
                handleBack={handleBack}
            />

            <SectionHeader>HOURS</SectionHeader>
            {week_data && <canvas ref={$canvas}
                id="myCanvas"
                width={window_width * 2}
                height={window_height * 2}
                style={{
                    width: `${window_width}px`,
                    height: `${window_height}px`,
                    position: "absolute",
                    bottom: "40px",
                    left: "0px"
                }}
            ></canvas>}
            <DownloadButton onClick={download}>Download</DownloadButton>
        </Section>
    );
}

const DownloadButton = styled.button`
position: relative;
  border: 1px solid;
  padding: 20px;
  background: transparent;
  cursor: pointer;
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 5px;
  margin: auto;
  display: block;
`;