

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../contexts/SidebarContextUser";
import {Home, LayoutPanelLeft, ChevronDown, ShoppingBag, CircleUserIcon } from "lucide-react"

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; plus?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <Home />,
    name: "Beranda",
    path: "/user/home",
    
  },
  {
    icon: <LayoutPanelLeft />,
    name: "Layanan",
    subItems: [{ name: "Trash House", path: "/user/layanan/trash-house", plus: true },
                {name: 'Asisten AI', path: '/user/layanan/ai', plus: true},
                {name: 'Lapor sampah', path: '/user/layanan/lapor', plus: false},
                {name: 'Tukar Sampah', path: '/user/layanan/tukar', plus: false},
                {name: 'Berlangganan', path: '/user/layanan/langganan', plus: false},
    ],
  },
  {
    name: "Toko",
    icon: <ShoppingBag/>,
    path: '/user/toko'
  },
  {
    icon: <CircleUserIcon />,
    name: "Profile",
    path: "/user/profile",
  },
];

const othersItems: NavItem[] = [];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others"
  ) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active bg-green-800 text-white shadow-md"
                  : "menu-item-inactive text-green-800 font-bold hover:bg-green-100 hover:text-green-800"
              } ${
                !isExpanded && !isHovered
                  ? "lg:justify-center lg:px-2"
                  : "justify-start"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active text-white"
                    : "menu-item-icon-inactive text-green-800 group-hover:text-green-800"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="menu-item-text flex-1 text-left text-base font-medium">
                    {nav.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180 text-white"
                        : "text-green-800 group-hover:text-green-800"
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(nav.path) 
                    ? "menu-item-active bg-green-800 text-white shadow-md" 
                    : "menu-item-inactive text-green-800 hover:bg-green-100 hover:text-green-800"
                } ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center lg:px-2"
                    : "justify-start"
                }`}
              >
                <span
                  className={`flex-shrink-0 w-5 h-5 flex items-center justify-center ${
                    isActive(nav.path)
                      ? "menu-item-icon-active text-white"
                      : "menu-item-icon-inactive text-green-800 group-hover:text-green-800"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text text-base font-medium">
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item flex items-center justify-between px-4 py-2 rounded-md text-sm transition-all duration-200 ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active bg-green-800 text-white shadow-sm"
                          : "menu-dropdown-item-inactive text-green-800 hover:bg-green-100 hover:text-green-800"
                      }`}
                    >
                      <span>{subItem.name}</span>
                      <span className="flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active bg-white text-green-800"
                                : "menu-dropdown-badge-inactive bg-green-800 text-white"
                            }`}
                          >
                            new
                          </span>
                        )}
                        {subItem.plus && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active bg-gradient-to-r from-lime-500 via-lime-600 to-green-700 text-white shadow-sm"
                                : "menu-dropdown-badge-inactive bg-gradient-to-r from-lime-500 via-lime-600 to-green-700 text-white font-semibold shadow-sm"
                            }`}
                          >
                            Plus
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white text-green-800 h-screen transition-all duration-300 ease-in-out z-50 border-r border-green-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/LogoWithText.png"
                alt="Logo"
                width={150}
                height={40}
              />
         
            </>
          ) : (
            <Image
              src="/images/logo/Logo.png"
              alt="Logo"
              width={42}
              height={42}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>  
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;


