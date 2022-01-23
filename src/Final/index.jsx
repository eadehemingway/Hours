
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeader } from "../shared_styles";
import { dummy_categories } from "../data";
import { drawAxis } from "../axis";
import grain_2 from '../wood_grain-02.jpg';
import grain_3 from '../wood_grain-03.jpg';
import grain_4 from '../wood_grain-04.jpg';
import grain_5 from '../wood_grain-05.jpg';
import grain_6 from '../wood_grain-06.jpg';
import grain_7 from '../wood_grain-07.jpg';
import grain_8 from '../wood_grain-08.jpg';
import grain_9 from '../wood_grain-09.jpg';

export  function FinalViz({ week_data, category_palette }) {

    // week_data=dummy_week_data; // for dev
    // category_palette = dummy_categories; // for dev


    const [main_data, setMainData] = useState();
    const [accumulation_data, setAccumulationData] = useState(); // we can use to do accu
    const $canvas = useRef(null);
    const window_width = document.body.clientWidth;
    const window_height = window.innerHeight;
    const img_sources = [grain_2, grain_3, grain_4, grain_5, grain_6, grain_7, grain_8, grain_9];
    let imgs = [];
    const square_size = ((window_width * 2) - 160) / 24;
    const left_padding = 80;
    const top_padding = 200;


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
        if (!$canvas) return;
        if (!main_data) return;
        const ctx = $canvas.current.getContext("2d");
        ctx.clearRect(0, 0, window_width, window_height);

        let img_load_count = 0;
        let img_count = img_sources.length;

        for (let i = 0; i < img_count; i++) {
            let img = new Image();
            img.onload = function() {
                img_load_count++;
                imgs.push(img);
                if (img_load_count == img_count) {
                    main_data.forEach((day_data, day_index)=>{
                        drawRow(ctx, day_index, day_data);
                    });
                }
            };
            img.src = img_sources[i];
        }
    }, [main_data]);

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
        const index = dummy_categories.findIndex(c=> c == category);
        const colors = [
            `rgba(12, 45, 100, ${block_opacity})`,
            `rgba(200, 45, 100, ${block_opacity})`,
            `rgba(100, 45, 100, ${block_opacity})`,
            `rgba(12, 45, 100, ${block_opacity})`,
            `rgba(12, 45, 100, ${block_opacity})`,
            `rgba(12, 45, 100, ${block_opacity})`,
            `rgba(12, 45, 100, ${block_opacity})`,
            `rgba(12, 45, 100, ${block_opacity})`
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

        x = x + left_padding;
        y = y + top_padding;
        let half_square = square_size / 2;
        ctx.save();
        ctx.translate(x + half_square, y + half_square);
        ctx.rotate(rotations[rotation_index] * Math.PI / 180);
        ctx.translate(-(x + half_square), -(y + half_square));
        ctx.drawImage(imgs[img_source_index], x, y, square_size, square_size);
        ctx.fillStyle = color;
        ctx.globalCompositeOperation = "hard-light"; // xor quite nice for faded blocks, hard-light
        ctx.fillRect(x, y, square_size, square_size);
        // ctx.globalCompositeOperation = "normal";
        // ctx.fillRect(x, y, square_size, square_size);
        ctx.restore();
        drawAxis(ctx, (window_width * 2) - 160, window_height * 1.2, 80, 0);
    }

    function drawRow(ctx, day_index, day_data){
        for (const hour in day_data) {
            let opacity = Math.max(0.8, Math.random());
            drawBlock(ctx, hour * square_size, day_index * square_size, getColor(day_data[hour], opacity));
        }
    }


    return (
        <Section>
            <SectionHeader>HOURS</SectionHeader>
            <canvas ref={$canvas}
                id="myCanvas"
                width={window_width * 2}
                height={window_height * 1.2}
                style={{
                    width: `${window_width}px`,
                    height: `${window_height * 0.6}px`,
                    position: "absolute",
                    bottom: "40px",
                    left: "0px"
                }}
            ></canvas>
            <DownloadButton onClick={download}>Download!</DownloadButton>
        </Section>
    );
}

const DownloadButton = styled.button`
font-size: 5rem;
padding: 1rem;
border: 4px solid black
`;