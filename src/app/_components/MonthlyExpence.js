'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const MonthlyExpensesChart = ({ expance,TransitonTyppe }) => {

  const months = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleString('default', { month: 'short' }); 
  };

  const data = expance?.map((val) => ({
    month: months(val.date),
    expense: val[TransitonTyppe]
  }));

  return (
    <div className="w-full min-h-[400px]  p-6 rounded-lg shadow-lg">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" type="category" stroke="#374151" tick={{ fontSize: 14 }} />
          <YAxis stroke="#374151" tick={{ fontSize: 14 }} />
          <Tooltip />
          <Bar dataKey="expense" fill="#3b82f6" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesChart;
