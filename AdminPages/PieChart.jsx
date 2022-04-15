import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import "../../CSS/PieChart.css";

const PieCharts = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:8080/getCountOfQuestions"
    );
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  const subjectData = [
    { name: "Java", Questions: data.Java },
    { name: "AdvJava", Questions: data.AdvJava },
    { name: "OS", Questions: data.OS },
    { name: "JS", Questions: data.JS },
    { name: "DBMS", Questions: data.Database },
    { name: "DotNet", Questions: data.DotNet },
    { name: "ADS", Questions: data.ADS },
    { name: "C++", Questions: data.C++ },
    { name: "Python", Questions: data.Python },
    { name: "Reactjs", Questions: data.Reactjs },
    { name: "Swift", Questions: data.Swift },
    { name: "WPT", Questions: data.WPT },
  ];

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Subject Wise Question Charts Analysis</h1>
        <div className="Charts">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="Questions"
              isAnimationActive={true}
              data={subjectData}
              cx={200}
              cy={200}
              outerRadius={120}
              fill="#c83200"
              label
            />
            <Tooltip />
          </PieChart>
          <BarChart
            width={900}
            height={300}
            data={subjectData}
            margin={{
              top: 5,
              right: 30,
              left: 80,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="Questions"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </div>
      </div>
    </>
  );
};

export default PieCharts;
