import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Mail, ArrowRight, Briefcase } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

/**
 * Friend Card component styled for layered charcoal dark theme hierarchy.
 * Background: #181818, Hover: #222222, Border: #2A2A2A, Footer: #141414.
 */
export function FriendCard({ friend }) {
  const [imageError, setImageError] = useState(false)
  const friendId = friend.id || friend._id

  const getInitials = (name) => {
    if (!name) return "F"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Link
      to={`/friends/${friendId}`}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`View ${friend.name}'s profile`}
    >
      <Card className="h-full flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:bg-accent/40 border-border bg-card overflow-hidden group shadow-2xs cursor-pointer">
        <CardHeader className="flex-row items-center gap-4 space-y-0 pb-3 pt-5 px-5">
        {/* Avatar Image */}
        <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-muted flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
          {friend.imageUrl && !imageError ? (
            <img
              src={friend.imageUrl}
              alt={friend.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
              {getInitials(friend.name)}
            </span>
          )}
        </div>

        {/* Friend Name and Role Badge */}
        <div className="space-y-1 overflow-hidden flex-1">
          <CardTitle className="text-base font-semibold truncate text-foreground group-hover:text-primary transition-colors">
            {friend.name}
          </CardTitle>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20 truncate max-w-full">
            <Briefcase className="w-3 h-3 shrink-0" />
            <span className="truncate">{friend.role || "Friend"}</span>
          </div>
        </div>
        </CardHeader>

        <CardContent className="space-y-3 flex-1 px-5 py-2">
        {friend.email && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground truncate">
            <Mail className="w-3.5 h-3.5 shrink-0 text-primary/70" />
            <span className="truncate">{friend.email}</span>
          </div>
        )}

        {friend.bio && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed font-normal">
            {friend.bio}
          </p>
        )}
        </CardContent>

        <CardFooter className="pt-3 pb-4 px-5 border-t border-border/80 bg-muted/50">
          <div className="w-full flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
            <span>View Profile</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
