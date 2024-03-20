/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { Outlet } from "react-router-dom";

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = () => {
  // useEffect(() => {
  //   // 在需要绘制图标的地方执行以下代码

  //   var iconWidth = 64; // 图标宽度（像素）
  //   var iconHeight = 64; // 图标高度（像素）
  //   var dotSize = 32; // 圆点大小（像素）

  //   // 创建一个 Canvas 元素
  //   var canvas = document.createElement("canvas");
  //   canvas.width = iconWidth;
  //   canvas.height = iconHeight;
  //   var ctx = canvas.getContext("2d");

  //   // 绘制 SVG
  //   var svgString =
  //     '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1709792146900" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1536" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48"><path d="M853.333333 454.144a341.333333 341.333333 0 1 0-455.111111 321.479111c-72.647111 25.201778-120.092444 72.533333-120.092444 126.122667h458.24c0-53.646222-44.202667-100.920889-113.777778-126.122667a339.911111 339.911111 0 0 0 230.684444-321.479111z m-334.961777 239.559111a179.655111 179.655111 0 1 1 0-359.310222 179.655111 179.655111 0 1 1 0 359.310222z" fill="#0e932e" p-id="1537" data-spm-anchor-id="a313x.search_index.0.i0.37253a81B17Cz8" class="selected"></path><path d="M512 435.2a90.282667 90.282667 0 0 0-88.405333 88.234667A88.291556 88.291556 0 1 0 512 435.2z" fill="#0e932e" p-id="1538" data-spm-anchor-id="a313x.search_index.0.i5.37253a81B17Cz8" class="selected"></path></svg>';
  //   var DOMURL = window.URL || window.webkitURL || window;
  //   var img = new Image();
  //   var svgBlob = new Blob([svgString], {
  //     type: "image/svg+xml;charset=utf-8",
  //   });
  //   var url = DOMURL.createObjectURL(svgBlob);
  //   img.onload = function () {
  //     ctx.drawImage(img, 0, 0, iconWidth, iconHeight);

  //     // 绘制红色圆点
  //     ctx.beginPath();
  //     ctx.fillStyle = "red";
  //     ctx.arc(
  //       iconWidth - dotSize / 2,
  //       dotSize / 2,
  //       dotSize / 2,
  //       0,
  //       2 * Math.PI
  //     );
  //     ctx.fill();

  //     // 将 Canvas 转换为 base64 编码的图像
  //     var base64Image = canvas.toDataURL("image/png");

  //     console.log(base64Image, 333333);

  //     // 将 base64 图像设置为网站图标
  //     var link =
  //       document.querySelector("link[rel*='icon']") ||
  //       document.createElement("link");
  //     link.type = "image/png";
  //     link.rel = "icon";
  //     link.href = base64Image;
  //     document.getElementsByTagName("head")[0].appendChild(link);

  //     // 清理资源
  //     DOMURL.revokeObjectURL(url);
  //   };
  //   img.src = url;
  // }, []);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
