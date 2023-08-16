import { createContext, useContext, useState } from "react";
const SidebarContext = createContext();
function SidebarProvider({ children }) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ sidebarIsOpen, setSidebarIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("SidebarContext was used outside of the SidebarProvider");
  return context;
}

export { SidebarProvider, useSidebar };
