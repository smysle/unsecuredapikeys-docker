import { Link } from "@heroui/link";
import React, { useState } from "react";
import { Button } from "@heroui/button";

import { Navbar } from "@/components/navbar";
import Disclaimer from "@/components/Disclaimer";
import FloatingDonateButton from "@/components/FloatingDonateButton";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add state for controlling the disclaimer drawer
  const [showDrawer, setShowDrawer] = useState(false);

  // Handler for opening the drawer
  const handleOpenDrawer = () => {
    setShowDrawer(true);
  };

  // Handler for closing the drawer
  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen dark:bg-gradient-to-br dark:from-black dark:via-zinc-950 dark:to-slate-950">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 gap-4">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://www.DiploWords.com"
          title="DiploWords.com homepage"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">DiploWords [Ai]</p>
        </Link>

        {/* Uptime Status Link */}
        <Link
          isExternal
          className="text-default-600 hover:text-primary"
          href="https://status.yourdomain.com/"
          title="Site uptime status"
        >
          Status
        </Link>

        {/* Button to show disclaimer */}
        <Button
          className="text-default-600 hover:text-primary"
          size="sm"
          variant="light"
          onPress={handleOpenDrawer}
        >
          Legal Disclaimer
        </Button>

        {/* Render the disclaimer component when showDrawer is true */}
        {showDrawer && (
          <Disclaimer isOpen={showDrawer} onClose={handleCloseDrawer} />
        )}
      </footer>
      
      {/* Floating Donate Button */}
      <FloatingDonateButton />
    </div>
  );
}
