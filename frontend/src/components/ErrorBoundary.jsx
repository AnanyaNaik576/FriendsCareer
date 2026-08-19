import React, { Component } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

/**
 * Top-level Error Boundary component.
 * Catches JavaScript/render crashes anywhere in the child component tree,
 * logging errors and displaying a user-friendly fallback UI with a reload button.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log unexpected application errors
    console.error("ErrorBoundary caught an unhandled render error:", error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 text-foreground">
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-xl border border-border bg-card shadow-lg">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground my-0">
                Something went wrong
              </h1>
              <p className="text-sm text-muted-foreground">
                An unexpected application error occurred. Please try reloading the page.
              </p>
              {this.state.error?.message && (
                <div className="mt-4 p-3 rounded-lg bg-muted text-xs font-mono text-left overflow-x-auto max-h-32">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-md font-medium text-sm text-primary-foreground bg-primary hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
