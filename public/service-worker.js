/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const APP_NAME = "app";
const CACHE_VERSION = "2.3";
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
  // 处理 Client 发来的通知
  if (event.data && event.data.type === "notification") {
    // 如果是显示通知，则显示通知
    const { title, options } = event.data;
    self.registration.showNotification(title, options);
    // 向客户端发 postMessage
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: "notification",
          number: 0,
        });
      });
    });
  }
});

// 监听通知点击事件
self.addEventListener('notificationclick', function (e) {
  const action = e.action;
  e.waitUntil(
    // 获取所有clients
    self.clients.matchAll().then(function (clients) {
        if (!clients || clients.length === 0) {
            return;
        }
        switch (action) {
          case 'show-book': {
            self.clients.openWindow('https://juejin.cn/book/7307129524007731238?utm_source=profile_book');
            break;
          }
          case 'send-email': {
            self.clients.openWindow('mailto:zhoudeyou945@gmail.com');
            break;
          }
          default: {
            clients &&
            clients[0] &&
            clients[0].focus &&
            clients[0].focus();
            break;
          }
        }
    })
) ;
  // 关闭窗口
  e.notification.close();
});