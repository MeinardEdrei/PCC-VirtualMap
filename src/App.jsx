import { useState } from "react";
import PannellumViewer from "./PannellumViewer";
import { Home, MapPin, MessageSquare, Users, Play, ArrowLeft, ChevronRight } from "lucide-react";

const SCENES = {
  Entrance1: {
    id: "Entrance1",
    label: "PCC Entrance",
    panorama: "/360_images/grounds/OUTSIDE_IMAGE1.jpg",
    hotSpots: [
      { pitch: -0.914, yaw: -7.992, type: "scene", sceneId: "Entrance2", text: "PCC Pathway" },
    ],
  },
  Entrance2: {
    id: "Entrance2",
    label: "PCC Entrance",
    panorama: "/360_images/grounds/OUTSIDE_IMAGE2.jpg",
    hotSpots: [
      { pitch: -14.778, yaw: 16.658,  type: "scene", sceneId: "Entrance3", text: "Forward" },
      { pitch: -22.931, yaw: 166.730, type: "scene", sceneId: "Entrance1", text: "Back" },
    ],
  },
  Entrance3: {
    id: "Entrance3",
    label: "Facade",
    panorama: "/360_images/grounds/IMG3.jpg",
    hotSpots: [
      { pitch: -13.476, yaw: 25.924,  type: "scene", sceneId: "Entrance4", text: "Forward" },
      { pitch: -12.577, yaw: -88.195, type: "scene", sceneId: "Entrance2", text: "Back" },
    ],
  },
  Entrance4: {
    id: "Entrance4",
    label: "Main Gate",
    panorama: "/360_images/grounds/IMG4.jpg",
    hotSpots: [
      { pitch: -12.937, yaw: -4.072,  type: "scene", sceneId: "Inside1",   text: "Enter Campus" },
      { pitch: -4.142,  yaw: 159.582, type: "scene", sceneId: "Entrance3", text: "Back" },
    ],
  },
  Inside1: {
    id: "Inside1",
    label: "PCC Grounds",
    panorama: "/360_images/grounds/IMG5.jpg",
    hotSpots: [
      { pitch: -10.458, yaw: -4.688,   type: "scene", sceneId: "Inside2",   text: "Forward" },
      { pitch: -24.274, yaw: -174.570, type: "scene", sceneId: "Entrance4", text: "Back to Gate" },
    ],
  },
  Inside2: {
    id: "Inside2",
    label: "PCC Grounds",
    panorama: "/360_images/grounds/IMG6.jpg",
    hotSpots: [
      { pitch: -12.244, yaw: -2.075,  type: "scene", sceneId: "Inside3",         text: "To Elevator" },
      { pitch: -14.013, yaw: 178.384, type: "scene", sceneId: "Inside1",          text: "Back" },
      { pitch: -18.849, yaw: 99.564,  type: "scene", sceneId: "MiddleofGrounds",  text: "Middle of Grounds" },
    ],
  },
  MiddleofGrounds: {
    id: "MiddleofGrounds",
    label: "Middle of Grounds",
    panorama: "/360_images/grounds/IMG7.jpg",
    hotSpots: [
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "MiddleofGrounds2", text: "Forward" },
      { pitch: -6.754, yaw: 179.650, type: "scene", sceneId: "Inside2",          text: "Back" },
    ],
  },
  MiddleofGrounds2: {
    id: "MiddleofGrounds2",
    label: "Middle of Grounds",
    panorama: "/360_images/grounds/IMG8.jpg",
    hotSpots: [
      // TODO: add hotspots once next scene images are ready
    ],
  },
};

function buildPannellumConfig(startScene = "Entrance1") {
  const scenes = {};
  Object.entries(SCENES).forEach(([key, s]) => {
    scenes[key] = {
      title: s.label,
      hfov: 110,
      type: "equirectangular",
      panorama: s.panorama,
      hotSpots: s.hotSpots,
    };
  });
  return {
    default: {
      firstScene: startScene,
      sceneFadeDuration: 500,
      autoLoad: true,
    },
    scenes,
  };
}

const NAV_ITEMS = [
  { label: "HOME",         icon: Home },
  { label: "VIRTUAL TOUR", icon: MapPin },
  { label: "FEEDBACK",     icon: MessageSquare },
  { label: "ABOUT US",     icon: Users },
];

const Header = ({ activePage = "HOME" }) => (
  <nav className="relative z-20 flex justify-between items-center px-10 py-5 text-white">
    <div className="flex items-center gap-4">
      <img src="/images/pcc-logo.png" alt="PCC Logo" className="w-14 h-14 object-contain drop-shadow-lg" />
      <div className="border-l border-white/40 pl-4 leading-tight">
        {["PASIG", "CATHOLIC", "COLLEGE"].map((w) => (
          <p key={w} className="text-sm font-light tracking-[0.22em]">{w}</p>
        ))}
      </div>
    </div>
    <div className="flex gap-10 items-center">
      {NAV_ITEMS.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className={`flex items-center gap-2 text-[11px] tracking-[0.18em] font-semibold transition-colors ${
            activePage === label ? "text-[#F58220]" : "text-white/70 hover:text-white"
          }`}
        >
          <Icon size={16} strokeWidth={1.8} />
          {label}
        </button>
      ))}
    </div>
  </nav>
);

const LandingPage = ({ onStart }) => (
  <div className="min-h-screen flex flex-col relative bg-[#1a0a0a] overflow-hidden font-sans">
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/pcc-bg-fade.jpg')", filter: "brightness(0.25) saturate(0.8)" }}
    />
    <Header activePage="HOME" />
    <main className="relative z-10 flex flex-1 items-center">
      <div
        className="w-full py-14 px-20 flex items-center gap-12 shadow-2xl"
        style={{ background: "linear-gradient(105deg, #7B1113 0%, #a0200e 30%, #F58220 75%, #f9a040 100%)" }}
      >
        <div className="flex-1 text-white max-w-xl">
          <h1 className="text-6xl font-black tracking-tight leading-none mb-5 drop-shadow-xl">
            PCC'S<br />VIRTUAL TOUR
          </h1>
          <p className="text-lg font-light leading-relaxed opacity-90">
            The Virtual Tour of Pasig Catholic College is built for its users who want
            to see the beauty of the campus, and for those who are seeking guidance of
            what their destined location looks like.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
            style={{ width: 580, height: 340 }}
          >
            <img src="/images/preview.jpg" alt="Campus 360 Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <button
              onClick={onStart}
              className="absolute bottom-8 left-8 flex items-center gap-3 bg-[#7B1113] hover:bg-[#F58220] transition-all duration-300 text-white px-7 py-3 rounded-full font-black text-lg shadow-xl tracking-wide group"
            >
              START
              <span className="bg-white/20 group-hover:bg-white/30 rounded-full w-9 h-9 flex items-center justify-center transition-colors">
                <Play size={16} fill="white" className="ml-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const TourDashboard = () => {
  const [currentScene, setCurrentScene] = useState("Entrance1");
  const pannellumConfig = buildPannellumConfig("Entrance1");

  return (
    <div className="h-screen w-full bg-[#150a0a] flex flex-col relative overflow-hidden font-sans">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/images/pcc-bg-fade.jpg')" }}
      />
      <Header activePage="VIRTUAL TOUR" />
      <div className="relative z-10 flex flex-1 px-10 pb-10 gap-6 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside
          className="w-72 rounded-[36px] flex flex-col p-6 text-white shadow-2xl border border-white/10 flex-shrink-0"
          style={{ background: "linear-gradient(170deg, #F58220 0%, #c03a10 50%, #7B1113 100%)" }}
        >
          <p className="text-[10px] tracking-[0.25em] font-bold opacity-60 mb-4 uppercase">
            Select Location
          </p>
          <div className="flex flex-col flex-1 gap-1 overflow-y-auto">
            {Object.values(SCENES).map((scene) => (
              <button
                key={scene.id}
                onClick={() => setCurrentScene(scene.id)}
                className={`flex items-center justify-between text-left py-3.5 px-3 rounded-xl transition-all duration-200 ${
                  currentScene === scene.id
                    ? "bg-white/20 font-bold translate-x-1"
                    : "hover:bg-white/10 font-light opacity-80 hover:opacity-100 hover:translate-x-1"
                }`}
              >
                <span className="text-base leading-snug">{scene.label}</span>
                {currentScene === scene.id && (
                  <ChevronRight size={16} className="opacity-70 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentScene("Entrance1")}
            className="mt-4 border-2 border-white/50 hover:border-white hover:bg-white hover:text-[#7B1113] transition-all duration-200 text-white rounded-2xl py-3 px-5 text-xs font-black tracking-widest flex items-center gap-2 justify-center"
          >
            <ArrowLeft size={14} />
            BACK TO ENTRANCE
          </button>
        </aside>

        {/* ── Viewer ── */}
        <div
          className="flex-1 rounded-[48px] overflow-hidden shadow-2xl border-4 relative"
          style={{ borderColor: "rgba(245,130,32,0.6)" }}
        >
          <PannellumViewer
            config={pannellumConfig}
            currentScene={currentScene}
            onSceneChange={(sceneId) => setCurrentScene(sceneId)}
          />
          <div className="absolute top-5 left-5 pointer-events-none">
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-5 py-2 rounded-full border border-white/15">
              <MapPin size={14} className="text-[#F58220]" />
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                {SCENES[currentScene]?.label}
              </span>
            </div>
          </div>
          <div className="absolute bottom-5 right-5 pointer-events-none">
            <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10 text-white/60 text-[11px] tracking-wide">
              Click & drag to look around · Click arrows to navigate
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [started, setStarted] = useState(false);
  return (
    <div className="App selection:bg-[#F58220] selection:text-white">
      {started ? (
        <TourDashboard />
      ) : (
        <LandingPage onStart={() => setStarted(true)} />
      )}
    </div>
  );
}
