<template>
  <div class="bg-blue-100 min-h-screen py-12 px-6 flex justify-center items-center">
    <!-- Card Container with translucent background -->
    <UCard class="w-full max-w-3xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-6 md:p-8 transform hover:-translate-y-2 transition duration-300">
      <!-- 活动头部 -->
      <UCard class="flex items-center mb-6">
        <img src="/UQ.jpg" alt="UQ Social Sports Club" class="w-14 h-14 md:w-16 md:h-16 rounded-full shadow-md mr-4 transform hover:scale-105 transition duration-300" />
        <div class="flex-1">
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">UQ Social Sports Club</h1>
          <p class="text-sm md:text-base text-gray-500">24 Sep Brisbane</p>
        </div>
        <!-- QR Code Icon -->
        <div class="ml-auto flex items-center">
          <button @click="toggleQrCode" class="bg-transparent border-none cursor-pointer">
            <UIcon name="heroicons-outline-qrcode" size="32" class="text-blue-600 hover:text-blue-800" />
          </button>
          <!-- Sign Up 按钮 -->
          <button @click="signUp" class="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
        </div>
      </UCard>

      <!-- 弹窗 -->
      <div v-if="showQrCode" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded-lg shadow-lg max-w-sm">
          <h2 class="text-lg font-semibold mb-4">Scan QR Code</h2>
          <!-- 显示二维码 -->
          <qrcode-vue :value="qrCodeValue" size="200" />
          <!-- 关闭按钮 -->
          <button @click="toggleQrCode" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
        </div>
      </div>

      <!-- 活动详情 -->
      <div class="mb-6">
        <h2 class="text-xl md:text-2xl font-semibold text-gray-700">Mixed Basketball Game Season 2</h2>
        <p class="text-base md:text-lg font-medium text-gray-600 mt-2 mb-4">ARE U READY FOR BASKETBALL?!</p>
        <p class="text-gray-600">
          Join us this Friday on September 27, from 5 to 6pm for a cracking game of tennis!
          We hope to see everyone there!
        </p>
      </div>

      <!-- 活动图片 -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="flex justify-center">
          <img src="/WechatIMG6156.jpg" alt="Basketball Image 1"
               class="w-full h-auto max-w-xs rounded-lg shadow-md transform hover:scale-105 transition duration-300 cursor-pointer object-cover" />
        </div>
        <div class="flex justify-center">
          <img src="/WechatIMG6157.jpg" alt="Basketball Image 2"
               class="w-full h-auto max-w-xs rounded-lg shadow-md transform hover:rotate-3 hover:scale-105 transition duration-300 cursor-pointer object-cover" />
        </div>
        <div class="flex justify-center">
          <img src="/WechatIMG6158.jpg" alt="Basketball Image 3"
               class="w-full h-auto max-w-xs rounded-lg shadow-md transform hover:scale-105 hover:rotate-3 transition duration-300 cursor-pointer object-cover" />
        </div>
        <div class="flex justify-center">
          <img src="/WechatIMG6160.jpg" alt="Basketball Image 4"
               class="w-full h-auto max-w-xs rounded-lg shadow-md transform hover:scale-105 hover:rotate-6 transition duration-300 cursor-pointer object-cover" />
        </div>
      </div>

      <!-- 地点信息 -->
      <div class="mb-6">
        <h3 class="text-lg md:text-xl font-semibold text-gray-700">Location:</h3>
        <p class="text-gray-600 mb-3">UQ Net Ball Court, 30, St Lucia QLD4067</p>
        <!-- 静态地图显示 -->
        <div class="map-container">
          <iframe
              :src="mapUrl"
              class="map-frame"
              frameborder="0"
              allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- 最近参与者 -->
      <div class="mb-6">
        <h3 class="text-lg md:text-xl font-semibold text-gray-700">Recent Participants</h3>
        <ul class="space-y-3 mt-4 flex flex-wrap justify-center">
          <li v-for="(participant, index) in participants" :key="index" class="flex items-center m-2">
            <img :src="participant.avatar" alt="Participant Avatar" class="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md mr-3 transform hover:scale-105 transition duration-300 cursor-pointer object-cover" />
            <div class="flex flex-col text-center">
              <span class="font-medium text-gray-800">{{ participant.name }}</span>
              <span class="text-sm text-gray-500">{{ participant.time }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Event 2 最近参与者 -->
      <div v-if="filteredEvent2Participants.length > 0" class="mb-6">
        <!-- <h3 class="text-lg md:text-xl font-semibold text-gray-700">Event 2 Participants</h3>-->
         <ul class="space-y-3 mt-4 flex flex-wrap justify-center">
           <li v-for="(participant, index) in filteredEvent2Participants" :key="index" class="flex items-center m-2">
             <img :src="participant.avatar" alt="Participant Avatar" class="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md mr-3 transform hover:scale-105 transition duration-300 cursor-pointer object-cover" />
             <div class="flex flex-col text-center">
               <span class="font-medium text-gray-800">{{ participant.name }}</span>
               <span class="text-sm text-gray-500">{{ participant.time }}</span>
             </div>
           </li>
         </ul>
       </div>

      <!-- Event 3 最近参与者 -->
      <div v-if="filteredEvent3Participants.length > 0" class="mb-6">
        <!-- <h3 class="text-lg md:text-xl font-semibold text-gray-700">Event 2 Participants</h3>-->
        <ul class="space-y-3 mt-4 flex flex-wrap justify-center">
          <li v-for="(participant, index) in filteredEvent3Participants" :key="index" class="flex items-center m-2">
            <img :src="participant.avatar" alt="Participant Avatar" class="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md mr-3 transform hover:scale-105 transition duration-300 cursor-pointer object-cover" />
            <div class="flex flex-col text-center">
              <span class="font-medium text-gray-800">{{ participant.name }}</span>
              <span class="text-sm text-gray-500">{{ participant.time }}</span>
            </div>
          </li>
        </ul>
      </div>
     </UCard>
   </div>
 </template>

 <script setup>
 import { ref, onMounted } from 'vue';
 import QrcodeVue from 'qrcode.vue'; // 引入二维码生成组件

 // 调整后的 OpenStreetMap 静态地图链接，包含标记
 const mapUrl = 'https://www.openstreetmap.org/export/embed.html?bbox=153.01009348237328%2C-27.495345227923593%2C153.01609348237328%2C-27.489345227923593&layer=mapnik&marker=-27.492345227923593%2C153.01309348237328';

 const participants = ref([]); // 存储参与者数据
 const event2Participants = ref([]); // 存储 event2 的参与者数据
 const event3Participants = ref([]); // 存储 event2 的参与者数据

 const filteredEvent2Participants = computed(() => {
   return event2Participants.value.filter(participant => participant.time !== 'You have not participated yet.');
 });
 const filteredEvent3Participants = computed(() => {
   return event3Participants.value.filter(participant => participant.time !== 'You have not participated yet.');
 });
 // 控制二维码弹窗显示
 const showQrCode = ref(false);
 const qrCodeValue = 'http://20.11.49.12:10805/event2'; // 扫描二维码后显示的内容

 // 获取参与者数据
 const fetchParticipants = async () => {
   const response = await fetch('http://20.11.49.12:10804/participants');
   participants.value = await response.json();
 };

 // 获取 event2 参与者数据
 const fetchEvent2Participants = async () => {
   const response = await fetch('http://20.11.49.12:10804/participants/event2');
   event2Participants.value = await response.json();
 };
 // 获取 event3 参与者数据
 const fetchEvent3Participants = async () => {
   const response = await fetch('http://20.11.49.12:10804/participants/event3');
   event3Participants.value = await response.json();
 };

 // 更新最近参与者的时间并发送给后端
 const signUp = async () => {
   const currentTime = new Date().toLocaleTimeString();
   participants.value = participants.value.map(participant => ({
     ...participant,
     time: `Signed up at ${currentTime}`
   }));

   // 发送更新后的参与者信息到后端
   await fetch('http://20.11.49.12:10804/update-participants', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({ updatedParticipants: participants.value })
   });
 };

 // 切换二维码弹窗显示状态
 const toggleQrCode = () => {
   showQrCode.value = !showQrCode.value;
 };

 // 页面加载时获取参与者信息和 event2 参与者信息
 onMounted(() => {
   fetchParticipants();
   fetchEvent2Participants();
   fetchEvent3Participants();
   // 每2秒刷新一次参与者数据
   setInterval(() => {
     fetchParticipants();
     fetchEvent2Participants();
     fetchEvent3Participants();
   }, 2000);
 });
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

 /* 全局样式优化 */
 body {
   font-family: 'Arial', sans-serif;
   background-color: #ebf8ff; /* 浅蓝色背景 */
 }

 .fixed {
   z-index: 50;
 }
 </style>
