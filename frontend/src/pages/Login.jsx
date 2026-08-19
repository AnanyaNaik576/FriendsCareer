import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { LogIn, Loader2, Lock, Mail, Shield } from "lucide-react"

import { loginSchema } from "@/lib/validation"
import { login } from "@/api/api"
import { useAuth } from "@/context/AuthContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

/**
 * Login Page Component.
 * Form validation managed by react-hook-form + zod (loginSchema).
 * Displays toast notifications on error and stores JWT token in AuthContext upon success.
 */
export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login: setAuthSession } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fromLocation = location.state?.from?.pathname || "/friends"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await login(data)
      setAuthSession(response.token, response.user)
      toast.success("Welcome back! Successfully signed in.")
      navigate(fromLocation, { replace: true })
    } catch (err) {
      toast.error(err.message || "Login failed. Please check your credentials.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-xl border-border bg-card/90 backdrop-blur-xs rounded-2xl overflow-hidden">
        <CardHeader className="space-y-2 text-center pb-2 pt-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-indigo-500 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25 mb-2">
            <Shield className="w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Sign In to Directory
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Access your contacts, profiles, and friends network
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="alex.morgan@example.com"
                  className="pl-9 rounded-lg"
                  disabled={isSubmitting}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9 rounded-lg"
                  disabled={isSubmitting}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-2 pb-8">
            <Button
              type="submit"
              className="w-full font-semibold rounded-lg shadow-md gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>

            <div className="p-3 rounded-xl bg-muted/50 border border-border/50 text-[11px] text-center text-muted-foreground space-y-1 w-full">
              <p className="font-semibold text-foreground">Demo Testing Credentials</p>
              <p>Email: <span className="font-mono text-primary font-medium">demo@example.com</span></p>
              <p>Password: <span className="font-mono text-primary font-medium">password123</span></p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
