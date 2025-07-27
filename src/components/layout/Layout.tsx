import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';


interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen  flex flex-col">
      {/* <Navbar /> */}
      <Header />
      <main className="flex-grow sm:px-32 px-2">{children}</main>
      <Footer />
    </div>
  );
};