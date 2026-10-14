import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FileText, History,  LogOut,  Sparkles,  ChevronDown,  Menu,  X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {

  const { user, loading, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

/**
 * @closingDropdown user click outside then ye profile ke dropdown ko close kar deta hai.
 */

   useEffect(() => {
      const handleClickOutside = (event) => {

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }

    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  /**
   * @ActiveLink jis page per user hai that link will remain active 
  */

  const linkClass = ({ isActive }) =>
    `relative text-xs font-semibold transition-all duration-200 py-2 md:py-0 flex items-center gap-1.5 ${
      isActive
        ? "text-zinc-900 font-bold"
        : "text-zinc-500 hover:text-zinc-900"
    }`;

    /**
     * @logout on logout close the dropdown call handleLogout and naviaget to login 
     */

  const onLogoutClick = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    handleLogout();
    navigate("/login");
  };

/**
 * @showing loading state while login or registering user as it avoid flicker 
 */

  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 font-sans antialiased">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="w-24 h-5 bg-zinc-100 animate-pulse rounded" />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b
            border-zinc-100 font-sans antialiased">

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo of the project,on clicking user goes back to home page   */}

        <NavLink to="/" 
          className="text-base font-bold tracking-tight 
          text-zinc-900 flex items-center gap-2.5 group"
        >
        <div 
            className="w-8 h-8 rounded-xl bg-zinc-900 text-white flex items-center 
            justify-center font-extrabold text-xs shadow-xs
            group-hover:bg-zinc-800 transition-colors">

           <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>

           <span className="font-extrabold text-sm tracking-wide text-zinc-900">
            Resume<span className="text-zinc-500 font-normal">AI</span>
          </span>

        </NavLink>

        {/* for Mobile, Hamburger Toggle */}

        <button
          aria-label="Toggle Navigation Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-zinc-600
          hover:text-zinc-900 focus:outline-none rounded-lg
          hover:bg-zinc-100 transition-colors cursor-pointer"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Navigation Links for all pages */}
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } 
          md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 
          w-full md:w-auto bg-white md:bg-transparent border-b md:border-none
          border-zinc-100 px-6 py-5 md:p-0 shadow-lg md:shadow-none transition-all duration-200`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-7">

        {!user ? (
        <>
        <li>
        <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
          Log in
        </NavLink>
        </li>
        
        {/* register link */}

        <li>
        <NavLink
        to="/register"
        onClick={() => setMenuOpen(false)}
        className="inline-flex items-center justify-center h-9 px-5
        text-xs font-semibold text-white bg-zinc-900
        hover:bg-zinc-800 active:scale-95 rounded-full 
        transition-all shadow-xs"
        >
        Get started
        </NavLink>
        </li>
        </>
        ) : (
        <>
         {/* dashboard page  */}
       <li>
        <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>
        Dashboard
        </NavLink>
        </li>

        <li>
          <NavLink to="/gen-report" className={linkClass} onClick={() => setMenuOpen(false)}>
            <FileText className="w-3.5 h-3.5" />
            Analyze Resume
          </NavLink>
        </li>

        <li>
          <NavLink to="/past-report" className={linkClass} onClick={() => setMenuOpen(false)}>
            <History className="w-3.5 h-3.5" />
            Past Reports
          </NavLink>
        </li>

          <li>
          <NavLink to="/create-resume" className={linkClass} onClick={() => setMenuOpen(false)}>
            <History className="w-3.5 h-3.5" />
            Create Resume
          </NavLink>
        </li>

        {/* profile  */}

        <li className="relative pt-2 md:pt-0 border-t md:border-t-0 border-zinc-100" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 text-xs font-semibold
             text-zinc-700 hover:text-zinc-900 p-1 rounded-full
             hover:bg-zinc-100 transition-colors focus:outline-none cursor-pointer"
          >
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name || "User"} 
              className="w-7 h-7 rounded-full object-cover border border-zinc-200" 
            />
            ) : (
            <div className="w-7 h-7 rounded-full bg-zinc-900
              text-white flex items-center justify-center font-bold text-[11px]">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            )}
            <span className="hidden lg:inline-block max-w-[100px] truncate">
              {user.name || "Account"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-100 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-zinc-100">
                <p className="text-xs font-bold text-zinc-900 truncate">
                  {user.name || "User"}
                </p>
                <p className="text-[11px] text-zinc-400 truncate">
                  {user.email || ""}
                </p>
              </div>

              <button
                onClick={onLogoutClick}
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50/50 flex items-center gap-2 transition-colors font-medium mt-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Log out
              </button>
            </div>
          )}
        </li>
      </>
    )}

  </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;