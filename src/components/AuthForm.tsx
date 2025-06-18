import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface AuthFormProps {
  mode: "login" | "register"
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const isRegister = mode === "register"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            phone: phone,
          },
        },
      })

      if (error) {
        toast({ title: "Registration failed", description: error.message })
      } else {
        // Insert into profiles table if user object is available
        if (data?.user) {
          const { id } = data.user
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([{ id, isPremium: false }])
          if (profileError) {
            toast({ title: "Profile creation failed", description: profileError.message })
          }
        }
        toast({ title: "Account created", description: "Check your email to confirm your account." })
        navigate("/") // ✅ redirect after registration
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({ title: "Login failed", description: error.message })
      } else {
        toast({ title: "Success", description: "You are now signed in." })
        navigate("/") // ✅ redirect after login
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-center">
        {isRegister ? "Register" : "Login"}
      </h2>

      <Input
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {isRegister && (
        <>
          <Input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
      </Button>
    </form>
  )
}

export default AuthForm
