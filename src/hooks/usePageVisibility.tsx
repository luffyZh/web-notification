import { useEffect, useState } from "react";

export default function usePageVisibility() {
  const [pageVisible, setPageVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return pageVisible;
}
