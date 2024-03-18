export function noop() {}


// 根据未读消息数量更新网站图标
function updateFavicon(unreadCount: number) {
  const link: HTMLLinkElement = document.querySelector("link[rel*='icon']")!;
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  
  // 根据未读消息数量选择相应的图标
  link.href = 'path/to/favicon-' + unreadCount + '.ico';

  // 替换当前的网站图标
  document.getElementsByTagName('head')[0].appendChild(link);
}

// 示例使用：更新网站图标为有 5 条未读消息
updateFavicon(5);