import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ArrowLeft, UserPlus, Loader2, Image as ImageIcon, Mail, User, Briefcase } from "lucide-react"

import { friendSchema } from "@/lib/validation"
import { createFriend } from "@/api/api"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

/**
 * Create Friend Form Page (/friends/new) with live avatar preview.
 * Validates inputs using react-hook-form + zod (friendSchema).
 * Retains form fields on failure and displays toast feedback.
 */
export function CreateFriend() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewError, setPreviewError] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(friendSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      bio: "",
      imageUrl: "",
    },
  })

  // Watch fields for live preview card updates
  const watchedImageUrl = useWatch({ control, name: "imageUrl" })
  const watchedName = useWatch({ control, name: "name" })

  const onSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      await createFriend(formData)
      toast.success(`Successfully added ${formData.name} to your directory!`)
      navigate("/friends")
    } catch (err) {
      toast.error(err.message || "Failed to create friend profile. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Navigation */}
      <div>
        <Button asChild variant="outline" size="sm" className="gap-2 rounded-lg border-border">
          <Link to="/friends">
            <ArrowLeft className="w-4 h-4" />
            Back to Friends List
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg border-border bg-card">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-3">
            {/* Live Avatar Preview Container */}
            <div className="relative w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0 overflow-hidden">
              {watchedImageUrl && !previewError ? (
                <img
                  src={watchedImageUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewError(true)}
                  onLoad={() => setPreviewError(false)}
                />
              ) : (
                <UserPlus className="w-6 h-6" />
              )}
            </div>

            <div>
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                Add New Friend
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                {watchedName ? `Creating profile for ${watchedName}` : "Create a new contact entry in your directory"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Two-column layout on medium screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field (Required) */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="e.g. Jordan Smith"
                    className="pl-9 rounded-lg"
                    disabled={isSubmitting}
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-medium text-destructive mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field (Required) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jordan.smith@example.com"
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
            </div>

            {/* Role / Job Title Field (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-semibold">Role / Profession (Optional)</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="role"
                  placeholder="e.g. Product Manager, Designer, Engineer"
                  className="pl-9 rounded-lg"
                  disabled={isSubmitting}
                  {...register("role")}
                />
              </div>
              {errors.role && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Avatar Image URL Field (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl" className="text-xs font-semibold">Avatar Image URL (Optional)</Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="imageUrl"
                  placeholder="https://images.unsplash.com/photo-..."
                  className="pl-9 rounded-lg"
                  disabled={isSubmitting}
                  {...register("imageUrl")}
                />
              </div>
              {errors.imageUrl && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            {/* Bio Field (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-xs font-semibold">Bio / Notes (Optional)</Label>
              <Textarea
                id="bio"
                placeholder="Short bio or notes about your friend..."
                className="min-h-[100px] resize-y rounded-lg"
                disabled={isSubmitting}
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/friends")}
              disabled={isSubmitting}
              className="rounded-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 min-w-[130px] rounded-lg shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Save Friend
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
