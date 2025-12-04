import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Download, Smartphone, Check, Share2, Plus, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold text-foreground">SecureVPN</span>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm">Ana Səhifə</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-accent to-primary mb-6">
              <Smartphone className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Tətbiqi Quraşdırın
            </h1>
            <p className="text-lg text-muted-foreground">
              SecureVPN-i telefonunuza quraşdırın və istənilən yerdən təhlükəsiz qoşulun
            </p>
          </div>

          {isInstalled ? (
            <Card className="p-8 bg-green-500/5 border-green-500/20">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Artıq Quraşdırılıb!</h2>
                <p className="text-muted-foreground mb-6">
                  SecureVPN tətbiqi cihazınızda quraşdırılıb
                </p>
                <Link to="/dashboard">
                  <Button variant="hero" size="lg">
                    Dashboard-a Keç
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <>
              {/* Install Button (Android/Desktop) */}
              {deferredPrompt && (
                <Card className="p-8 mb-8 bg-card shadow-card">
                  <Button 
                    onClick={handleInstall} 
                    variant="hero" 
                    size="lg"
                    className="w-full max-w-xs mx-auto"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Tətbiqi Quraşdır
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Bir kliklə ana ekrana əlavə edin
                  </p>
                </Card>
              )}

              {/* iOS Instructions */}
              {isIOS && (
                <Card className="p-8 mb-8 bg-card shadow-card text-left">
                  <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                    iOS-da Necə Quraşdırmaq
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">1. Share düyməsinə basın</h3>
                        <p className="text-sm text-muted-foreground">Safari brauzerin aşağısında olan Share (paylaş) ikonasına basın</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">2. "Add to Home Screen" seçin</h3>
                        <p className="text-sm text-muted-foreground">Açılan menyudan "Add to Home Screen" seçimini tapın</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">3. "Add" düyməsinə basın</h3>
                        <p className="text-sm text-muted-foreground">Tətbiq ana ekranınıza əlavə olunacaq</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Android Instructions (fallback) */}
              {!isIOS && !deferredPrompt && (
                <Card className="p-8 mb-8 bg-card shadow-card text-left">
                  <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                    Android-da Necə Quraşdırmaq
                  </h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <MoreVertical className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">1. Menyu düyməsinə basın</h3>
                        <p className="text-sm text-muted-foreground">Chrome brauzerin yuxarı sağ küncündəki üç nöqtəli menyuya basın</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Download className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">2. "Install app" və ya "Add to Home screen" seçin</h3>
                        <p className="text-sm text-muted-foreground">Açılan menyudan quraşdırma seçimini tapın</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">3. Quraşdırmanı təsdiqləyin</h3>
                        <p className="text-sm text-muted-foreground">Tətbiq ana ekranınıza əlavə olunacaq</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                <Card className="p-4 bg-card shadow-soft">
                  <div className="p-3 rounded-xl bg-accent/10 w-fit mx-auto mb-3">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Offline İşləyir</h3>
                  <p className="text-sm text-muted-foreground mt-1">İnternet olmadan da tətbiqi açın</p>
                </Card>
                <Card className="p-4 bg-card shadow-soft">
                  <div className="p-3 rounded-xl bg-accent/10 w-fit mx-auto mb-3">
                    <Download className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Yüngül</h3>
                  <p className="text-sm text-muted-foreground mt-1">Yaddaşda az yer tutur</p>
                </Card>
                <Card className="p-4 bg-card shadow-soft">
                  <div className="p-3 rounded-xl bg-accent/10 w-fit mx-auto mb-3">
                    <Smartphone className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground">Native Hiss</h3>
                  <p className="text-sm text-muted-foreground mt-1">Tam ekran tətbiq təcrübəsi</p>
                </Card>
              </div>
            </>
          )}

          {/* Back Link */}
          <div className="mt-12">
            <Link to="/" className="text-accent hover:underline">
              ← Ana səhifəyə qayıt
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Install;
