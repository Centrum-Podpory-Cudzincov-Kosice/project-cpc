import { createBrowserRouter } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import NewsListPage from "./pages/NewsList";
import NewsPage from "./pages/News";
import EventsListPage from "./pages/EventsList";
import EventPage from "./pages/Event";
import ImmigrantsMapPage from "./pages/ImmigrantsMap";
import PartnersPage from "./pages/Partners";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/news",
                element: <NewsListPage />
            },
            {
                path: "/news/:id",
                element: <NewsPage />
            },
            {
                path: "/events",
                element: <EventsListPage />
            },
            {
                path: "/event/:id",
                element: <EventPage />
            },
            {
                path: "/immigrants-map",
                element: <ImmigrantsMapPage />
            },
            {
                path: "/partners",
                element: <PartnersPage />
            }
        ]
    }
]);