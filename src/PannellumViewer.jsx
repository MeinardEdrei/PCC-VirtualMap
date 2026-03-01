import { useEffect, useRef } from "react";

export default function PannellumViewer({ config, currentScene, onSceneChange }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!window.pannellum || !containerRef.current) return;

    const modifiedConfig = {
      ...config,
      default: {
        ...config.default,
        sceneFadeDuration: 0,
        autoLoad: true,
      },
    };

    viewerRef.current = window.pannellum.viewer(containerRef.current, modifiedConfig);

    if (onSceneChange) {
      viewerRef.current.on("scenechange", (sceneId) => {
        onSceneChange(sceneId);
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!viewerRef.current || !currentScene) return;
    if (viewerRef.current.getScene() === currentScene) return;

    const viewer = viewerRef.current;
    const startHfov = viewer.getHfov();
    const targetHfov = 30;
    const duration = 300;

    if (viewer._zoomAnimFrame) {
      cancelAnimationFrame(viewer._zoomAnimFrame);
    }

    // Preload the next scene's image before zooming
    const nextSceneConfig = config.scenes[currentScene];
    const preloadImg = new Image();

    const doTransition = () => {
      const startTime = performance.now();

      const zoomIn = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress * progress;
        viewer.setHfov(startHfov + (targetHfov - startHfov) * eased, false);

        if (progress < 1) {
          viewer._zoomAnimFrame = requestAnimationFrame(zoomIn);
        } else {
          viewer.loadScene(currentScene);

          const zoomOutStart = performance.now();
          const zoomOut = (now2) => {
            const elapsed2 = now2 - zoomOutStart;
            const progress2 = Math.min(elapsed2 / duration, 1);
            const eased2 = 1 - (1 - progress2) * (1 - progress2);
            viewer.setHfov(targetHfov + (startHfov - targetHfov) * eased2, false);

            if (progress2 < 1) {
              viewer._zoomAnimFrame = requestAnimationFrame(zoomOut);
            } else {
              viewer.setHfov(startHfov, false);
              viewer._zoomAnimFrame = null;
            }
          };
          viewer._zoomAnimFrame = requestAnimationFrame(zoomOut);
        }
      };

      viewer._zoomAnimFrame = requestAnimationFrame(zoomIn);
    };

    if (nextSceneConfig?.panorama) {
      preloadImg.onload = doTransition;
      preloadImg.onerror = doTransition; // proceed anyway if load fails
      preloadImg.src = nextSceneConfig.panorama;
    } else {
      doTransition();
    }
  }, [currentScene]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", pointerEvents: "all" }}
    />
  );
}
