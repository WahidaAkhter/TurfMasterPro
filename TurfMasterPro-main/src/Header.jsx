import { useState, useEffect } from "react";
import { BrowserRouter, Link, NavLink, Routes, Route, useLocation } from "react-router-dom";



// --- Header Component ---
function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const [user, setUser] = useState(() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch (err) {
            console.error("Failed to parse user from localStorage", err);
            return null;
        }
    });

    useEffect(() => {
        const handleUserLogin = () => {
            const stored = localStorage.getItem("user");
            setUser(stored ? JSON.parse(stored) : null);
        }

        window.addEventListener("userLogin", handleUserLogin);
        return () => window.removeEventListener("userLogin", handleUserLogin);
    }, []);


    // Effect to handle scroll styling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
        setOpen(false);
    }, [location]);

    return (
        <>
            {/* Floating Header Architecture:
              - On Desktop (lg+): It's a floating pill
              - On Mobile: It's fixed to top
              - Transition: Smooth transforms
            */}
            <header
                className={`
                    left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${scrolled ? "top-0 lg:top-4" : "top-0 lg:top-6"}
                `}
            >
                <div className={`
                    mx-auto transition-all duration-500
                    ${scrolled
                        ? "w-full lg:w-[90%] lg:max-w-7xl bg-white/80 border-white/40 shadow-lg shadow-green-900/5 backdrop-blur-2xl"
                        : "w-full lg:w-[95%] lg:max-w-[1400px] bg-white/60 border-white/30 shadow-none backdrop-blur-xl"
                    }
                    border border-b lg:border lg:rounded-2xl px-4 sm:px-6 py-3
                `}>
                    <div className="flex items-center justify-between">

                        {/* Logo Section */}
                        <Link to="/" className="flex-shrink-0 group relative z-50">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 overflow-hidden">
                                    <img
                                        src="/images/turfLogo.png"
                                        alt="logo"
                                        className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:rotate-12"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
                                    />
                                    {/* Fallback Logo */}
                                    <div className="hidden absolute inset-0 bg-gradient-to-tr from-green-600 to-emerald-400 rounded-xl items-center justify-center text-white text-lg font-bold shadow-lg">
                                        T
                                    </div>
                                </div>
                                {/* Restored "Turf Master Pro" Title with Glow & Italic */}
                                <h3 className="text-2xl md:text-3xl font-extrabold italic bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-500 tracking-tight group-hover:from-green-600 group-hover:to-green-400 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] active:drop-shadow-[0_0_15px_rgba(74,222,128,0.9)]">
                                    Turf Master Pro
                                </h3>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Centered Island */}
                        <nav className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <ul className="flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-full border border-white/50 backdrop-blur-md shadow-inner">
                                {['Home', 'Team', 'Admin', 'About'].map((item) => {
                                    const path = item === 'Home' ? '/' : item === 'Team' ? '/member' : item === 'Admin' ? '/admin' : item === 'About' ? '/contact' : `/${item.toLowerCase()}`;
                                    const isActive = location.pathname === path;

                                    return (
                                        <li key={item}>
                                            <Link
                                                to={path}
                                                className={`
                                                    relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 block
                                                    ${isActive ? "text-slate-800" : "text-slate-500 hover:text-green-600"}
                                                `}
                                            >
                                                {isActive && (
                                                    <span className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] animate-fadeIn" />
                                                )}
                                                <span className="relative z-10">{item}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Right Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            {user ? (
                                <p className="font-bold text-gray-700">{user.fullName}</p>
                            ) : (
                                <Link
                                    to='/login'
                                    className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-green-700 transition-colors"
                                >
                                    Log in
                                </Link>
                            )}

                            <Link
                                to='/registration'
                                className="group relative px-6 py-2.5 rounded-xl overflow-hidden shadow-lg shadow-green-500/20 transition-all hover:shadow-green-500/40 hover:-translate-y-0.5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-500 transition-all group-hover:scale-105" />
                                <span className="relative text-white text-sm font-bold tracking-wide">Sign Up</span>
                            </Link>
                        </div>

                        {/* HAMBURGER MENU BUTTON */}
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 p-2 rounded-xl bg-white/80 hover:bg-white border border-green-200 hover:border-green-400 shadow-sm hover:shadow-md transition-all duration-300 group"
                            aria-label="Open Menu"
                        >
                            <span className="w-6 h-0.5 bg-green-700 rounded-full transition-all duration-300 group-hover:w-5 group-hover:bg-green-600"></span>
                            <span className="w-6 h-0.5 bg-green-700 rounded-full transition-all duration-300 group-hover:bg-green-600"></span>
                            <span className="w-6 h-0.5 bg-green-700 rounded-full transition-all duration-300 group-hover:w-5 group-hover:bg-green-600"></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ${open ? 'visible' : 'invisible'}`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setOpen(false)}
                />

                {/* Drawer */}
                <div className={`
                    absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ease-out
                    flex flex-col p-6
                    ${open ? 'translate-x-0' : 'translate-x-full'}
                `}>
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-bold text-slate-800">Menu</span>
                        <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <ul className="space-y-2">
                        {['Home', 'Team', 'Admin', 'Redux', 'About'].map((item) => {
                            const path = item === 'Home' ? '/' : item === 'Team' ? '/member' : item === 'Admin' ? '/admin': item === 'About' ? '/contact' : `/${item.toLowerCase()}`;
                            const isActive = location.pathname === path;
                            return (
                                <li key={item}>
                                    <Link
                                        to={path}
                                        className={`
                                            block px-4 py-3 rounded-xl font-medium transition-all
                                            ${isActive
                                                ? "bg-green-50 text-green-700 translate-x-2"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-green-600"
                                            }
                                        `}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
                        {user ? (
                            <p className="font-bold text-gray-700">{user.fullName}</p>
                        ) : (
                            <Link
                                to="/login"
                                className="block w-full py-3 text-center text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                            >
                                Log in
                            </Link>
                        )}
                        <Link to="/registration" className="block w-full py-3 text-center bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;