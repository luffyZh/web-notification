/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import usePageVisibility from "@/hooks/usePageVisibility";

interface ILayoutProps {
  children?: React.ReactNode;
}

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

function updateFaviconWithNumber(number: number) {
  // 在需要绘制图标的地方执行以下代码
  const iconConfig = {
    width: 64,
    height: 64,
    size: 48,
  };
  // 获取设备的像素比
  const dpr = window.devicePixelRatio || 1;
  // 创建一个 Canvas 元素
  const canvas = document.createElement("canvas");
  canvas.width = iconConfig.width * dpr; // 实际像素
  canvas.height = iconConfig.height * dpr; // 实际像素
  canvas.style.width = iconConfig.width + "px"; // CSS像素
  canvas.style.height = iconConfig.height + "px"; // CSS像素
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
  // 根据设备像素比缩放Canvas的绘制内容
  ctx.scale(dpr, dpr);

  // 绘制 SVG
  const svgIcon =
    '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1709792146900" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1536" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48"><path d="M853.333333 454.144a341.333333 341.333333 0 1 0-455.111111 321.479111c-72.647111 25.201778-120.092444 72.533333-120.092444 126.122667h458.24c0-53.646222-44.202667-100.920889-113.777778-126.122667a339.911111 339.911111 0 0 0 230.684444-321.479111z m-334.961777 239.559111a179.655111 179.655111 0 1 1 0-359.310222 179.655111 179.655111 0 1 1 0 359.310222z" fill="#0e932e" p-id="1537" data-spm-anchor-id="a313x.search_index.0.i0.37253a81B17Cz8" class="selected"></path><path d="M512 435.2a90.282667 90.282667 0 0 0-88.405333 88.234667A88.291556 88.291556 0 1 0 512 435.2z" fill="#0e932e" p-id="1538" data-spm-anchor-id="a313x.search_index.0.i5.37253a81B17Cz8" class="selected"></path></svg>';
  // 生成 icon blob
  const svgBlob = new Blob([svgIcon], {
    type: "image/svg+xml;charset=utf-8",
  });
  const DOMURL = window.URL || window.webkitURL || window;
  // 通过图像加载器加载图像
  const img = new Image();
  // 设置图像加载完成的回调
  const url = DOMURL.createObjectURL(svgBlob);
  img.onload = function () {
    const { width, height, size } = iconConfig;
    // 图像加载完成，使用 Canvas 绘制图像
    ctx.drawImage(img, 0, 0, width, height);
    // 绘制红色圆点
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(width - size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    ctx.fill();
    if (number > 0) {
      // 绘制完圆点以后，绘制数字
      // 设置文本颜色为白色
      ctx.fillStyle = "white";
      // 根据传入的数字大小设置字体大小
      const fontSize =
        number <= 9 ? 42 * dpr : number <= 99 ? 36 * dpr : 32 * dpr;
      // 设置字体大小和类型
      ctx.font = `bold ${fontSize}px Arial`;
      // 设置文本水平居中
      ctx.textAlign = "center";
      // 设置文本垂直居中
      ctx.textBaseline = "middle";
      // 计算文本的x坐标
      const textX = (iconConfig.width - iconConfig.size / 2) * dpr;
      // 计算文本的y坐标
      const textY = (iconConfig.size / 2) * dpr;
      // 不超过 99 的数字，直接转为字符串，超过 99 的数字，转为 "99+"
      const numStr = number > 99 ? "99+" : number.toString();
      // 在Canvas上绘制文本
      ctx.fillText(numStr, textX, textY);
    }
    // 将 Canvas 转换为 base64 编码的图像
    const base64Image = canvas.toDataURL("image/png");
    // 更新 icon
    updateFavicon(base64Image);
    // 清理资源
    DOMURL.revokeObjectURL(url);
  };
  img.src = url;
}

const Layout: React.FC<ILayoutProps> = () => {
  const pageVisible = usePageVisibility();
  useEffect(() => {
    /**
     * 模拟客户端收到请求，然后给 Service Worker 发送消息
     */
    setTimeout(() => {
      navigator.serviceWorker.controller?.postMessage({
        type: "notification",
        title: "您好，我是 AI 助手",
        options: {
          body: "邀请你一起学习 HTML5 最新知识",
          icon: "/assets/images/AIBot.png",
          actions: [
            {
              action: "show-book",
              title: "查看文档",
            },
            {
              action: "send-email",
              title: "联系我们",
            },
          ],
        },
      });
    }, 1000 * 5);
    /**
     * 客户端处理 service-worker 发送的消息
     */
    navigator.serviceWorker.addEventListener("message", (e) => {
      console.log(
        `receive post-message from service-worker, action is: `,
        e.data
      );
      if (e.data && e.data.type === "notification") {
        // 修改 icon
        updateFaviconWithNumber(e.data.number);
      }
    });
  }, []);
  useEffect(() => {
    pageVisible && updateFavicon("/monitor.svg");
  }, [pageVisible]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
