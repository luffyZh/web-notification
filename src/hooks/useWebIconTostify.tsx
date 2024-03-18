import { useEffect } from "react";
import usePageVisibility from "./usePageVisibility";

// 更新favicon的函数
const updateFavicon = (href: string) => {
  const link: HTMLLinkElement =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = href;
  document.getElementsByTagName("head")[0].appendChild(link);
};

// 自定义 Hook 来封装更新 icon 的逻辑
function useWebIconTostify(needUpdated: boolean) {
  const pageVisible = usePageVisibility();
  useEffect(() => {
    if (!pageVisible && needUpdated) {
      // 页面不活跃且 needUpdated 为 true 时，更新图标
      updateFavicon("/assets/images/monitor-icon-red.svg");
    } else if (pageVisible) {
      // 页面变活跃时，重置图标
      updateFavicon("/monitor.svg");
    }
  }, [pageVisible, needUpdated]);
}

export default useWebIconTostify;
