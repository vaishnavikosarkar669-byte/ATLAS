import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AtlasProvider } from './contexts/AtlasContext';
import { Toaster } from './components/ui/Overlays';
import { Shell } from './components/layout/Shell';
import { HomePage } from './pages/Home';
import { ExplorePage } from './pages/Explore';
import { PlannerPage } from './pages/Planner';
import { ItineraryPage } from './pages/Itinerary';
import { AssistantPage } from './pages/Assistant';
import { TripsPage } from './pages/Trips';
import { BookingsPage } from './pages/Bookings';
import { LostFoundPage } from './pages/LostFound';
import { SavedPlacesPage } from './pages/SavedPlaces';
import { ProfilePage } from './pages/Profile';
import { SettingsPage } from './pages/Settings';
import { AboutPage } from './pages/About';
import { DashboardPage } from './pages/Dashboard';
import { FoodPage } from './pages/Food';
import { AuthPage } from './pages/Auth';
import { ActivitiesPage } from './pages/Activities';

export function App() {
  return (
    <AtlasProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
            <Shell withFooter>
                <HomePage />
              </Shell>
            } />
          
          <Route
            path="/about"
            element={
            <Shell withFooter>
                <AboutPage />
                <Route path="/login" element={<Shell><AuthPage /></Shell>} />
                <Route path="/register" element={<Shell><AuthPage /></Shell>} />
              </Shell>
            } />
          
          <Route
            path="/assistant"
            element={
            <Shell contained={false}>
                <AssistantPage />
              </Shell>
            } />
          
          {[
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/explore', element: <ExplorePage /> },
          { path: '/plan', element: <PlannerPage /> },
          { path: '/itinerary', element: <ItineraryPage /> },
          { path: '/trips', element: <TripsPage /> },
          { path: '/bookings', element: <BookingsPage /> },
          { path: '/food', element: <FoodPage /> },
          { path: '/activities', element: <ActivitiesPage /> },
          { path: '/lost-found', element: <LostFoundPage /> },
          { path: '/saved', element: <SavedPlacesPage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/settings', element: <SettingsPage /> }].
          map((route) =>
          <Route key={route.path} path={route.path} element={<Shell withSidebar>{route.element}</Shell>} />
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AtlasProvider>);

}