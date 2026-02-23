import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  

  const getBarColor = (entry) => {
    if (entry.priority === "low") return "#84CC16";
    if (entry.priority === "medium") return "#06B6D4";
    if (entry.priority === "high") return "#EC4899";
    return "#999";
  };

  return (
    <div style={{ width: "100%", height: "300px", background: "#fff" }}>
      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priority" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="value">
          {data?.map((entry, index) => (
            <Cell key={index} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default CustomBarChart;
