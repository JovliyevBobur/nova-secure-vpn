import { useState, useEffect, useCallback } from 'react';

export interface VPNServer {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  premium: boolean;
}

export interface ConnectionStats {
  downloadSpeed: number;
  uploadSpeed: number;
  totalDownload: number;
  totalUpload: number;
  connectedTime: number;
}

// Mock server data
const mockServers: VPNServer[] = [
  { id: '1', name: 'US - New York', country: 'United States', city: 'New York', flag: '🇺🇸', ping: 45, load: 35, premium: false },
  { id: '2', name: 'US - Los Angeles', country: 'United States', city: 'Los Angeles', flag: '🇺🇸', ping: 78, load: 52, premium: false },
  { id: '3', name: 'UK - London', country: 'United Kingdom', city: 'London', flag: '🇬🇧', ping: 120, load: 41, premium: false },
  { id: '4', name: 'Germany - Frankfurt', country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', ping: 95, load: 28, premium: false },
  { id: '5', name: 'Japan - Tokyo', country: 'Japan', city: 'Tokyo', flag: '🇯🇵', ping: 180, load: 45, premium: true },
  { id: '6', name: 'Singapore', country: 'Singapore', city: 'Singapore', flag: '🇸🇬', ping: 165, load: 38, premium: true },
  { id: '7', name: 'Netherlands - Amsterdam', country: 'Netherlands', city: 'Amsterdam', flag: '🇳🇱', ping: 110, load: 62, premium: false },
  { id: '8', name: 'Canada - Toronto', country: 'Canada', city: 'Toronto', flag: '🇨🇦', ping: 55, load: 44, premium: false },
  { id: '9', name: 'Australia - Sydney', country: 'Australia', city: 'Sydney', flag: '🇦🇺', ping: 220, load: 31, premium: true },
  { id: '10', name: 'Switzerland - Zurich', country: 'Switzerland', city: 'Zurich', flag: '🇨🇭', ping: 105, load: 22, premium: true },
];

export const useVPNConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<VPNServer | null>(null);
  const [servers, setServers] = useState<VPNServer[]>(mockServers);
  const [stats, setStats] = useState<ConnectionStats>({
    downloadSpeed: 0,
    uploadSpeed: 0,
    totalDownload: 0,
    totalUpload: 0,
    connectedTime: 0,
  });

  // Simulate real-time stats when connected
  useEffect(() => {
    if (!isConnected) {
      setStats({
        downloadSpeed: 0,
        uploadSpeed: 0,
        totalDownload: 0,
        totalUpload: 0,
        connectedTime: 0,
      });
      return;
    }

    const interval = setInterval(() => {
      setStats(prev => ({
        downloadSpeed: Math.random() * 50 + 10, // 10-60 Mbps
        uploadSpeed: Math.random() * 20 + 5, // 5-25 Mbps
        totalDownload: prev.totalDownload + Math.random() * 5,
        totalUpload: prev.totalUpload + Math.random() * 2,
        connectedTime: prev.connectedTime + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const connect = useCallback(async (server?: VPNServer) => {
    const targetServer = server || selectedServer || servers[0];
    if (!targetServer) return;

    setIsConnecting(true);
    setSelectedServer(targetServer);

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsConnected(true);
    setIsConnecting(false);
  }, [selectedServer, servers]);

  const disconnect = useCallback(async () => {
    setIsConnecting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsConnected(false);
    setIsConnecting(false);
  }, []);

  const selectServer = useCallback((server: VPNServer) => {
    setSelectedServer(server);
  }, []);

  return {
    isConnected,
    isConnecting,
    selectedServer,
    servers,
    stats,
    connect,
    disconnect,
    selectServer,
  };
};
