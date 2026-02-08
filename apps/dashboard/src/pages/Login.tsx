import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LOGOS } from '@start-jr/assets'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Label } from '../components/Label'
import { Checkbox } from '../components/Checkbox'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Login: FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-white">
      <div className="w-full max-w-md animate-fade-in">
        <div className="bg-hsl(var(--card)) p-8 md:p-10">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src={LOGOS.main} 
              alt="START Jr." 
              className="h-12 w-auto"
            />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-[hsl(210,60%,14%)] md:text-3xl">
              Welcome Back
            </h1>
            <p className="mt-2 text-[hsl(210,20%,40%)]">
              Sign in to continue to your account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[hsl(210,60%,14%)]">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(210,20%,40%)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-10 transition-all duration-200 focus:ring-2 focus:ring-[hsl(0,100%,60%)]"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[hsl(210,60%,14%)]">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[hsl(210,20%,40%)]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-[hsl(0,100%,60%)]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(210,20%,40%)] transition-colors hover:text-[hsl(210,60%,14%)]"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="border-[hsl(210,20%,40%)] data-[state=checked]:bg-[hsl(0,100%,60%)] data-[state=checked]:border-[hsl(0,100%,60%)]"
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-[hsl(210,20%,40%)] cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-[hsl(0,100%,60%)] transition-colors hover:opacity-80"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="accent" 
              size="lg" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-[hsl(210,20%,40%)]">
            Don't have an account?{' '}
            <a
              href="#"
              className="font-semibold text-[hsl(0,100%,60%)] transition-colors hover:opacity-80"
            >
              Create one now
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
