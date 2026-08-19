import React, { useState, useEffect, useCallback } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Mail, Calendar, Briefcase, ExternalLink, ShieldCheck } from "lucide-react"

import { getFriendById } from "@/api/api"
import { ErrorState } from "@/components/ErrorState"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Friend Profile Detail View Page (/friends/:id) styled for charcoal dark mode hierarchy.
 * Main Card: #181818, Section blocks: #141414, Borders: #2A2A2A.
 */
export function FriendDetail() {
  const { id } = useParams()
  const [friend, setFriend] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)

  const fetchFriendDetails = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getFriendById(id)
      setFriend(data)
    } catch (err) {
      setError(err.message || "Failed to load friend details.")
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchFriendDetails()
  }, [fetchFriendDetails])

  const getInitials = (name) => {
    if (!name) return "F"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (isoString) => {
    if (!isoString) return "N/A"
    try {
      return new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return isoString
    }
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Navigation */}
      <div>
        <Button asChild variant="outline" size="sm" className="gap-2 rounded-lg border-border">
          <Link to="/friends">
            <ArrowLeft className="w-4 h-4" />
            Back to Friends Directory
          </Link>
        </Button>
      </div>

      {isLoading ? (
        /* Skeleton Profile View */
        <Card className="border-border bg-card overflow-hidden shadow-md">
          <Skeleton className="h-36 w-full" />
          <CardContent className="px-8 pb-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-14">
              <Skeleton className="w-28 h-28 rounded-full border-4 border-card shrink-0" />
              <div className="space-y-2 text-center sm:text-left flex-1 w-full">
                <Skeleton className="h-8 w-1/2 mx-auto sm:mx-0 rounded-md" />
                <Skeleton className="h-4 w-1/3 mx-auto sm:mx-0 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
              <div className="space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-28 w-full rounded-xl" />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : error ? (
        /* Error state */
        <ErrorState
          title="Friend Not Found"
          message={error}
          onRetry={fetchFriendDetails}
        />
      ) : friend ? (
        /* Elevated Friend Profile Card */
        <Card className="shadow-lg border-border bg-card overflow-hidden">
          {/* Header Banner */}
          <div className="h-36 bg-gradient-to-r from-primary/20 via-blue-500/10 to-primary/10 border-b border-border" />

          <CardContent className="relative px-6 sm:px-8 pb-8">
            {/* Avatar Header Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-14 mb-6 gap-4 text-center sm:text-left">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-card bg-muted shadow-md flex items-center justify-center shrink-0">
                {friend.imageUrl && !imageError ? (
                  <img
                    src={friend.imageUrl}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <span className="text-3xl font-bold text-muted-foreground">
                    {getInitials(friend.name)}
                  </span>
                )}
              </div>

              <div className="sm:mb-1 space-y-1.5 flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground my-0">
                    {friend.name}
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-primary" title="Verified Contact" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  <Briefcase className="w-3.5 h-3.5" />
                  {friend.role || "Friend"}
                </div>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Contact Information
                </h3>

                <div className="space-y-3">
                  <a
                    href={`mailto:${friend.email}`}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/60 hover:bg-accent transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium">Email Address</p>
                        <p className="text-sm font-semibold text-foreground">{friend.email}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-border bg-muted/60">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Added to Network</p>
                      <p className="text-sm font-semibold text-foreground">{formatDate(friend.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Background Notes */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  About & Background
                </h3>
                <div className="p-4 rounded-xl bg-muted/60 border border-border min-h-[120px]">
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                    {friend.bio || "No background bio provided for this contact yet."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
