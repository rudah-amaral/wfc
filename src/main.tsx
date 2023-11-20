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
import {
  About,
  AboutIndex,
  AboutAcknowledgments,
  AboutWhatIsWFC,
  AboutMe,
  AboutTheTech,
} from "@/pages/About";

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
      <Route path="about" element={<About />}>
        <Route index element={<AboutIndex />} />
        <Route path="acknowledgments" element={<AboutAcknowledgments />} />
        <Route path="what-is-wfc" element={<AboutWhatIsWFC />} />
        <Route path="the-tech" element={<AboutTheTech />} />
        <Route path="me" element={<AboutMe />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
