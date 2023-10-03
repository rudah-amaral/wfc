import React from "react";
import ReactDOM from "react-dom/client";
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "@/global.scss";
import NavBar from "@/components/NavBar";

import Home from "@/pages/Home";
import { Generator, generatorLoader, GeneratorError } from "@/pages/Generator";
import About from "@/pages/About";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<Home />} />
      <Route
        path="generator"
        element={<Generator />}
        loader={generatorLoader}
        errorElement={<GeneratorError />}
      />
      <Route path="about" element={<About />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
