import React from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Reusable inline error component displayed when page data fetching fails.
 * Includes explicit message and a Retry action button.
 */
export function ErrorState({ title = "Failed to load data", message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-destructive/30 bg-destructive/5 text-center space-y-4 my-6">
      <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {message || "An error occurred while communicating with the server."}
        </p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2 mt-2">
          <RefreshCw className="w-4 h-4" />
          Retry
        </Button>
      )}
    </div>
  )
}
