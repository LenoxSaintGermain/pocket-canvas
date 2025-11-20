import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast.success('Account created! You can now log in.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
        toast.success('Logged in!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 p-8 bg-card/80 backdrop-blur-lg rounded-2xl shadow-glow border border-primary/20 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-orbitron font-black text-gradient-hero mb-2">
            PocketLegend
          </h1>
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Email
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full"
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full font-orbitron"
          disabled={loading}
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
        </Button>
        
        <button 
          type="button" 
          onClick={() => setIsSignUp(!isSignUp)} 
          className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth"
        >
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  );
}
