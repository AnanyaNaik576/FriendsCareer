import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Users, UserPlus, LogOut, Sun, Moon, LogIn, Sparkles } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

/**
 * Top Navigation Bar component aligned with the charcoal dark theme.
 * Features background blur over #0D0D0D / #FFFFFF, active link indicators, and session controls.
 */
export function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md transition-colors duration-200">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          to={isAuthenticated ? "/friends" : "/login"}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Users className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-foreground leading-none flex items-center gap-1.5">
              Friends Manager
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">Directory & Network</span>
          </div>
        </Link>

        {/* Center / Left Navigation Links (When authenticated) */}
        {isAuthenticated && (
          <nav className="hidden sm:flex items-center gap-1 bg-secondary/80 p-1 rounded-xl border border-border">
            <Button
              asChild
              variant={isActive("/friends") ? "secondary" : "ghost"}
              size="sm"
              className={`rounded-lg transition-all duration-200 ${
                isActive("/friends") ? "shadow-xs font-semibold text-foreground bg-card border border-border/80" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Link to="/friends" className="gap-2">
                <Users className="w-4 h-4" />
                All Friends
              </Link>
            </Button>

            <Button
              asChild
              variant={isActive("/friends/new") ? "secondary" : "ghost"}
              size="sm"
              className={`rounded-lg transition-all duration-200 ${
                isActive("/friends/new") ? "shadow-xs font-semibold text-foreground bg-card border border-border/80" : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <Link to="/friends/new" className="gap-2">
                <UserPlus className="w-4 h-4" />
                Add Friend
              </Link>
            </Button>
          </nav>
        )}

        {/* Right Section: Theme Toggle + Auth Action */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle - Single event execution */}
          <div
            className="flex items-center gap-2 text-muted-foreground text-xs font-medium cursor-pointer select-none py-1.5 px-2.5 rounded-lg border border-border bg-secondary hover:bg-accent transition-all shadow-2xs"
            onClick={(e) => {
              if (e.target.closest('[role="switch"]')) return
              toggleTheme()
            }}
            title="Toggle dark mode"
          >
            <Sun className={`w-4 h-4 transition-colors ${!isDarkMode ? "text-amber-500 font-bold scale-110" : "text-muted-foreground/60"}`} />
            <Switch
              checked={isDarkMode}
              onCheckedChange={() => toggleTheme()}
              aria-label="Toggle dark mode"
            />
            <Moon className={`w-4 h-4 transition-colors ${isDarkMode ? "text-blue-400 font-bold scale-110" : "text-muted-foreground/60"}`} />
          </div>

          {/* User Status / Auth Actions */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2.5 pl-2 border-l border-border">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-semibold text-foreground truncate max-w-[130px]">
                  {user?.name || "Demo User"}
                </span>
                <span className="text-[10px] text-muted-foreground truncate max-w-[130px]">
                  {user?.email || "user@example.com"}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-xs rounded-lg border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="gap-2 shadow-xs rounded-lg">
              <Link to="/login">
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
