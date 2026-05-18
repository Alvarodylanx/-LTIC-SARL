'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Loader2, User, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export function AuthModal() {
  const { authOpen, authMode, setAuthMode, closeAuth, login, register } = useUser();
  const { L } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({
    name: '', email: '', password: '',
    notifyProducts: true, notifyNews: true, notifyServices: true, notifyOrders: true,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      toast.success(L({ en: 'Welcome back!', fr: 'Bon retour !' }));
      closeAuth();
    } catch (err: any) {
      toast.error(err.message || L({ en: 'Login failed', fr: 'Échec de la connexion' }));
    } finally { setLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (regForm.password.length < 6) {
      toast.error(L({ en: 'Password must be at least 6 characters', fr: 'Le mot de passe doit contenir au moins 6 caractères' }));
      return;
    }
    setLoading(true);
    try {
      await register(regForm);
      toast.success(L({ en: 'Account created! Welcome to LTIC SARL.', fr: 'Compte créé ! Bienvenue chez LTIC SARL.' }));
      closeAuth();
    } catch (err: any) {
      toast.error(err.message || L({ en: 'Registration failed', fr: 'Échec de l\'inscription' }));
    } finally { setLoading(false); }
  };

  if (!authOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={closeAuth}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-background rounded-2xl shadow-2xl w-full max-w-md border overflow-hidden"
        >
          {/* Header */}
          <div className="bg-sidebar px-6 pt-6 pb-5">
            <button onClick={closeAuth} className="absolute top-4 right-4 text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors p-1 rounded-lg hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
              <span className="text-primary font-bold text-lg">LT</span>
            </div>
            <h2 className="text-xl font-bold text-sidebar-foreground">
              {authMode === 'login'
                ? L({ en: 'Sign in to LTIC SARL', fr: 'Se connecter à LTIC SARL' })
                : L({ en: 'Create your account', fr: 'Créer votre compte' })}
            </h2>
            <p className="text-sidebar-foreground/60 text-sm mt-1">
              {authMode === 'login'
                ? L({ en: 'Access your dashboard and notifications', fr: 'Accédez à votre tableau de bord et notifications' })
                : L({ en: 'Get notified about products, news and updates', fr: 'Soyez informé des produits, actualités et mises à jour' })}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex border-b">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setAuthMode(m)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${authMode === m ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {m === 'login' ? L({ en: 'Sign In', fr: 'Se Connecter' }) : L({ en: 'Register', fr: 'S\'inscrire' })}
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {authMode === 'login' ? (
                <motion.form key="login" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }} onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>{L({ en: 'Email', fr: 'E-mail' })}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="email" required className="pl-9" placeholder="you@example.com"
                        value={loginForm.email} onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{L({ en: 'Password', fr: 'Mot de passe' })}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type={showPw ? 'text' : 'password'} required className="pl-9 pr-10"
                        value={loginForm.password} onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))} />
                      <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {L({ en: 'Sign In', fr: 'Se Connecter' })}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    {L({ en: "Don't have an account?", fr: 'Pas encore de compte ?' })}{' '}
                    <button type="button" onClick={() => setAuthMode('register')} className="text-primary font-medium hover:underline">
                      {L({ en: 'Register', fr: 'S\'inscrire' })}
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form key="register" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label>{L({ en: 'Full Name', fr: 'Nom complet' })}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input required className="pl-9" placeholder={L({ en: 'John Doe', fr: 'Jean Dupont' })}
                        value={regForm.name} onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{L({ en: 'Email', fr: 'E-mail' })}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="email" required className="pl-9" placeholder="you@example.com"
                        value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>{L({ en: 'Password', fr: 'Mot de passe' })}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type={showPw ? 'text' : 'password'} required className="pl-9 pr-10" placeholder={L({ en: 'Min. 6 characters', fr: 'Min. 6 caractères' })}
                        value={regForm.password} onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))} />
                      <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Notification prefs */}
                  <div className="bg-muted/50 rounded-xl p-4 space-y-2.5">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {L({ en: 'Notification preferences', fr: 'Préférences de notifications' })}
                    </p>
                    {([
                      { key: 'notifyProducts', en: 'New products added', fr: 'Nouveaux produits ajoutés' },
                      { key: 'notifyNews', en: 'News & articles', fr: 'Actualités & articles' },
                      { key: 'notifyServices', en: 'Service updates', fr: 'Mises à jour des services' },
                      { key: 'notifyOrders', en: 'Order & shipping updates', fr: 'Mises à jour commandes & livraisons' },
                    ] as const).map(({ key, en, fr }) => (
                      <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={(regForm as any)[key]}
                          onChange={e => setRegForm(f => ({ ...f, [key]: e.target.checked }))}
                          className="w-4 h-4 accent-primary rounded"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{L({ en, fr })}</span>
                      </label>
                    ))}
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {L({ en: 'Create Account', fr: 'Créer le Compte' })}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    {L({ en: 'Already have an account?', fr: 'Vous avez déjà un compte ?' })}{' '}
                    <button type="button" onClick={() => setAuthMode('login')} className="text-primary font-medium hover:underline">
                      {L({ en: 'Sign in', fr: 'Se connecter' })}
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
