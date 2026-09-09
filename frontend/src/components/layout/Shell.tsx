import React from 'react';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheckIcon, CompassIcon, HomeIcon, LuggageIcon, SparklesIcon } from 'lucide-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { cn } from '../../utils/format';
import { useAtlas } from '../../contexts/AtlasContext';

const mobileLinks = [
{ to: '/', label: 'Home', icon: HomeIcon },
{ to: '/explore', label: 'Explore', icon: CompassIcon },
{ to: '/assistant', label: 'Assistant', icon: SparklesIcon },
{ to: '/trips', label: 'Trips', icon: LuggageIcon },
{ to: '/bookings', label: 'Bookings', icon: CalendarCheckIcon }];


function MobileNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-surface/95 backdrop-blur-xl lg:hidden">
      
      <ul className="flex items-stretch justify-between px-2 py-1.5">
        {mobileLinks.map(({ to, label, icon: Icon }) =>
        <li key={to} className="flex-1">
            <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
            cn(
              'flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10.5px] font-medium transition-colors',
              isActive ? 'text-brand' : 'text-muted'
            )
            }>
            
              <Icon className="h-4.5 w-4.5" />
              {label}
            </NavLink>
          </li>
        )}
      </ul>
    </nav>);

}

export function Shell({
  children,
  withSidebar = false,
  withFooter = false,
  contained = true





}: {children: React.ReactNode;withSidebar?: boolean;withFooter?: boolean;contained?: boolean;}) {
  const location = useLocation();
  const { authUser, authLoading } = useAtlas();
  if (withSidebar && !authLoading && !authUser) return <Navigate to="/login" replace />;
  return (
    <div className="flex min-h-screen w-full flex-col bg-canvas">
      <Navbar />
      <div className="flex flex-1 items-start">
        {withSidebar && <Sidebar />}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className={cn('min-w-0 flex-1 pb-24 lg:pb-0', withSidebar ? 'px-5 py-8 lg:px-8' : '')}>
          
          <div className={cn(contained && (withSidebar ? 'mx-auto max-w-[1060px]' : ''))}>{children}</div>
        </motion.main>
      </div>
      {withFooter && <Footer />}
      <MobileNav />
    </div>);

}