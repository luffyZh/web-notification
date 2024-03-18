/* eslint-disable no-undef */
// 监听通知点击事件
self.addEventListener('notificationclick', function (e) {
  // 关闭窗口
  e.notification.close();
  // 打开网页
  e.waitUntil(
    // 获取所有clients
    self.clients.matchAll().then(function (clientsList) {
      // 切换到该站点的tab
      clientsList &&
        clientsList.length &&
        clientsList[0].focus &&
        clientsList[0].focus();
      console.log(clientsList, 333333333);
      // self.clients.openWindow(url);
    }),
  );
});