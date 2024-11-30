import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./router/router";

import "./App.css";

const router = createBrowserRouter(mainRoutes);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
