// Example: src/components/AuthButtons.tsx
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/context/AuthContext'

const AuthButtons = () => {
  const { user } = useAuth()

  const handleLogin = async () => {
    await supabase.auth.signInWithOtp({ email: prompt('Enter your email') || '' })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return user ? (
    <Button onClick={handleLogout}>Sign Out</Button>
  ) : (
    <Button onClick={handleLogin}>Sign In with Magic Link</Button>
  )
}

export default AuthButtons
