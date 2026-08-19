import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { ErrorBoundary } from "@/components/ErrorBoundary"
import { AuthProvider } from "@/context/AuthContext"
import { ThemeProvider } from "@/context/ThemeContext"
import { Navbar } from "@/components/Navbar"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { Toaster } from "@/components/ui/sonner"

import { Login } from "@/pages/Login"
import { Dashboard } from "@/pages/Dashboard"
import { FriendDetail } from "@/pages/FriendDetail"
import { CreateFriend } from "@/pages/CreateFriend"

/**
 * Main Application Component.
 * Integrates global ErrorBoundary, ThemeProvider, AuthProvider, Router, Navbar, and Sonner Toaster.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Authentication Route */}
                  <Route path="/login" element={<Login />} />

                  {/* Protected Friends Routes */}
                  <Route
                    path="/friends"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/friends/new"
                    element={
                      <ProtectedRoute>
                        <CreateFriend />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/friends/:id"
                    element={
                      <ProtectedRoute>
                        <FriendDetail />
                      </ProtectedRoute>
                    }
                  />

                  {/* Fallback & Redirects */}
                  <Route path="/" element={<Navigate to="/friends" replace />} />
                  <Route path="*" element={<Navigate to="/friends" replace />} />
                </Routes>
              </main>
              <Toaster position="bottom-right" richColors />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
