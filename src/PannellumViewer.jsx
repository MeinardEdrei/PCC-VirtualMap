import { useEffect, useRef } from "react";

/**
 * PannellumViewer
 * Wraps the vanilla Pannellum library (loaded via CDN in index.html).
 * Supports full multi-scene tour config with hotspots.
 *
 * Props:
 *  config      — full Pannellum config object (scenes + default block)
 *  currentScene — if provided, the viewer will jump to this scene on change
 *  onSceneChange — callback(sceneId) fired when scene changes via hotspot click
 */
export default function PannellumViewer({ config, currentScene, onSceneChange }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  // Initialize Pannellum once on mount
  useEffect(() => {
    if (!window.pannellum || !containerRef.current) return;

    viewerRef.current = window.pannellum.viewer(containerRef.current, config);

    // Sync sidebar when user navigates via in-panorama hotspot arrows
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once

  // When currentScene prop changes (sidebar click), load that scene
  useEffect(() => {
    if (!viewerRef.current || !currentScene) return;
    if (viewerRef.current.getScene() !== currentScene) {
      viewerRef.current.loadScene(currentScene);
    }
  }, [currentScene]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
