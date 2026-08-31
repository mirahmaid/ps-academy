import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { href: "#hero", label: "الرئيسية" },
  { href: "#features", label: "لماذا منصتنا" },
  { href: "#contact", label: "تواصل معنا" },
  { href: "#success-stories", label: "قصص النجاح" },
];

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(links[0].href);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="فتح القائمة"
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 active:bg-slate-100"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الرئيسية"
        className={`fixed top-0 right-0 z-50 flex h-full w-[82%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] sm:w-[380px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <img
            src="/logo.png"
            alt="مسار التميز"
            className="h-8 w-auto"
          />

          <button
            onClick={() => setOpen(false)}
            aria-label="إغلاق القائمة"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 active:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 bg-white px-3 py-5">
          {links.map((link, i) => {
            const isActive = activeLink === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setOpen(false);
                }}
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-300 ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                } ${
                  isActive
                    ? "bg-[#002C5A]/5 font-bold text-[#002C5A]"
                    : "text-slate-700 active:bg-slate-50"
                }`}
              >
                <span>{link.label}</span>

                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#002C5A]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Buttons */}
        <div
          className="mt-auto flex flex-col gap-3 border-t border-slate-100 bg-white px-5 py-5"
          style={{
            paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
          }}
        >
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="w-full rounded-full bg-[#002C5A] py-3.5 text-center text-sm font-semibold text-white shadow-sm active:scale-[0.98]"
          >
            سجل الآن
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="w-full rounded-full border border-slate-200 py-3.5 text-center text-sm font-semibold text-slate-700 active:bg-slate-50"
          >
            دخول
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;