<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <NuxtLink to="http://20.11.49.12:10805/event">Go to Event Page</NuxtLink>
    <NuxtLink to="http://20.11.49.12:10805/event2">Go to Event2 Page</NuxtLink>
    <NuxtLink to="http://20.11.49.12:10805/event2">Go to Event3 Page</NuxtLink>

    <!-- 替换地图调试区域 -->
    <div class="map-container">
      <h2>OpenStreetMap Static View</h2>
      <iframe
          :src="mapUrl"
          class="map-frame"
          frameborder="0"
          allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup>
const mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=153.00309348237328%2C-27.502345227923593%2C153.02309348237328%2C-27.482345227923593&layer=mapnik';
</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-top: 20px;
}

.map-frame {
  height: 100%;
  width: 100%;
  border: none;
}
</style>
