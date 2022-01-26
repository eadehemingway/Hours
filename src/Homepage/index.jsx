import { SectionHeaderGrand, Section, section_colour } from "../shared_styles";
import { Nav } from "../Nav";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ROUTES } from "../App";
import { drawClock } from "../clock";
import grain_2 from "../wood_grain-02.jpg";
import grain_3 from "../wood_grain-03.jpg";
import grain_4 from "../wood_grain-04.jpg";
import grain_5 from "../wood_grain-05.jpg";
import grain_6 from "../wood_grain-06.jpg";
import grain_7 from "../wood_grain-07.jpg";
import grain_8 from "../wood_grain-08.jpg";
import grain_9 from "../wood_grain-09.jpg";

export function Homepage() {
    const navigate = useNavigate();
    const handleNext = () => navigate(ROUTES.DESCRIPTION);

    const img_sources = [grain_2, grain_3, grain_4, grain_5, grain_6, grain_7, grain_8, grain_9];
    let imgs = [];

    const $canvas = useRef(null);
    const section_padding = 100;
    const canvas_width = document.body.clientWidth;
    const square_size = (canvas_width - (section_padding * 2)) / 24;
    const canvas_height = window.innerHeight;

    useEffect(()=>{
        if (!$canvas.current) return;
        const ctx = $canvas.current.getContext("2d");
        ctx.scale(2, 2);
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        ctx.fillStyle = section_colour;
        let img_load_count = 0;
        let img_count = img_sources.length;

        for (let i = 0; i < img_count; i++) {
            let img = new Image();
            img.onload = function() {
                img_load_count++;
                imgs.push(img);
                if (img_load_count == img_count) {
                    drawClock(ctx, canvas_width, canvas_height, 0, 0);
                    // drawAxis(ctx, axis_width, axis_height, axis_left, axis_top);
                }
            };
            img.src = img_sources[i];
        }
    }, []);


    return (
        <Section>
            <Nav
                show_back={false}
                show_next={true}
                handleNext={handleNext}
            />
            <canvas ref={$canvas}
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
            ></canvas>
            {/* <SectionHeaderGrand>HOURS</SectionHeaderGrand> */}
        </Section>
    );
}