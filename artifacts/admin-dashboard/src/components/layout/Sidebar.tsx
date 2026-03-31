import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  Briefcase,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/sectors", label: "Manage Sectors", icon: Building2 },
  { href: "/jobs", label: "Job Postings", icon: Briefcase },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-[#0d1526] border-r border-[#1e2a3a] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#1e2a3a]">
        <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
          <Shield size={18} className="text-[#d4af37]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white leading-tight">Aegis Group</p>
          <p className="text-xs text-[#8a9bb0]">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = location === href || location.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20"
                  : "text-[#8a9bb0] hover:bg-[#162032] hover:text-white"
              )}
            >
              <Icon size={17} className={isActive ? "text-[#d4af37]" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-[#1e2a3a]">
        <div className="px-3 py-2 mb-3">
          <p className="text-xs text-[#8a9bb0]">Signed in as</p>
          <p className="text-sm font-medium text-white">Administrator</p>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#8a9bb0] hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
