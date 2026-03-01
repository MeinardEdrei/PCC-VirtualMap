import { useState } from "react";
import PannellumViewer from "./PannellumViewer";
import { Home, MapPin, Pencil, Users, Play, ArrowLeft, ChevronRight, Menu, X } from "lucide-react";

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
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "MiddleofGrounds3", text: "Forward" },
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "SideofGrounds", text: "That" },
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "OtherSideofGrounds", text: "This" },
      { pitch: -6.754, yaw: 179.650, type: "scene", sceneId: "MiddleofGrounds", text: "Back" },
    ],
  },
MiddleofGrounds3: {
    id: "MiddleofGrounds3",
    label: "Middle of Grounds",
    panorama: "/360_images/grounds/IMG9.jpg",
    hotSpots: [
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "MiddleofGrounds4", text: "Forward" },
      { pitch: -6.754, yaw: 179.650, type: "scene", sceneId: "MiddleofGrounds2", text: "Back" },
    ],
  },
  MiddleofGrounds4: {
    id: "MiddleofGrounds4",
    label: "Middle of Grounds",
    panorama: "/360_images/grounds/IMG10.jpg",
    hotSpots: [
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "MiddleofGrounds5", text: "Forward" },
      { pitch: -6.754, yaw: 179.650, type: "scene", sceneId: "MiddleofGrounds3", text: "Back" },
    ],
  },
  SideofGrounds: {
    id: "SideofGrounds",
    label: "Side of Grounds",
    panorama: "/360_images/grounds/IMG11.jpg",
    hotSpots: [
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "SideofGrounds2", text: "Forward" },
      { pitch: -6.754, yaw: 179.650, type: "scene", sceneId: "MiddleofGrounds4", text: "Back" },
    ],
  },
  SideofGrounds2: {
    id: "SideofGrounds2",
    label: "Side of Grounds",
    panorama: "/360_images/grounds/IMG12.jpg",
    hotSpots: [
      { pitch: -6.754, yaw: 179.650, type: "scene", sceneId: "SideofGrounds", text: "Back" },
    ],
  },
  OtherSideofGrounds: {
    id: "OtherSideofGrounds",
    label: "Other Side of Grounds",
    panorama: "/360_images/grounds/IMG13.jpg",
    hotSpots: [
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "MiddleofGrounds2", text: "Back" },
    ],
  },
  OtherOtherSideofGrounds: {
    id: "OtherOtherSideofGrounds",
    label: "Other Other Side of Grounds",
    panorama: "/360_images/grounds/IMG14.jpg",
    hotSpots: [
      { pitch: -3.901, yaw: 9.606,   type: "scene", sceneId: "MiddleofGrounds", text: "Back" },
    ],
  },
  JHSHallway1: {
    id: "JHSHallway1",
    label: "JHS Hallway",
    panorama: "/360_images/JHS BUILDING/JHSHallway1.jpg",
    hotSpots: [
      { pitch: -12.937, yaw: -4.072, type: "scene", sceneId: "Inside1", text: "Back" },
      { pitch: -6.029, yaw: 172.077, type: "scene", sceneId: "JHSHallway2", text: "Forward" },
    ],
  },
  JHSHallway2: {
    id: "JHSHallway2",
    label: "JHS Hallway",
    panorama: "/360_images/JHS BUILDING/JHSHallway2.jpg",
    hotSpots: [
      { pitch: -12.937, yaw: -4.072, type: "scene", sceneId: "JHSHallway3", text: "Forward" },
      { pitch: -6.029, yaw: 172.077, type: "scene", sceneId: "JHSHallway1", text: "Back" },
      { pitch: -12.891, yaw: -94.283, type: "scene", sceneId: "OtherOtherSideofGrounds", text: "Forward" },
    ],
  },
  JHSHallway3: {
    id: "JHSHallway3",
    label: "JHS Hallway",
    panorama: "/360_images/JHS BUILDING/JHSHallway3.jpg",
    hotSpots: [
      { pitch: -10.974, yaw: -68.421, type: "scene", sceneId: "JHSHallway4", text: "Forward" },
      { pitch: -8.242, yaw: 109.059, type: "scene", sceneId: "JHSHallway2", text: "Back" },
    ],
  },
  JHSHallway4: {
    id: "JHSHallway4",
    label: "JHS Hallway",
    panorama: "/360_images/JHS BUILDING/JHSHallway4.jpg",
    hotSpots: [
      { pitch: -8.607, yaw: -58.601, type: "scene", sceneId: "JHSHallway5", text: "Forward" },
      { pitch: -9.836, yaw: 120.497, type: "scene", sceneId: "JHSHallway3", text: "Back" },
    ],
  },
  JHSHallway5: {
    id: "JHSHallway5",
    label: "JHS Hallway",
    panorama: "/360_images/JHS BUILDING/JHSHallway5.jpg",
    hotSpots: [
      { pitch: -11.371, yaw: 11.421, type: "scene", sceneId: "JHSHallway6", text: "Forward" },
      { pitch: -5.296, yaw: -155.691, type: "scene", sceneId: "JHSHallway4", text: "Back" },
    ],
  },
  JHSHallway6: {
    id: "JHSHallway6",
    label: "JHS Hallway",
    panorama: "/360_images/JHS BUILDING/JHSHallway6.jpg",
    hotSpots: [
      { pitch: -19.553, yaw: 122.337, type: "scene", sceneId: "Upstairs", text: "Forward" },
      { pitch: -6.625, yaw: 2.182, type: "scene", sceneId: "JHSHallway5", text: "Back" },
    ],
  },
  Upstairs: {
    id: "Upstairs",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs.jpg",
    hotSpots: [
      { pitch: -26.989, yaw: 22.529, type: "scene", sceneId: "JHSHallway6", text: "Back" },
      { pitch: -5.235, yaw: -6.830, type: "scene", sceneId: "JHSUpstairs1", text: "Forward" },
    ],
  },
  JHSUpstairs1: {
    id: "JHSUpstairs1",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs1.jpg",
    hotSpots: [
      { pitch: -3.159, yaw: 122.602, type: "scene", sceneId: "Upstairs", text: "Back" },
      { pitch: -4.616, yaw: -62.144, type: "scene", sceneId: "JHSUpstairs2", text: "Forward" },
    ],
  },
  JHSUpstairs2: {
    id: "JHSUpstairs2",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs2.jpg",
    hotSpots: [
      { pitch: -9.898, yaw: -117.952, type: "scene", sceneId: "JHSUpstairs1", text: "Back" },
      { pitch: -4.394, yaw: 63.680, type: "scene", sceneId: "JHSUpstairs3", text: "Forward" },
    ],
  },
  JHSUpstairs3: {
    id: "JHSUpstairs3",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs3.jpg",
    hotSpots: [
      { pitch: -4.608, yaw: -21.547, type: "scene", sceneId: "JHSUpstairs2", text: "Back" },
      { pitch: -9.759, yaw: 156.836, type: "scene", sceneId: "JHSUpstairs4", text: "Forward" },
    ],
  },
  JHSUpstairs4: {
    id: "JHSUpstairs4",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs4.jpg",
    hotSpots: [
      { pitch: -142.649, yaw: -58.600, type: "scene", sceneId: "JHSUpstairs3", text: "Back" },
      { pitch: 4.259, yaw: 39.453, type: "scene", sceneId: "JHSUpstairs5", text: "Forward" },
    ],
  },
  JHSUpstairs5: {
    id: "JHSUpstairs5",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs5.jpg",
    hotSpots: [
      { pitch: -22.634, yaw: -99.283, type: "scene", sceneId: "JHSUpstairs4", text: "Back" },
      { pitch: -5.976, yaw: 3.075, type: "scene", sceneId: "JHSUpstairs6", text: "Forward" },
    ],
  },
  JHSUpstairs6: {
    id: "JHSUpstairs6",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs6.jpg",
    hotSpots: [
      { pitch: -4.333, yaw: 145.376, type: "scene", sceneId: "JHSUpstairs5", text: "Back" },
      { pitch: -3.816, yaw: -32.177, type: "scene", sceneId: "JHSUpstairs7", text: "Forward" },
    ],
  },
  JHSUpstairs7: {
    id: "JHSUpstairs7",
    label: "JHS Upstairs",
    panorama: "/360_images/JHS BUILDING/JHSUpstairs7.jpg",
    hotSpots: [
      { pitch: -3.528, yaw: 16.691, type: "scene", sceneId: "JHSUpstairs6", text: "Back" },
      { pitch: -8.543, yaw: -152.219, type: "scene", sceneId: "JHSUpstairs8", text: "Forward" },
    ],
  },
  GradeSchool1: {
    id: "GradeSchool1",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE1.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool2", text: "Forward" },
    ],
  },
  GradeSchool2: {
    id: "GradeSchool2",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE2.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool3", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool1", text: "Back" },
    ],
  },
  GradeSchool3: {
    id: "GradeSchool3",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE3.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool4", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool2", text: "Back" },
    ],
  },
  GradeSchool4: {
    id: "GradeSchool4",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE4.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool5", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool3", text: "Back" },
    ],
  },
  GradeSchool5: {
    id: "GradeSchool5",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE5.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool6", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool4", text: "Back" },
    ],
  },
  GradeSchool6: {
    id: "GradeSchool6",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE6.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool7", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool5", text: "Back" },
    ],
  },
  GradeSchool7: {
    id: "GradeSchool7",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE7.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool8", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool6", text: "Back" },
    ],
  },
  GradeSchool8: {
    id: "GradeSchool8",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE8.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool9", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool7", text: "Back" },
    ],
  },
  GradeSchool9: {
    id: "GradeSchool9",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE9.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool10", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool8", text: "Back" },
    ],
  },
  GradeSchool10: {
    id: "GradeSchool10",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE10.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool11", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool9", text: "Back" },
    ],
  },
  GradeSchool11: {
    id: "GradeSchool11",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE11.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "GradeSchool12", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool10", text: "Back" },
    ],
  },

  GradeSchool12: {
    id: "GradeSchool12",
    label: "GradeSchool",
    panorama: "/360_images/GradeSchoolBuilding/GS_IMAGE12.jpg",
    hotSpots: [
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "GradeSchool11", text: "Forward" },
    ],
  },
  SHS1: {
    id: "SHS1",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE1.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS2", text: "Forward" },
    ],
  },
  SHS2: {
    id: "SHS2",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE2.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS3", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS1", text: "Back" },
    ],
  },
  SHS3: {
    id: "SHS3",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE3.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS4", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS2", text: "Back" },
    ],
  },
  SHS4: {
    id: "SHS4",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE4.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS5", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS3", text: "Back" },
    ],
  },
  SHS5: {
    id: "SHS5",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE5.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS6", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS4", text: "Back" },
    ],
  },
  SHS6: {
    id: "SHS6",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE6.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS7", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS5", text: "Back" },
    ],
  },
  SHS7: { id: "SHS7", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE7.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS8", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS6", text: "Back" },
    ],
  },
  SHS8: { id: "SHS8", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE8.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS9", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS7", text: "Back" },
    ],
  },
  SHS9: { id: "SHS9", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE9.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS10", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS8", text: "Back" },
    ],
  },
  SHS10: { id: "SHS10", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE10.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS11", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS9", text: "Back" },
    ],
  },
  SHS11: { id: "SHS11", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE11.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS12", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS10", text: "Back" },
    ],
  },
  SHS12: { id: "SHS12", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE12.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS13", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS11", text: "Back" },
    ],
  },
  SHS13: { id: "SHS13", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE13.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS14", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS12", text: "Back" },
    ],
  },
  SHS14: { id: "SHS14", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE14.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS15", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS13", text: "Back" },
    ],
  },
  SHS15: { id: "SHS15", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE15.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHSBuildingExit", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS14", text: "Back" },
    ],
  },
  SHS16: { id: "SHS16", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE16.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS17", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS15", text: "Back" },
    ],
  },
  SHS17: { id: "SHS17", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE17.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHSBuildingExit", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS16", text: "Back" },
    ],
  },
  SHS18: { id: "SHS18", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE18.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS19", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS17", text: "Back" },
    ],
  },
  SHS19: { id: "SHS19", label: "SHS Building", panorama: "/360_images/SHS BUILDING/SHS_IMAGE19.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHSBuildingExit", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS18", text: "Back" },
    ],
  },
  SHS20: {
    id: "SHS20",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE20.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS21", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS19", text: "Back" },
    ],
  },
  SHS21: {
    id: "SHS21",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE21.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS22", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS20", text: "Back" },
    ],
  },
  SHS22: {
    id: "SHS22",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE22.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS23", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS21", text: "Back" },
    ],
  },
  SHS23: {
    id: "SHS23",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE23.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS24", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS22", text: "Back" },
    ],
  },
  SHS24: {
    id: "SHS24",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE24.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS25", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS23", text: "Back" },
    ],
  },
  SHS25: {
    id: "SHS25",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE25.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS26", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS24", text: "Back" },
    ],
  },
  SHS26: {
    id: "SHS26",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE26.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS27", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS25", text: "Back" },
    ],
  },
  SHS27: {
    id: "SHS27",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE27.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS28", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS26", text: "Back" },
    ],
  },
  SHS28: {
    id: "SHS28",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE28.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS29", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS27", text: "Back" },
    ],
  },
  SHS29: {
    id: "SHS29",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE29.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS30", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS28", text: "Back" },
    ],
  },
  SHS30: {
    id: "SHS30",
    label: "SHS Building",
    panorama: "/360_images/SHS BUILDING/SHS_IMAGE30.jpg",
    hotSpots: [
      { pitch: -3.527527259737495, yaw: 16.691160911568343, type: "scene", sceneId: "SHS31", text: "Forward" },
      { pitch: -8.542825785295905, yaw: -152.21850287429749, type: "scene", sceneId: "SHS29", text: "Back" },
    ],
  },
}

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

const Img = ({ src, alt, className, style }) => (
  <img
    src={src} alt={alt} className={className} style={style}
    onError={e => { e.target.onerror = null; e.target.src = `https://placehold.co/800x600/2a0a0a/ffffff?text=${encodeURIComponent(alt)}`; }}
  />
);

const Header = ({ setView, currentView }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { label: "HOME",         Icon: Home,   id: "HOME"     },
    { label: "VIRTUAL TOUR", Icon: MapPin, id: "TOUR"     },
    { label: "FEEDBACK",     Icon: Pencil, id: "FEEDBACK" },
    { label: "ABOUT US",     Icon: Users,  id: "ABOUT"    },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-10 py-5 text-white">
      {/* Logo + school name */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={() => setView("HOME")}
      >
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center rounded-full overflow-hidden bg-transparent border-none">
          <Img src="/images/pcc-logo.png" alt="PCC Logo" className="w-full h-full object-contain scale-[1.3] block" />
        </div>
        <div className="flex flex-col leading-[1.15] font-sans leading-none">
          <span className="text-[18px] md:text-[15px] font-thin tracking-widest opacity-95">PASIG</span>
          <span className="text-[18px] md:text-[15px] font-thin tracking-widest opacity-95">CATHOLIC</span>
          <span className="text-[18px] md:text-[15px] font-thin tracking-widest opacity-95">COLLEGE</span>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        {items.map(({ label, Icon, id }) => (
          <button
            key={id}
            onClick={() => setView(id)}
            className={`flex items-center gap-2 transition-opacity ${
              currentView === id ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Icon size={18} strokeWidth={1.5} />
            <span className="text-[11px] font-semibold tracking-[0.18em]">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const EvaluationPage = ({ onStartTour }) => (
  <div className="min-h-screen flex flex-col relative bg-[#2a0a0a] overflow-hidden font-sans">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2a0a0a]/90 via-[#2a0a0a]/40 to-[#2a0a0a]/90 z-10" />
      <Img src="/images/pcc-bg-fade.jpg" className="w-full h-full object-cover opacity-30" alt="Background" />
    </div>

    <main className="relative z-10 flex flex-1 items-center justify-center px-12 py-20">
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row items-center gap-20">

        {/* QR double-frame */}
        <div className="flex-shrink-0 w-[480px] h-[480px] bg-[#333333] rounded-[60px] p-10 shadow-2xl flex items-center justify-center border border-white/5">
          <div className="bg-white p-8 rounded-[45px] w-full h-full shadow-inner flex items-center justify-center">
            <Img src="/images/QR.png" alt="Evaluation QR" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-white text-center lg:text-left">
          <h1 className="text-7xl md:text-8xl lg:text-[110px] font-black italic uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-2xl">
            EVALUATION <br /> FORM
          </h1>
          <p className="text-lg md:text-2xl font-light leading-snug opacity-80 mb-12 max-w-2xl mx-auto lg:mx-0">
            Your feedback is greatly appreciated, as it will help us improve our website.
            Your responses will be kept confidential and will be used solely to enhance our final output. Thank you!
          </p>

          {/* Tour preview card */}
          <div
            className="relative w-full max-w-[550px] h-[280px] rounded-[50px] overflow-hidden border border-white/20 shadow-2xl cursor-pointer group"
            onClick={onStartTour}
          >
            <Img src="/images/preview.jpg" alt="Preview" className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button className="flex items-center gap-4 bg-[#8b1515] hover:bg-[#a31a1a] transition-all text-white px-8 py-2 rounded-[22px] shadow-xl mb-4">
                <span className="text-2xl font-bold tracking-tight">START</span>
                <Play size={26} fill="white" stroke="none" />
              </button>
              <span className="text-4xl md:text-5xl font-black italic uppercase tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                VIRTUAL TOUR
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const LandingPage = ({ onStartTour }) => (
  <div className="min-h-screen flex flex-col relative bg-[#1c0808] overflow-x-hidden font-sans">
    <div className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/pcc-bg-fade.jpg')", filter: "brightness(0.6)" }} />

    <main className="relative z-10 flex flex-1 items-center mt-20">
      <div className="w-full bg-white/10 my-20 backdrop-blur-xl border-y border-white/20 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3)] py-12 md:py-15 px-6 md:px-15 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-white text-center lg:text-left">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[60px] text-shadow-lg/30 font-black tracking-tight leading-none mb-6 md:mb-10">
            PCC'S VIRTUAL TOUR
          </h1>
          <p className="text-lg text-shadow-md/20 sm:text-2xl md:text-3xl font-light leading-snug opacity-95 max-w-2xl mx-auto lg:mx-0">
            The Virtual tour of Pasig Catholic College is built for its users who want
            to see the beauty of the campus, and for those who are seeking guidance of
            what there destined location looks like.
          </p>
        </div>
        <div className="relative w-full max-w-[660px]">
          <div className="aspect-video rounded-[30px] md:rounded-[50px] overflow-hidden border border-white/20 shadow-2xl relative">
            <Img src="/images/preview.jpg" alt="Preview" className="w-full h-full object-cover" />
            <button onClick={onStartTour}
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex items-center gap-4 bg-[#8b1515] hover:bg-[#a31a1a] transition-all text-white px-5 py-2 md:pl-8 md:pr-4 md:py-3 rounded-2xl md:rounded-[24px] shadow-2xl group">
              <span className="text-xl md:text-3xl font-bold tracking-tight">START</span>
              <div className="border-[1.5px] border-white/50 rounded-lg p-1 group-hover:border-white transition-colors">
                <Play size={20} className="md:w-7 md:h-7" fill="white" stroke="none" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </main>

    {/* <div className="relative h-48 md:h-64 z-10 bg-gradient-to-t from-[#8b1515] to-transparent">
      <div className="absolute inset-0 bg-cover bg-bottom opacity-40 mix-blend-overlay"
        style={{ backgroundImage: "url('/images/pcc-arches.png')" }} />
    </div> */}

    <div className="relative z-10 bg-gradient-to-b from-[#8b1515] via-[#8b1515] to-[#181818] py-0 md:py-0 px-6 md:px-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
      <Img src="/images/pcc-logo.png" alt="Big Logo" className="w-40 h-40 md:w-48 md:h-48 drop-shadow-xl" />
      <h2 className="text-white text-shadow-lg/30 text-5xl sm:text-7xl md:text-[95px] font-semibold tracking-tight leading-none">
        PASIG CATHOLIC COLLEGE
      </h2>
    </div>

    <footer className="relative z-10 bg-black/40 py-4 px-6 md:px-12 flex flex-col lg:flex-row justify-between items-center text-[10px] md:text-xs font-light text-white/50 tracking-wider gap-4">
      <div className="flex gap-4 md:gap-8 flex-wrap justify-center">
        <span>English (US)</span><span className="opacity-40">/</span>
        <span>info@pccnet.edu.ph</span><span className="opacity-40">/</span>
        <span>286427451</span>
      </div>
      <div className="flex gap-8 md:gap-12 flex-wrap justify-center">
        <span>Privacy</span><span>Terms & Conditions</span>
        <span>Copyright © 2026 All rights reserved.</span>
      </div>
    </footer>
  </div>
);

const TourDashboard = () => {
  const [currentScene, setCurrentScene] = useState("Entrance1");
  const pannellumConfig = buildPannellumConfig("Entrance1");

  return (
    <div className="w-full bg-[#120505] flex flex-col relative overflow-hidden font-sans" style={{ height: "100vh", pointerEvents: "all" }}>
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row px-4 pb-4 pt-24 md:px-10 md:pb-10 gap-4" style={{ minHeight: 0 }}>
        <aside className="w-full lg:w-72 rounded-3xl md:rounded-[40px] flex flex-col p-6 md:p-8 text-white shadow-2xl border border-white/10 bg-gradient-to-b from-[#8b1515] to-[#4b0c0c] flex-shrink-0" style={{ minHeight: 0 }}>
          <p className="text-[10px] tracking-[0.3em] font-bold opacity-50 mb-4">LOCATIONS</p>
          <div className="flex flex-col flex-1 gap-1 overflow-y-auto pr-2">
            {Object.values(SCENES).map((s) => (
              <button key={s.id} onClick={() => setCurrentScene(s.id)}
                className={`flex items-center justify-between text-left py-3 px-4 rounded-xl transition-all ${currentScene === s.id ? "bg-white/20 font-bold" : "hover:bg-white/10 opacity-70"}`}>
                <span className="text-sm">{s.label}</span>
                {currentScene === s.id && <ChevronRight size={16} />}
              </button>
            ))}
          </div>
          <button onClick={() => window.location.reload()}
            className="mt-4 border border-white/30 hover:bg-white hover:text-[#8b1515] transition-all rounded-xl py-3 text-xs font-bold flex items-center gap-2 justify-center">
            <ArrowLeft size={14} /> EXIT TOUR
          </button>
        </aside>

        <div className="flex-1 rounded-3xl md:rounded-[50px] overflow-hidden border-2 border-white/5 relative bg-black shadow-inner" style={{ minHeight: 0 }}>
          <PannellumViewer
            config={pannellumConfig}
            currentScene={currentScene}
            onSceneChange={(id) => setCurrentScene(id)}
          />
        </div>
      </div>
    </div>
  );
};

const TEAM = [
  {
    name: "HEATHER KATE. AMBITO",
    role: "LEADER",
    title: "Product Manager",
    quote: '“You dont need to be a genius to build something great on the web. You just need the patience to fix one broken line of code at a time.”',
    image: "/images/HEATHER.jpg",
    imageLabel: "HEATHER'S PICTURE",
  },
  {
    name: "Acer Canlas",
    role: "DEVELOPER",
    title: "Assitant Leader",
    quote: '"The best thing about learning to code in Grade 12? You arent just looking at the future—youre the one typing it into existence."',
    image: "/images/CANLAS.jpg",
    imageLabel: "MEMBER'S PICTURE",
  },
  {
    name: "Amielle Huang",
    role: "DESIGNER",
    title: "UI/UX Designer",
    quote: '“I really want to learn more about the UI/UX industry, this is my first time trying to design, and I want to learn more."',
    image: "/images/HUANG.png",
    imageLabel: "MEMBER'S PICTURE",
  },
  {
    name: "Carlos Yuan Silva",
    role: "DEVELOPER",
    title: "Lead Programmer",
    quote: '“Dont let a screen full of errors discourage you. Every bug you find is just a free lesson in how to be a better developer tomorrow”',
    image: "/images/SILVA.jpg",
    imageLabel: "MEMBER'S PICTURE",
  },
  {
    name: "Lrak Carlos",
    role: "MEMBER",
    title: null,
    quote: null,
    image: "/images/DEFAULT.jpg",
    imageLabel: "MEMBER'S PICTURE",
  },
  {
    name: "Kenzo Cruz",
    role: "MEMBER",
    title: null,
    quote: null,
    image: "/images/DEFAULT.jpg",
    imageLabel: "MEMBER'S PICTURE",
  },
  {
    name: "Arnold Dampog",
    role: "MEMBER",
    title: null,
    quote: null,
    image: "/images/DEFAULT.jpg",
    imageLabel: "MEMBER'S PICTURE",
  },
  {
    name: "Ryu Islo",
    role: "MEMBER",
    title: null,
    quote: null,
    image: "/images/DEFAULT.jpg",
    imageLabel: "MEMBER'S PICTURE",
  }
];

const AboutPage = () => (
  <div className="min-h-screen font-sans overflow-x-hidden relative" style={{ backgroundColor: "#7a1010" }}>

    {/* ── HERO ── */}
    <div className="relative w-full overflow-hidden" style={{ minHeight: "100vh" }}>
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse at 60% 0%, #a01818 0%, #5a0a0a 50%, #2a0505 100%)" }}
      />
      {/* Watermark */}
      <div
        className="absolute right-0 top-0 z-0 select-none pointer-events-none"
        style={{
          fontSize: "clamp(200px, 35vw, 500px)",
          fontWeight: 900,
          fontStyle: "italic",
          color: "rgba(255,255,255,0.04)",
          lineHeight: 1,
          letterSpacing: "-0.05em",
        }}
      >
        PCC
      </div>

      <div className="relative z-10 pt-28 pb-0 px-6 md:px-12 lg:px-20">
        {/* Subtitle */}
        <p
          className="text-white text-center mb-1 opacity-85"
          style={{ fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic", fontSize: "clamp(14px,2vw,22px)", letterSpacing: "0.05em" }}
        >
          The future is now
        </p>

        {/* TECHNOLOGY */}
        <h1
          className="text-center uppercase italic font-black leading-none mb-0 select-none"
          style={{ fontSize: "clamp(64px,14vw,180px)", color: "#f5a623", letterSpacing: "-0.02em", textShadow: "0 8px 40px rgba(0,0,0,0.5)", lineHeight: 0.9 }}
        >
          TECHNOLOGY
        </h1>

        {/* Campus image */}
        <div className="relative mx-auto my-0" style={{ maxWidth: "900px" }}>
          <div
            className="w-full overflow-hidden shadow-2xl"
            style={{ borderRadius: "18px", border: "3px solid rgba(255,255,255,0.12)", aspectRatio: "16/9" }}
          >
            <Img src="/images/preview.jpg" alt="PCC Campus" className="w-full h-full object-cover" style={{ filter: "brightness(0.92) saturate(1.1)" }} />
          </div>
        </div>

        {/* VIRTUAL CAMPUS */}
        <div className="relative" style={{ marginTop: "-0.15em" }}>
          <h2
            className="uppercase italic font-black leading-none select-none"
            style={{ fontSize: "clamp(56px,13vw,170px)", color: "#f5a623", letterSpacing: "-0.02em", textShadow: "0 8px 40px rgba(0,0,0,0.5)", lineHeight: 0.88 }}
          >
            VIRTUAL
          </h2>
          <h2
            className="uppercase italic font-black leading-none select-none"
            style={{ fontSize: "clamp(56px,13vw,170px)", color: "#f5a623", letterSpacing: "-0.02em", textShadow: "0 8px 40px rgba(0,0,0,0.5)", lineHeight: 0.88 }}
          >
            CAMPUS
          </h2>
        </div>
      </div>
    </div>

    {/* ── TEAM SECTION ── */}
    <div
      className="relative z-10 px-6 md:px-12 lg:px-20 py-16"
      style={{ background: "linear-gradient(to bottom, #5a0a0a 0%, #3a0606 60%, #2a0404 100%)" }}
    >
      <p className="text-white uppercase tracking-[0.4em] text-xs font-bold opacity-40 mb-10">
        Meet the Team
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {TEAM.map((member, i) => (
          <div
            key={i}
            className="relative flex flex-col"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", overflow: "hidden" }}
          >
            {/* Photo area */}
            <div
              className="w-full flex items-center justify-center relative"
              style={{ aspectRatio: "4/3", background: "#e8e0d8" }}
            >
              {member.image ? (
                <Img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#bbb", marginBottom: 8 }} />
                    <div style={{ width: 80, height: 40, borderRadius: "40px 40px 0 0", background: "#bbb" }} />
                  </div>
                  <p className="absolute bottom-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
                    {member.imageLabel}
                  </p>
                </>
              )}
            </div>

            {/* Info */}
            <div className="p-6 text-white flex-1 flex flex-col">
              <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                <span className="font-black text-sm tracking-wider" style={{ color: "#f0f0f0" }}>{member.name}</span>
                <span className="text-xs font-bold tracking-widest" style={{ color: "#f5a623" }}>— {member.role}</span>
              </div>
              <p className="text-sm font-semibold mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>{member.title}</p>
              <p
                className="text-xs leading-relaxed mt-auto"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Georgia,'Times New Roman',serif", fontStyle: "italic" }}
              >
                {member.quote}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* About blurb */}
      <div className="mt-16 max-w-3xl" style={{ borderLeft: "3px solid #f5a623", paddingLeft: "2rem" }}>
        <h3
          className="text-white font-black italic uppercase mb-4"
          style={{ fontSize: "clamp(28px,5vw,56px)", lineHeight: 1 }}
        >
          About the Project
        </h3>
        <p
          className="text-white/60 leading-relaxed"
          style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "1rem" }}
        >
          The PCC Virtual Campus Tour was created to give prospective students, parents,
          and visitors an immersive glimpse into Pasig Catholic College's beautiful grounds —
          from the iconic main gate to the heart of the campus — without leaving their homes.
          Built with cutting-edge 360° panoramic technology, this experience bridges the gap
          between physical visits and digital discovery.
        </p>
      </div>
    </div>

    {/* ── FOOTER STRIPE ── */}
    <div
      className="relative z-10 py-6 px-6 md:px-20 flex flex-col lg:flex-row justify-between items-center"
      style={{ background: "#1a0303", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <p className="text-white/30 text-xs tracking-widest">© 2026 Pasig Catholic College. All rights reserved.</p>
      <p className="text-white/20 text-xs tracking-wider mt-2 lg:mt-0">info@pccnet.edu.ph &nbsp;|&nbsp; 286427451</p>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState("HOME");

  const renderView = () => {
    switch (view) {
      case "HOME":     return <LandingPage onStartTour={() => setView("TOUR")} />;
      case "FEEDBACK": return <EvaluationPage onStartTour={() => setView("TOUR")} />;
      case "TOUR":     return <TourDashboard />;
      case "ABOUT":    return <AboutPage />;
      default:         return <LandingPage onStartTour={() => setView("TOUR")} />;
    }
  };

  return (
    <div className="App selection:bg-[#8b1515] selection:text-white relative">
      <Header setView={setView} currentView={view} />
      {renderView()}
    </div>
  );
}
