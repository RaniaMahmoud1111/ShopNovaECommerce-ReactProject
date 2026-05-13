import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Decorative backgrounds */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative bg-surface p-10 rounded-custom shadow-2xl text-center max-w-md w-full border border-border-custom">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-extrabold text-text-primary mb-2">Welcome Back!</h1>
        <p className="text-text-secondary mb-8 text-sm">
          You have successfully logged in as <br />
          <span className="font-bold text-primary text-base">{user?.email || user?.name}</span>
        </p>

        <div className="space-y-3">
          <Button onClick={() => window.location.href = '#'} variant="primary">
            Explore Products
          </Button>
          <Button onClick={logout} variant="secondary">
            Logout Session
          </Button>
        </div>

        <p className="mt-8 text-xs text-text-secondary">
          ShopNova E-Commerce Dashboard v1.0
        </p>
      </div>
    </div>
  );
}
