import './charts.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Charts({title,data,dataKey,grid}) {
  
  return (
    <div className="charts">
        <h3 className="chartTitle">{title}</h3>
        {/* <ResponsiveContainer width="100%" height="100%">

        </ResponsiveContainer> */}
            <ResponsiveContainer width="100%" aspect={3 /1}>
                <LineChart data={data}>
                    <XAxis dataKey={"name"} stroke="#5550bd"/>
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd"/>
                    <Tooltip/>
                    {grid && <CartesianGrid stroke='#e0dfdf'/>}

                </LineChart>

            </ResponsiveContainer>
    </div>
  )
}
