import Table from 'react-bootstrap/Table';

const ForecastCard = ({ CF,theme}) => {
    const UniqueDate = [...new Set(
        CF.map(item => item.dt_txt.split(" ")[0]) // it will give duplicate date forecast
    )];

    const getDayFC_Curr_time = (date,target) => {
        const sameDay = CF.filter(item => item.dt_txt.startsWith(date));

        return sameDay.reduce((closest, item) => {
            const hour = Number(item.dt_txt.split(" ")[1].split(":")[0]);
            return Math.abs(hour - target) < Math.abs(closest.hour - target)
                ? { ...item, hour }
                : closest;
        }, { hour: 99 });
    };

    // Per Day Forecast - PDF
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <h3>6-Day's Forecast</h3>
            </div>
            <Table id='FC' className={'w-75 table-wrapper ' + theme } style={{textAlign: 'center', tableLayout: "fixed", margin: "20px auto" }} bordered>
                <thead>
                    <tr style={{ border: "2px solid black" }}>
                        <th colSpan={5} style={{fontWeight: '700',color:'black'}}>6-Day Forecast</th>
                    </tr>
                    <tr style={{ border: "2px solid black",fontWeight:500}}>
                        <td>Date</td>
                        <td>Temperature</td>
                        <td>Humidity</td>
                        <td>Speed</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        UniqueDate.map(date => {
                            // target time 
                            const time = new Date().toLocaleTimeString().split(" ")[0]
                            const target = time.split(":")[0];
                            const Day = getDayFC_Curr_time(date,target);
                            return <tr style={{ border: "2px solid black" }} key={date}>
                                <td>{date + '----' + time}</td>
                                <td>{Day?.main?.temp} c</td>
                                <td>{Day?.main?.humidity} %</td>
                                <td>{Day?.wind?.speed} m/s</td>
                                <td>{Day?.weather[0].description}</td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default ForecastCard







/* 
**We take all forecasts for a day and use `reduce()` to find the one whose time is closest to 12 PM.
We start with a dummy hour (99), compare each item’s hour with 12, and keep replacing the “closest” one until the best match is found.
In the end, reduce returns only that one forecast object.**

  const [time, setTime] = useState(new Date());

useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);

 */