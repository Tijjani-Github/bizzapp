"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

interface StateContextProps {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openAdminSidebar: boolean;
  setOpenAdminSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  openSupervisorSidebar: boolean;
  setOpenSupervisorSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  ShowOtp: boolean;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  swipeIndicator: boolean;
  setSwipeIndicator: React.Dispatch<React.SetStateAction<boolean>>;
  openSearchBox: boolean;
  setOpenSearchBox: React.Dispatch<React.SetStateAction<boolean>>;
  openProfile: boolean;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
  currentPath: string;
}

export const StateContext = createContext({} as StateContextProps);

const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [ShowOtp, setShowOtp] = React.useState(false);
  const [swipeIndicator, setSwipeIndicator] = React.useState(false);
  const [handleSwipe, setHandleSwipe] = React.useState<number | null>(null);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [openSearchBox, setOpenSearchBox] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openAdminSidebar, setOpenAdminSidebar] = React.useState(false);
  const [openSupervisorSidebar, setOpenSupervisorSidebar] =
    React.useState(false);
  const [currentPath, setCurrentPath] = React.useState("");
  const pathname = usePathname();

  const isAnyModalOpen = ShowOtp || openSearchBox || openProfile;

  const anyMobileSidebarOpen =
    showMobileMenu || openSidebar || openAdminSidebar || openSupervisorSidebar;

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent
    );
  };

  useEffect(() => {
    if (!isMobileDevice()) return;
    const isSwiped = localStorage.getItem("swiped");
    if (isSwiped) {
      setSwipeIndicator(false);
      return;
    }
    if (openSidebar) {
      setSwipeIndicator(true);
    } else {
      setSwipeIndicator(false);
    }
  }, [openSidebar]);

  useEffect(() => {
    if (!isMobileDevice() || !("ontouchstart" in window)) return;
    const handleSwipeStart = (e: TouchEvent) => {
      setHandleSwipe(e.changedTouches[0].screenX);
    };
    const handleSwipeEnd = (e: TouchEvent) => {
      if (handleSwipe !== null) {
        const swipeDis = e.changedTouches[0].screenX - handleSwipe;
        const swipeThreshold = 70;

        if (swipeDis < -swipeThreshold) {
          localStorage.setItem("swiped", "true");
          console.log("first");
          setOpenSidebar(false);
          setOpenSupervisorSidebar(false);
          setOpenAdminSidebar(false);
        }

        setHandleSwipe(null);
      }
    };

    window.addEventListener("touchstart", handleSwipeStart);
    window.addEventListener("touchend", handleSwipeEnd);
    return () => {
      window.removeEventListener("touchstart", handleSwipeStart);
      window.removeEventListener("touchend", handleSwipeEnd);
    };
  }, [handleSwipe]);

  useEffect(() => {
    if (anyMobileSidebarOpen || isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMobileMenu(false);
        setOpenSidebar(false);
        setOpenSearchBox(false);
        setOpenProfile(false);
        setOpenAdminSidebar(false);
        setOpenSupervisorSidebar(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anyMobileSidebarOpen, isAnyModalOpen]);

  useEffect(() => {
    if (pathname.startsWith("/")) {
      setCurrentPath(pathname.replace("/admin/", ""));
      return;
    }
  }, [pathname]);

  const value = useMemo(
    () => ({
      showMobileMenu,
      setShowMobileMenu,
      ShowOtp,
      setShowOtp,
      swipeIndicator,
      setSwipeIndicator,
      openSidebar,
      setOpenSidebar,
      openSearchBox,
      setOpenSearchBox,
      openProfile,
      setOpenProfile,
      openAdminSidebar,
      setOpenAdminSidebar,
      openSupervisorSidebar,
      setOpenSupervisorSidebar,
      currentPath,
    }),
    [
      showMobileMenu,
      currentPath,
      setShowMobileMenu,
      openSidebar,
      setOpenSidebar,
      ShowOtp,
      setShowOtp,
      swipeIndicator,
      setSwipeIndicator,
      openSearchBox,
      setOpenSearchBox,
      openProfile,
      setOpenProfile,
      openAdminSidebar,
      setOpenAdminSidebar,
      openSupervisorSidebar,
      setOpenSupervisorSidebar,
    ]
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useStateCtx = () => {
  const ctx = useContext(StateContext);

  if (!ctx) {
    throw new Error("useStateCtx must be used within a StateContextProvider");
  }
  return ctx;
};

export default StateContextProvider;
