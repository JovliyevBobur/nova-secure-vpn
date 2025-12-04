import { Button } from "@/components/ui/button";
import { Monitor, Apple, Smartphone, Download } from "lucide-react";

const downloads = [
  {
    platform: "Windows",
    icon: Monitor,
    version: "v3.2.1",
    description: "Windows 10/11 64-bit",
    buttonText: "Download for Windows",
  },
  {
    platform: "macOS",
    icon: Apple,
    version: "v3.2.1",
    description: "macOS 12.0 or later",
    buttonText: "Download for Mac",
  },
  {
    platform: "Linux",
    icon: Monitor,
    version: "v3.2.1",
    description: "Ubuntu, Debian, Fedora",
    buttonText: "Download for Linux",
  },
  {
    platform: "Android",
    icon: Smartphone,
    version: "v3.2.0",
    description: "Android 8.0 or later",
    buttonText: "Download APK",
  },
  {
    platform: "iOS",
    icon: Smartphone,
    version: "v3.2.0",
    description: "iOS 14.0 or later",
    buttonText: "App Store",
  },
];

const DownloadSection = () => {
  return (
    <section id="download" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Download SecureVPN
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Get started in minutes. Available on all major platforms.
          </p>
        </div>

        {/* Download Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {downloads.map((item) => (
            <div
              key={item.platform}
              className="group p-6 rounded-2xl bg-card border border-border shadow-card hover:shadow-hover hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground group-hover:bg-accent transition-colors duration-300">
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{item.platform}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-secondary rounded-full text-secondary-foreground">
                    {item.version}
                  </span>
                </div>
              </div>
              <Button variant="download" className="w-full mt-6">
                <Download className="h-4 w-4" />
                {item.buttonText}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary border border-border">
            <span className="text-sm text-muted-foreground">
              Need help installing? Check our
            </span>
            <a href="#faq" className="text-sm font-medium text-accent hover:underline">
              Installation Guide
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
