/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const APP_NAME = "app";
const CACHE_VERSION = "1.8";
const CACHE_NAME = `${APP_NAME}-v${CACHE_VERSION}`;

// 安装 Service Worker
self.addEventListener('install', event => {
  // 强制立即接管控制
  event.waitUntil(self.skipWaiting());
  caches.open(CACHE_NAME);
});

// 清理旧的缓存
self.addEventListener("activate", (event) => {
  console.log('service worker activate', event);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // 清理以前版本的缓存
            return (
              cacheName.startsWith(APP_NAME) && cacheName !== CACHE_NAME
            );
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// 拦截网络请求并使用缓存进行响应
self.addEventListener("fetch", (event) => {
  // do something
});

// 处理新的 Service Worker 安装和激活
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "registerServiceWorker") {
    event.waitUntil(
      self.skipWaiting().then(() => {
        return self.clients.claim();
      })
    );
  }
});

// 监听通知点击事件
self.addEventListener('notificationclick', function (e) {
  // 关闭窗口
  e.notification.close();
  // 打开网页
  e.waitUntil(
    // 获取所有clients
    self.clients.matchAll().then(function (clientsList) {
      if (!clients || clients.length === 0) {
        // 当不存在 client 时，打开该网站
        self.clients.openWindow && self.clients.openWindow('http://localhost:5173');
        return;
      }
      // 如果存在 Tab，则切换到该站点的 Tab
      clientsList &&
      clientsList.length &&
      clientsList[0].focus &&
      clientsList[0].focus();
    }),
  );
});