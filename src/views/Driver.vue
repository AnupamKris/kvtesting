<script setup>
import { onMounted } from "vue";
import { Geolocation } from "@capacitor/geolocation";
import { supabase } from "../SupaBaseConfig";

const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  // console.log("Current position:", coordinates);
  return coordinates;
};

const channel = supabase.channel("bus1");

let map;

onMounted(() => {
  map = new mappls.Map("map", {
    // (12.987512, )
    center: { lat: 12.987512, lng: 80.237182 },
    zoom: 15,
  });

  console.log("BASE", supabase);
});

const loc = async () => {
  let coords = await printCurrentPosition();
  map.setCenter({ lat: coords.coords.latitude, lng: coords.coords.longitude });
  let locMarker = new mappls.Marker({
    position: { lat: coords.coords.latitude, lng: coords.coords.longitude },
    map: map,
  });
};

const startLiveLocation = async () => {
  channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      // now you can start broadcasting cursor positions
      let latlang = await getCurrentPosition();
      setInterval(() => {
        channel.send({
          type: "broadcast",
          event: "bus-loc",
          payload: {
            lat: latlang.coords.latitude,
            lng: latlang.coords.longitude,
          },
        });
        // console.log(status);
      }, 100);
    }
  });
};

const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  // console.log("Current position:", coordinates);
  return coordinates;
};
</script>

<template>
  <main>
    <div id="map"></div>
    <button @click="loc">Locate</button>
    <button class="start" @click="startLiveLocation">Start</button>
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

.start {
  top: 50px;
}
</style>
