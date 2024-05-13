import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Treemap = ({ data, width = 960, height = 500 }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .style('background-color', '#ccc');

        const root = d3.hierarchy(data)
            .sum(d => d.value) // Tính tổng giá trị để xác định kích thước của từng node
            .sort((a, b) => b.value - a.value); // Sắp xếp node từ lớn đến nhỏ

        d3.treemap()
            .size([width, height])
            .paddingInner(0) // Thiết lập padding giữa các node là 0px
            .round(true)(root);

        // Tạo thang màu dựa trên giá trị
        const colorScalePositive = d3.scaleLinear()
            .domain([0, d3.max(root.leaves(), d => d.value)])
            .range(['#B7debc', '#1f8e02']);

        const colorScaleNegative = d3.scaleLinear()
            .domain([d3.min(root.leaves(), d => d.value), 0])
            .range(['#9c0303', '#C16a6a']);

        const leaf = svg.selectAll('g')
            .data(root.leaves())
            .join('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

        leaf.append('rect')
            .attr('id', d => `leaf-${d.data.name}`)
            .attr('fill', d => d.value >= 0 ? colorScalePositive(d.value) : colorScaleNegative(d.value))
            .attr('stroke', 'white') // Thiết lập vạch phân cách màu trắng
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0);

        leaf.append('text')
            .attr('fill', 'white')
            .attr('clip-path', d => `url(#clip-${d.leafUid})`)
            .selectAll('tspan')
            .data(d => (d.data.name + '\n' + ((d.data.change * 100)?.toFixed(2) + '%')).split('\n'))
            .join('tspan')
            .attr('x', 5)
            .attr('y', (d, i) => `${i * 1.1 + 1}em`)
            .attr('font-size', (d, i) => i === 0 ? '15px' : '14px')  // Cỡ chữ lớn hơn cho tên
            .attr('font-family', 'Calibri')
            .attr('font-weight', (d, i) => i === 0 ? 'bold' : 'normal')  // Chỉ tên có chữ đậm
            .text(d => d);

    }, [data, width, height]); // Cập nhật các props

    return (
        <svg ref={ref}></svg>
    );
};

export default Treemap;
