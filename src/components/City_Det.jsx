import React, { useEffect, useState } from 'react';

const City_Det = ({ place }) => {
    const [city_info, setCityInfo] = useState(null);

    async function get_City_Info(place) {
        const res = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place)}`
        );
        const Data = await res.json();

        // ✅ correct check
        if (Data.type === "https://mediawiki.org/wiki/HyperSwitch/errors/not_found") {
            console.log("City info not found....");
            return;
        }

        setCityInfo(Data);
    }

    useEffect(() => {
        if (!place) return;
        get_City_Info(place);
    }, [place]);

    return (
        <div style={{ margin: "5px" }}>
            {city_info ? (
                <>
                    <h4>
                        {city_info.title},
                        <span style={{
                            fontWeight: "normal",
                            fontSize: "14px",
                            // marginLeft: "8px",
                            color: "#555"
                        }}>&nbsp;{city_info.description}
                        </span>
                    </h4> <br />

                    <div style={{margin:"0 100px 0 210px"}}>
                        <img src={city_info?.thumbnail?.source} alt="city_image" />
                    </div> <br />
                    <p>{city_info.extract}</p>
                </>
            ) : (
                <p>Loading city info...</p>
            )}
        </div>
    );
};

export default City_Det;