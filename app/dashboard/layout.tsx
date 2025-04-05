import AppNavbar from "@/components/app-navbar";
import { AppSidebar } from "@/components/app-siderbar";
import Footer from "@/components/footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex flex-col h-full">  
          <AppNavbar />
          {children}
        </div>
          <Footer/>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
