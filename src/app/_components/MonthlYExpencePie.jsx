'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FFBB28', '#FF8042'];

const MonthlyExpensesPieChart = ({ expance,TransitonTyppe }) => {

  const months = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('default', { month: 'short' }); 
  };

  const data = expance?.map((val) => ({
    name: months(val.date),
    value: val[TransitonTyppe]
  }));

  return (
    <div className="w-full min-h-[400px] p-6 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data?.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesPieChart;
