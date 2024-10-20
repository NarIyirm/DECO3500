<p align="center">
  <h1 align="center">
    <a href="http://20.11.49.12:10805/event">IsoulU</a>
  </h1>
</p>

<p align="center">
  <a href="https://github.com/NarIyirm/DECO3500/wiki"> 
    <img
      src="https://img.shields.io/badge/DOCS-blue.svg?style=for-the-badge&logo=read-the-docs&logoColor=white&labelColor=000000&logoWidth=20">
  </a>
  <a href="https://github.com/NarIyirm/DECO3500/stargazers" target="_blank">
    <img
      src="https://img.shields.io/github/stars/NarIyirm/DECO3500?style=for-the-badge&logo=github&logoColor=white&labelColor=000000&logoWidth=20"
      alt="GitHub Stars">
  </a>
</p>

# Base file structure
This project include prototype and demo with frontend(`nuxt-event`) and backend(`express`).

The structure shown is the frontend and backend of event page
<pre>
📂 DECO3500
├ 📂 express
  ├ 📂 bin
    └ 📄 www
  ├ 📂 public
    ├ 📂 images
      ├ 📄 u1.jpg
      ├ 📄 u2.jpg
      └ 📄 u3.jpg
    ├ 📂 stylesheets
      └ 📄 style.css
    ├ 📄 u1.jpg
    ├ 📄 u2.jpg
    └ 📄 u3.jpg
  ├ 📂 routes
    ├ 📄 index.js
    └ 📄 users.js
  ├ 📂 views
    ├ 📄 error.pug
    ├ 📄 index.pug
    └ 📄 layout.pug
  ├ 📄 app.js
  ├ 📄 package-lock.json
  ├ 📄 package.json
  ├ 📄 server.js
  ├ 📄 u1.jpg
  ├ 📄 u2.jpg
  └ 📄 u3.jpg
├ 📂 nuxt-event
  ├ 📂 pages
    ├ 📄 event.vue
    ├ 📄 event2.vue
    ├ 📄 event3.vue
    └ 📄 index.vue
  ├ 📂 plugins
    └ 📄 vue-leaflet.client.js
  ├ 📂 public
    ├ 📄 UQ.jpg
    ├ 📄 WechatIMG6156.jpg
    ├ 📄 WechatIMG6157.jpg
    ├ 📄 WechatIMG6158.jpg
    ├ 📄 WechatIMG6160.jpg
    ├ 📄 favicon.ico
    ├ 📄 robots.txt
    ├ 📄 u1.jpg
    ├ 📄 u2.jpg
    └ 📄 u3.jpg
  ├ 📂 server
    └ 📄 tsconfig.json
  ├ 📄 app.vue
  ├ 📄 nuxt.config.ts
  ├ 📄 package-lock.json
  ├ 📄 package.json
  └ 📄 tsconfig.json
└ 📄 README.md</pre>
> [!TIP]
> It is recommended to deploy it on the same machine.

> [!IMPORTANT]
> Please swap all the example ip address (20.11.49.12:10805) to your localhost ip address and port.

# Installation
Frontend(`nuxt-event`) and backend(`express`) are installed independently of each other. Before installation, please make sure you have navigated to the `DECO3500` folder.
## Frontend

- Install dependence
```
cd nuxt-event
npm install
```
- ⚠️REMEMBER TO CHANGE IP ADDRESS AND PORT TO YOUR LOCALHOST!!!⚠️

- Run `nuxt dev --host --port 3001`

- Visit `http://localhost:3001/event`

## Backend

- Install dependence
```
cd express
npm install
```
- Run `node server.js`

  
