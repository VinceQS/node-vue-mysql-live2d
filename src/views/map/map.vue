<template>
    <div style="width: 100%; height:600px; overflow-x:hidden">
        <div class="map-container" id="map-container"></div>
    </div>
</template>
<script>
// import createMap from './utils/map'
import * as L from 'leaflet'

var map
// console.log(createMap)
export default {
  data() {
    return {
      map: null,
      option: {
        center: [31.87, 120.55],
        zoom: 13
      }
    }
  },
  mounted() {
    // map = L.map('map-container', {
    //     center:[31.87,120.55],
    //     zoom:13,
    // });
    map = L.map('map-container').setView([31.87, 120.55], 13)
    L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
      subdomains: ['1', '2', '3', '4'],
      attribution: '高德'
    }).addTo(map)
    L.marker([31.87, 120.55]).addTo(map).bindPopup('日').openPopup()
    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.")
    // // 圆形
    // var circle = L.circle([32.01, 120.55], 500, {
    //     color:'red',
    //     fillColor:'#f30',
    //     fillOpacity:0.5
    // }).addTo(map);
    // var polygon = L.polygon([
    //     [32.22,-0.08],
    //     [31.29,-0.6],
    //     [31.30,-0.45]
    // ]).addTo(map);
    // polygon.bindPopup('日').openPupop();
  }
}
</script>
<style lang="scss">
  .map-container{
    // position: absolute;
    // top:0;
    // left: 0;
    width: 100%;
    height: 100%;
    // height: calc(100vh -50px);
  }
</style>
