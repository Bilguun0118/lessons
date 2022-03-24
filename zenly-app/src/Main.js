import { useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { db } from "./firebase";


const markers = [
  {
    lat: 47.9119453,
    lng: 106.8983796,
  },
  {
    lat: 47.9138608,
    lng: 106.912096,
  },
];

export const Main = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const [makerIndex, setMakerIndex] = useState(0);
  const [myCoords, setMyCoords] = useState({});
  const auth = getAuth();

  useEffect(async () => {
    mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 47.9173099, lng: 106.9149359 },
      zoom: 14,
    });

    const locationWatcherId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setMyCoords({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      ({ message }) => {
        console.error(message);
      }
    );

    await setDoc(doc(db, "users", "uid"), myCoords);

    return () => {
      navigator.geolocation.clearWatch(locationWatcherId);
    };
  }, []);

  useEffect(() => {
    if (!myCoords.lat) return;

    mapRef.current.setCenter(myCoords);
    const myMarker = new window.google.maps.Marker({
      position: myCoords,
      map: mapRef.current,
    });

    return () => {
      myMarker.setMap(null);
    };
  }, [myCoords]);

  const onAddMarker = () => {
    new window.google.maps.Marker({
      position: markers[makerIndex],
      map: mapRef.current,
    });
    setMakerIndex(makerIndex + 1);
  };

  // --------bagshaas asuuh----------
  const logOut = () =>
    signOut(auth)
      .then(() => {

      })
      .catch((error) => {
        console.log(error + "bolsonguee");
      });

  return (
    <div>
      <div className="bottons flex">
        <button className="addMarkers" onClick={onAddMarker}>
          Add Markers
        </button>
        <button className="addMarkers" onClick={logOut}>
          Log Out
        </button>
      </div>
      <div id="map" ref={mapContainerRef}></div>
    </div>
  );
};
