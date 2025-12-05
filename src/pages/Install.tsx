import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Download, Smartphone, Check, Share2, Plus, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold text-foreground">SecureVPN</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Link to="/"><Button variant="outline" size="sm">{t('dashboard.home')}</Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-primary mb-6">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('nav.install')} App</h1>
            <p className="text-lg text-muted-foreground">Install SecureVPN on your device for secure browsing anywhere</p>
          </div>

          {isInstalled ? (
            <Card className="p-8 bg-green-500/5 border-green-500/20">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Already Installed!</h2>
                <p className="text-muted-foreground mb-6">SecureVPN is installed on your device</p>
                <Link to="/dashboard"><Button variant="hero" size="lg">{t('nav.dashboard')}</Button></Link>
              </div>
            </Card>
          ) : (
            <>
              {deferredPrompt && (
                <Card className="p-8 mb-8 bg-card shadow-card">
                  <Button onClick={handleInstall} variant="hero" size="lg" className="w-full max-w-xs mx-auto">
                    <Download className="w-5 h-5 mr-2" />{t('nav.install')}
                  </Button>
                </Card>
              )}

              {isIOS && (
                <Card className="p-8 mb-8 bg-card shadow-card text-left">
                  <h2 className="text-xl font-bold text-foreground mb-6 text-center">iOS Installation</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><Share2 className="w-5 h-5 text-accent" /></div>
                      <div><h3 className="font-semibold text-foreground">1. Tap Share button</h3><p className="text-sm text-muted-foreground">Tap the Share icon at the bottom of Safari</p></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><Plus className="w-5 h-5 text-accent" /></div>
                      <div><h3 className="font-semibold text-foreground">2. Select "Add to Home Screen"</h3><p className="text-sm text-muted-foreground">Find this option in the menu</p></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><Check className="w-5 h-5 text-accent" /></div>
                      <div><h3 className="font-semibold text-foreground">3. Tap "Add"</h3><p className="text-sm text-muted-foreground">App will be added to your home screen</p></div>
                    </div>
                  </div>
                </Card>
              )}

              {!isIOS && !deferredPrompt && (
                <Card className="p-8 mb-8 bg-card shadow-card text-left">
                  <h2 className="text-xl font-bold text-foreground mb-6 text-center">Android Installation</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><MoreVertical className="w-5 h-5 text-accent" /></div>
                      <div><h3 className="font-semibold text-foreground">1. Tap Menu button</h3><p className="text-sm text-muted-foreground">Tap the three dots in Chrome's top right corner</p></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><Download className="w-5 h-5 text-accent" /></div>
                      <div><h3 className="font-semibold text-foreground">2. Select "Install app"</h3><p className="text-sm text-muted-foreground">Or "Add to Home screen"</p></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><Check className="w-5 h-5 text-accent" /></div>
                      <div><h3 className="font-semibold text-foreground">3. Confirm installation</h3><p className="text-sm text-muted-foreground">App will be added to your home screen</p></div>
                    </div>
                  </div>
                </Card>
              )}
            </>
          )}
          <div className="mt-12"><Link to="/" className="text-accent hover:underline">← {t('dashboard.home')}</Link></div>
        </div>
      </main>
    </div>
  );
};

export default Install;
