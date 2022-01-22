
import styled from 'styled-components'
import { useEffect, useRef, useState } from "react";
import { Section } from '../shared_styles'
import { dummy_data , dummy_categories} from "./dummy_data";
export  function FinalViz({week_data, category_palette}) {

  const [data, setData] = useState()
    const $canvas = useRef(null)

    const square_size = 30
    const left_padding = 100
    const top_padding = 100


    useEffect(()=>{
      const data = dummy_data.map(d=> d.aggregate)
      setData(data)

    },[])

    useEffect(()=>{
      if (!$canvas) return
      if (!data) return
      const ctx = $canvas.current.getContext("2d");
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.rect(0, 0, 1000, 1000);
      ctx.fillStyle = 'red';
      ctx.fill();

      data.forEach((day_data, day_index)=>{
        drawRow(ctx, day_index, day_data)
      })
    }, [data])

    function download(){
        var canvas = $canvas.current;
        var url = canvas.toDataURL("image/png");
        var link = document.createElement('a');
        link.download = 'filename.png';
        link.href = url;
        link.click();
    }


    function getColor(category){
      const index = dummy_categories.findIndex(c=> c== category)
      const colors = ["gold", "yellow", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"]
      return colors[index]
    }

    function drawBlock(ctx, x, y, color){
      x = x + left_padding;
      y = y + top_padding;
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.fillRect(x, y, square_size, square_size);
      ctx.strokeStyle = 'black'
      ctx.strokeRect(x, y, square_size, square_size);
    }



    function drawRow(ctx, day_index, day_data){
      for (const hour in day_data) {
        drawBlock(ctx, hour * square_size, day_index*square_size, getColor(day_data[hour]))

      }
    }
  return (
    <Section>
      <img href={wood}/>
        {/* <SectionHeader>HOURS</SectionHeader>
          <canvas ref={$canvas}id="myCanvas" width="1000" height="450" style={{border:"1px solid #000000"}}></canvas>
        <DownloadButton onClick={download}>Download!</DownloadButton> */}
    </Section>
  );
}

const DownloadButton = styled.button`
font-size: 5rem;
padding: 1rem;
border: 4px solid black
`