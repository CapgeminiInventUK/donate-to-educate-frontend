import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home/Home'));
const AboutUs = lazy(() => import('../pages/AboutUs/AboutUs'));
const Contact = lazy(() => import('../pages/Contact/Contact'));

const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export { Home, AboutUs, Contact, NotFound };
