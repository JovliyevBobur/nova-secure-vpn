import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useVPNConnection } from '@/hooks/useVPNConnection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Shield, 
  ShieldOff, 
  Server, 
  Download, 
  Upload, 
  Clock, 
  Wifi, 
  Moon, 
  Sun,
  ChevronRight,
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { 
    isConnected, 
    isConnecting, 
    selectedServer, 
    servers, 
    stats, 
    connect, 
    disconnect,
    selectServer 
  } = useVPNConnection();

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatSpeed = (speed: number) => `${speed.toFixed(1)} Mbps`;
  const formatData = (mb: number) => mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(1)} MB`;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold text-foreground">SecureVPN</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link to="/">
              <Button variant="outline" size="sm">Ana Səhifə</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Connection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Connection Card */}
            <Card className="p-8 bg-card-gradient shadow-card overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
              <div className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  {/* Connection Button */}
                  <button
                    onClick={() => isConnected ? disconnect() : connect()}
                    disabled={isConnecting}
                    className={`relative w-40 h-40 rounded-full transition-all duration-500 ${
                      isConnected 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_60px_rgba(34,197,94,0.4)]' 
                        : 'bg-gradient-to-br from-primary to-primary/80 hover:shadow-[0_0_40px_rgba(0,0,0,0.2)]'
                    } ${isConnecting ? 'animate-pulse' : ''}`}
                  >
                    <div className="absolute inset-2 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center">
                      {isConnected ? (
                        <Shield className="w-16 h-16 text-white" />
                      ) : (
                        <ShieldOff className="w-16 h-16 text-white/80" />
                      )}
                    </div>
                    {isConnected && (
                      <div className="absolute inset-0 rounded-full animate-ping bg-green-400/20" />
                    )}
                  </button>

                  <h2 className="mt-6 text-2xl font-bold text-foreground">
                    {isConnecting ? 'Qoşulur...' : isConnected ? 'Qoşuludur' : 'Qoşulmayıb'}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {isConnected && selectedServer 
                      ? `${selectedServer.flag} ${selectedServer.name}` 
                      : 'Təhlükəsiz bağlantı üçün qoşulun'}
                  </p>

                  {/* Quick Stats */}
                  {isConnected && (
                    <div className="mt-6 grid grid-cols-3 gap-6 w-full max-w-md">
                      <div className="text-center">
                        <Clock className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-lg font-semibold text-foreground">{formatTime(stats.connectedTime)}</p>
                        <p className="text-xs text-muted-foreground">Vaxt</p>
                      </div>
                      <div className="text-center">
                        <Download className="w-5 h-5 mx-auto text-green-500 mb-1" />
                        <p className="text-lg font-semibold text-foreground">{formatSpeed(stats.downloadSpeed)}</p>
                        <p className="text-xs text-muted-foreground">Yükləmə</p>
                      </div>
                      <div className="text-center">
                        <Upload className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                        <p className="text-lg font-semibold text-foreground">{formatSpeed(stats.uploadSpeed)}</p>
                        <p className="text-xs text-muted-foreground">Göndərmə</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Statistics Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-card shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Download className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ümumi Yükləmə</p>
                    <p className="text-lg font-semibold text-foreground">{formatData(stats.totalDownload)}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-card shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Upload className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ümumi Göndərmə</p>
                    <p className="text-lg font-semibold text-foreground">{formatData(stats.totalUpload)}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-card shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Wifi className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ping</p>
                    <p className="text-lg font-semibold text-foreground">{selectedServer?.ping || 0} ms</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-card shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Şifrələmə</p>
                    <p className="text-lg font-semibold text-foreground">AES-256</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Features */}
            <Card className="p-6 bg-card shadow-soft">
              <h3 className="text-lg font-semibold text-foreground mb-4">Aktiv Qoruma</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-foreground">Kill Switch</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <Globe className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-foreground">DNS Qoruma</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                  <Zap className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-foreground">Auto-Reconnect</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Server List */}
          <div className="space-y-4">
            <Card className="p-6 bg-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Server className="w-5 h-5 text-accent" />
                  Serverlər
                </h3>
                <span className="text-sm text-muted-foreground">{servers.length} server</span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {servers.map(server => (
                  <button
                    key={server.id}
                    onClick={() => {
                      selectServer(server);
                      if (!isConnected) connect(server);
                    }}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                      selectedServer?.id === server.id
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{server.flag}</span>
                        <div>
                          <p className="font-medium text-foreground text-sm">{server.name}</p>
                          <p className="text-xs text-muted-foreground">{server.city}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${
                          server.ping < 100 ? 'text-green-500' : server.ping < 150 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {server.ping} ms
                        </p>
                        {server.premium && (
                          <span className="text-xs text-yellow-500 font-medium">Premium</span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            server.load < 40 ? 'bg-green-500' : server.load < 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${server.load}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{server.load}% yüklənmə</p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Premium Banner */}
            <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Premium-a yüksəlin</h4>
                  <p className="text-sm text-muted-foreground mt-1">Bütün serverlərə giriş və limitsiz sürət</p>
                  <Link to="/#pricing">
                    <Button variant="outline" size="sm" className="mt-3 border-yellow-500/50 text-yellow-600 hover:bg-yellow-500/10">
                      Planları Gör <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
