import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Loader2, Lock, Mail, Shield, UserPlus } from "lucide-react"

import { registerSchema } from "@/lib/validation"
import { register as registerAccount } from "@/api/api"
import { useAuth } from "@/context/AuthContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await registerAccount(data)
      login(response.token, response.user)
      toast.success("Account created successfully.")
      navigate("/friends", { replace: true })
    } catch (error) {
      toast.error(error.message || "Unable to create your account.")
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
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Create an Account</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Start managing your friends directory</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="alex.morgan@example.com" className="pl-9 rounded-lg" disabled={isSubmitting} {...register("email")} />
              </div>
              {errors.email && <p className="text-xs font-medium text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="At least 6 characters" className="pl-9 rounded-lg" disabled={isSubmitting} {...register("password")} />
              </div>
              {errors.password && <p className="text-xs font-medium text-destructive">{errors.password.message}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-2 pb-8">
            <Button type="submit" className="w-full font-semibold rounded-lg shadow-md gap-2" disabled={isSubmitting}>
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" />Creating account...</> : <><UserPlus className="h-4 w-4" />Create Account</>}
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
