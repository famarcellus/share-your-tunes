import React from "react";
import { Pie } from "@ant-design/charts";

function MusicChart({ pieData, className }) {
    var config = {
        autoFit: true,
        appendPadding:10, 
        angleField:'count', 
        colorField:'artist', 
        radius: 1,
        innerRadius: 0.77,
        label:{ 
          type:'inner', 
          offset: '-50%',
          content: '{value}',
          style:{ 
            textAlign : 'center' , 
            fontSize:14, 
          },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
            title: false,
            content: {
            style: {
                color: "white",
                fontWeight: "500",
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            content: 'Top 3 Mentions',
            },
        },
    };

    return <Pie {...config} data={pieData} className={className}/>
}

export default MusicChart;