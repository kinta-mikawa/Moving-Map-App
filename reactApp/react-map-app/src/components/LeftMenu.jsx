import React, { useState } from "react";
import { SearchBox } from "./SearchBox";
import { PinBox } from "./PinBox";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const LeftMenu = (props) => {
    const { pinMax, pinNum, searchValues, setSearchValues, pinValue, setPinValue, locations, setLocations, radiusValues, setRadiusValues, onChange } = props;
    const areaColor = new Array("#FF3B0D", "#1957FF", "#FF7B00", "#19FFB0", "#FFBA0D")

    const handlePin = (index) => {
        if (searchValues[index] !== '') {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
                {
                    address: searchValues[index],
                },
                (results, status) => {
                    if (status === "OK") {
                        const lat = results[0].geometry.location.lat();
                        const lng = results[0].geometry.location.lng();
                        const newPinValue = [...pinValue];
                        newPinValue[index] = { lat, lng };
                        setPinValue(newPinValue);
                        const newLocations = [...locations];
                        newLocations[index] = {
                            "name": searchValues[index],
                            "location": {
                                "lat": lat,
                                "lng": lng
                            },
                            "radius" : parseInt(radiusValues[index])*1000,
                            "circleOptions" : {
                                strokeColor: areaColor[index],
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: areaColor[index],
                                fillOpacity: 0.2,
                                clickable: false,
                                draggable: false,
                                editable: false,
                                visible: true,
                                radius: 30000,
                                zIndex: 1
                            }

                        };
                        setLocations(newLocations);

                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    };
                }
            );
        };
    };


    const handleSearchBoxChange = (index) => (e) => {
        const newSearchValues = [...searchValues];
        newSearchValues[index] = e.target.value;
        setSearchValues(newSearchValues);
    };

    const handleRadiusChange = (index) => (e) => {
        const newRadiusValues = [...radiusValues];
        newRadiusValues[index] = e.target.value;
        setRadiusValues(newRadiusValues);
    };


    return (
        <div className="left-menu">
            <div className="left-head">
                <div>
                    ピンの数：
                    <input className="value-input" type="number" min="1" max={pinMax} size="5" value={pinNum} onChange={onChange}
                    />
                    点
                </div>
            </div>
            <Tabs >
                <TabList>
                    <Tab>地名で</Tab>
                    <Tab>ピンで</Tab>
                </TabList>

                <TabPanel>
                    {/* {searchBoxes} */}
                    {searchValues.map((_, index) => {
                        return (
                            <SearchBox
                                key={index}
                                index={index}
                                searchValues={searchValues}
                                radiusValues={radiusValues}
                                handleSearchBoxChange={handleSearchBoxChange}
                                handleRadiusChange={handleRadiusChange}
                                handlePin={handlePin}
                                disabled={index >= pinNum}
                            />
                        );
                    })}

                </TabPanel>
                <TabPanel>

                    {/* {pinBoxes} */}

                </TabPanel>
            </Tabs>

        </div>
    );
};