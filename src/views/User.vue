<script setup>
import { onMounted } from "vue";
import { Geolocation } from "@capacitor/geolocation";
import { supabase } from "../SupaBaseConfig";
const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  // console.log("Current position:", coordinates);
  return coordinates;
};

let map;
let locationMarker;

onMounted(() => {
  map = new mappls.Map("map", {
    // (12.987512, )
    center: { lat: 12.987512, lng: 80.237182 },
    zoom: 15,
  });
});

const listenToCoords = () => {
  supabase
    .channel("bus1")
    .on("broadcast", { event: "bus-loc" }, (payload) => {
      // console.log(payload);
      let { lat, lng } = payload.payload;
      // let lat = payload.lat;
      // let lng = payload.lng;
      console.log(payload);
      if (locationMarker) {
        locationMarker.setPosition({ lat, lng });
      } else {
        locationMarker = new mappls.Marker({
          position: { lat, lng },
          map: map,
        });
        map.setCenter({ lat, lng });
      }
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED") {
        // your callback function will now be called with the messages broadcast by the other client
      }
    });
};

const loc = async () => {
  let coords = await printCurrentPosition();
  map.setCenter({ lat: coords.coords.latitude, lng: coords.coords.longitude });
};
</script>

<template>
  <main>
    <div id="map"></div>
    <button @click="loc">Locate</button>
    <button @click="listenToCoords">Listen</button>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: 100%;
}

#map {
  height: 100%;
  width: 100%;
}

button {
  position: fixed;
  z-index: 10;

  top: 10px;
  left: 10px;
}
</style>
