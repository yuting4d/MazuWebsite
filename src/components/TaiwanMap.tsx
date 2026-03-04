import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

interface TaiwanMapProps {
  activeRegionId: string;
  onRegionClick: (regionId: string) => void;
}

export default function TaiwanMap({ activeRegionId, onRegionClick }: TaiwanMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [topology, setTopology] = useState<any>(null);

  useEffect(() => {
    // Fetch TopoJSON data for Taiwan
    fetch('https://raw.githubusercontent.com/g0v/twgeojson/master/json/twCounty2010.topo.json')
      .then(response => response.json())
      .then(data => setTopology(data))
      .catch(error => console.error("Error loading Taiwan TopoJSON:", error));
  }, []);

  useEffect(() => {
    if (!topology || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous render
    svg.selectAll('*').remove();

    // Create a group for the map
    const g = svg.append('g');

    // Setup projection
    // Center on Taiwan
    const projection = d3.geoMercator()
      .center([121, 23.6])
      .scale(width * 8) // Adjust scale based on container width
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Convert TopoJSON to GeoJSON
    const geojson = topojson.feature(topology, topology.objects.layer1) as any;

    // Map counties to our regions
    const getRegionId = (countyName: string) => {
      const north = ['基隆市', '臺北市', '台北市', '新北市', '台北縣', '桃園市', '桃園縣', '新竹市', '新竹縣', '宜蘭縣'];
      const central = ['苗栗縣', '臺中市', '台中市', '台中縣', '彰化縣', '南投縣', '雲林縣'];
      const south = ['嘉義市', '嘉義縣', '臺南市', '台南市', '台南縣', '高雄市', '高雄縣', '屏東縣'];
      const islands = ['澎湖縣', '金門縣', '連江縣'];
      const east = ['花蓮縣', '臺東縣', '台東縣']; // We'll group east with south or islands, let's group with south for this demo or keep as unselected

      if (north.includes(countyName)) return 'north';
      if (central.includes(countyName)) return 'central';
      if (south.includes(countyName)) return 'south';
      if (islands.includes(countyName)) return 'islands';
      return 'east'; // Defaulting others
    };

    // Draw counties
    g.selectAll('path')
      .data(geojson.features)
      .enter()
      .append('path')
      .attr('d', path as any)
      .attr('fill', (d: any) => {
        const regionId = getRegionId(d.properties.COUNTYNAME);
        if (regionId === activeRegionId) return 'var(--color-mazu-red)';
        if (regionId === 'east') return '#f5f5f5'; // slightly different for unmapped
        return '#fcfbf8';
      })
      .attr('stroke', (d: any) => {
        const regionId = getRegionId(d.properties.COUNTYNAME);
        return regionId === activeRegionId ? '#fff' : '#e5e5e5';
      })
      .attr('stroke-width', 1)
      .attr('class', 'transition-colors duration-300 cursor-pointer hover:opacity-80')
      .on('click', (event, d: any) => {
        const regionId = getRegionId(d.properties.COUNTYNAME);
        if (regionId !== 'east') {
          onRegionClick(regionId);
        }
      });

    // Add markers for specific temples
    const markers = [
      { id: 'north', coords: [121.46, 25.12], name: '關渡宮' }, // Taipei
      { id: 'central', coords: [120.62, 24.34], name: '大甲鎮瀾宮' }, // Taichung
      { id: 'south', coords: [120.30, 23.57], name: '北港朝天宮' }, // Yunlin/Chiayi area
      { id: 'islands', coords: [119.93, 26.16], name: '馬祖天后宮' }, // Matsu
    ];

    const markerGroup = svg.append('g');

    markerGroup.selectAll('circle.marker')
      .data(markers)
      .enter()
      .append('circle')
      .attr('class', 'marker cursor-pointer transition-all duration-300')
      .attr('cx', d => projection(d.coords as [number, number])![0])
      .attr('cy', d => projection(d.coords as [number, number])![1])
      .attr('r', d => d.id === activeRegionId ? 8 : 5)
      .attr('fill', d => d.id === activeRegionId ? 'var(--color-mazu-red)' : 'var(--color-mazu-gold)')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .on('click', (event, d) => {
        onRegionClick(d.id);
      });

  }, [topology, activeRegionId, onRegionClick]);

  return (
    <div className="w-full h-full relative">
      {!topology && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-sans">
          Loading map...
        </div>
      )}
      <svg ref={svgRef} className="w-full h-full drop-shadow-xl" style={{ minHeight: '400px' }} />
    </div>
  );
}
