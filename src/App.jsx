"use client";

import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import "./index.css";

export default function App() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <Canvas
        className="canvas"
        shadows
        camera={{ position: [0, 0, 1], fov: 30 }}
      >
        <Experience />
      </Canvas>
    </>
  );
}
