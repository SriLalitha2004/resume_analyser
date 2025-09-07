import { NavLink } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

function Header({ dark, setDark }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo/Brand */}
      <h4 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500 font-poppins tracking-tight">
        Resume Analyzer
      </h4>

      {/* Navigation */}
      <nav className="space-x-6 text-base font-medium">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "text-violet-600 font-semibold underline underline-offset-4"
              : "text-gray-500 hover:text-violet-600 transition-colors"
          }
        >
          Live Analysis
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "text-violet-600 font-semibold underline underline-offset-4"
              : "text-gray-500 hover:text-violet-600 transition-colors"
          }
        >
          History
        </NavLink>
      </nav>

      {/* Theme Toggle */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Switch checked={dark} onCheckedChange={setDark} />
      </div>
    </header>
  );
}

export default Header;