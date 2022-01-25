
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader, SectionInner } from "../shared_styles";
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
import { section_colour } from "../shared_styles";


export  function FinalViz({ week_data, category_palette, colors }) {
    week_data = dummy_week_data; // for dev
    category_palette = dummy_categories; // for dev

    const [main_data, setMainData] = useState();
    const [accumulation_data, setAccumulationData] = useState(); // we can use to do accu
    const $canvas = useRef(null);
    const navigate = useNavigate();
    const handleBack = () => navigate(ROUTES.INPUT_HOURS);

    const img_sources = [grain_2, grain_3, grain_4, grain_5, grain_6, grain_7, grain_8, grain_9];
    let imgs = [];

    const section_padding = 100;
    const canvas_width = document.body.clientWidth;
    const square_size = (canvas_width - (section_padding * 2)) / 24;
    const canvas_height = window.innerHeight;
    const axis_height = square_size * 7;
    const axis_width = canvas_width - (section_padding * 2);
    const axis_left = section_padding;
    const axis_top = canvas_height - (section_padding + axis_height);


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
        ctx.scale(2, 2);
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        ctx.fillStyle = section_colour;
        ctx.fillRect(0, 0, canvas_width, canvas_height);
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
                    drawAxis(ctx, axis_width, axis_height, axis_left, axis_top);
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
        return `${colors[index]} ${block_opacity})`;
    }

    function getRandomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function drawBlock(ctx, x, y, color){

        const img_source_index = getRandomBetween(0, img_sources.length - 1);
        const rotations = [0, 90, 180, 270];
        const rotation_index = getRandomBetween(0, rotations.length);

        x = x + section_padding;
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
    }

    function drawRow(ctx, day_index, day_data){
        let aggregate = day_data.aggregate;
        for (const hour in aggregate) {
            let opacity = Math.max(0.8, Math.random());
            drawBlock(ctx, hour * square_size, (day_index * square_size) + axis_top, getColor(aggregate[hour], opacity));
        }
    }


    return (
        <Section>
            <SectionInner>
            <Nav
                show_back={true}
                show_next={false}
                handleBack={handleBack}
            />

            <SectionHeader>HOURS</SectionHeader>
            {week_data && <canvas ref={$canvas}
                id="myCanvas"
                width={canvas_width * 2}
                height={canvas_height * 2}
                style={{
                    width: `${canvas_width}px`,
                    height: `${canvas_height}px`,
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    zIndex: "0"
                }}
            ></canvas>}
            <DownloadButton onClick={download}>Download</DownloadButton>
            </SectionInner>
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