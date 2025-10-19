"use client";

import React, { useEffect, useRef } from "react";

interface ChartComponentProps {
  type: "bar" | "pie" | "line" | "doughnut";
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
    }[];
  };
  options?: Record<string, unknown>;
  height?: number;
  className?: string;
}

export default function ChartComponent({ 
  type, 
  data, 
  options = {}, 
  height = 300,
  className = ""
}: ChartComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    // Dynamically import Chart.js only when component mounts
    const loadChart = async () => {
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (canvasRef.current) {
        // Destroy existing chart if it exists
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Create new chart
        chartRef.current = new Chart(canvasRef.current, {
          type,
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: type === 'line' || type === 'bar' ? {
              y: {
                beginAtZero: true,
                ticks: {
                  precision: 0,
                },
              },
            } : {},
            ...options,
          },
        });
      }
    };

    loadChart();

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

// Predefined color palettes for different chart types
export const chartColors = {
  primary: [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // yellow
    '#EF4444', // red
    '#8B5CF6', // purple
    '#06B6D4', // cyan
    '#84CC16', // lime
    '#F97316', // orange
  ],
  pastel: [
    '#A5B4FC', // light blue
    '#86EFAC', // light green
    '#FDE68A', // light yellow
    '#FCA5A5', // light red
    '#C4B5FD', // light purple
    '#67E8F9', // light cyan
    '#BEF264', // light lime
    '#FDBA74', // light orange
  ],
  gradient: [
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(245, 158, 11, 0.8)',
    'rgba(239, 68, 68, 0.8)',
    'rgba(139, 92, 246, 0.8)',
    'rgba(6, 182, 212, 0.8)',
    'rgba(132, 204, 22, 0.8)',
    'rgba(249, 115, 22, 0.8)',
  ],
};
