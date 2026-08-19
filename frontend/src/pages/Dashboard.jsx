import React, { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { UserPlus, Users, Search, X, Briefcase, Sparkles, Filter } from "lucide-react"

import { getFriends } from "@/api/api"
import { FriendCard } from "@/components/FriendCard"
import { ErrorState } from "@/components/ErrorState"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"

/**
 * Dashboard Page (/friends) aligned with charcoal dark theme hierarchy.
 * Page background: #0D0D0D, Cards: #181818, Stat cards: #141414, Inputs: #161616.
 */
export function Dashboard() {
  const [friends, setFriends] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchFriendsList = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getFriends()
      setFriends(data || [])
    } catch (err) {
      setError(err.message || "Failed to load friends list from server.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFriendsList()
  }, [fetchFriendsList])

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (friend.role && friend.role.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const totalCount = friends.length
  const uniqueRolesCount = new Set(friends.map((f) => f.role).filter(Boolean)).size

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground my-0 flex items-center gap-2">
            Friends Directory
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage, view, and stay connected with your personal and professional contacts
          </p>
        </div>

        <Button asChild size="default" className="gap-2 shadow-sm shrink-0 rounded-lg">
          <Link to="/friends/new">
            <UserPlus className="w-4 h-4" />
            Add New Friend
          </Link>
        </Button>
      </div>

      {/* Directory Metric Stat Cards (#141414 background in dark mode) */}
      {!isLoading && !error && friends.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Directory</p>
              <p className="text-xl font-bold text-foreground">{totalCount} {totalCount === 1 ? "Contact" : "Contacts"}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Unique Professions</p>
              <p className="text-xl font-bold text-foreground">{uniqueRolesCount} {uniqueRolesCount === 1 ? "Role" : "Roles"}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Network Status</p>
              <p className="text-xl font-bold text-foreground">Active & Synced</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {isLoading ? (
        /* Skeleton Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-border bg-card space-y-4 shadow-2xs"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded-full" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-5/6 rounded-md" />
              </div>
              <div className="pt-4 border-t border-border">
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error state */
        <ErrorState
          title="Unable to load directory"
          message={error}
          onRetry={fetchFriendsList}
        />
      ) : friends.length === 0 ? (
        /* Empty directory */
        <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-2xl bg-card space-y-4 my-8">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">No friends found</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your directory is currently empty. Click below to add your first friend!
            </p>
          </div>
          <Button asChild className="gap-2 rounded-lg">
            <Link to="/friends/new">
              <UserPlus className="w-4 h-4" />
              Add First Friend
            </Link>
          </Button>
        </div>
      ) : (
        /* Contacts List with Search */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 rounded-lg border-border bg-card"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs text-muted-foreground font-medium self-end sm:self-center">
              Showing <span className="font-bold text-foreground">{filteredFriends.length}</span> of {friends.length} contacts
            </div>
          </div>

          {filteredFriends.length === 0 ? (
            <div className="py-12 text-center border border-border rounded-xl bg-card text-muted-foreground text-sm space-y-2">
              <Filter className="w-8 h-8 mx-auto text-muted-foreground/50" />
              <p>No friends match your search query "<span className="font-semibold text-foreground">{searchQuery}</span>".</p>
              <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="text-primary text-xs">
                Clear filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFriends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
