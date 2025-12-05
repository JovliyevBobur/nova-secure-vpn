import { Shield, Zap, Globe, Lock, Eye, Server, Monitor, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.desc'),
    },
    {
      icon: Zap,
      title: t('features.speed.title'),
      description: t('features.speed.desc'),
    },
    {
      icon: Globe,
      title: t('features.global.title'),
      description: t('features.global.desc'),
    },
    {
      icon: Lock,
      title: t('features.nolog.title'),
      description: t('features.nolog.desc'),
    },
    {
      icon: Eye,
      title: t('features.anonymous.title'),
      description: t('features.anonymous.desc'),
    },
    {
      icon: Server,
      title: t('features.bandwidth.title'),
      description: t('features.bandwidth.desc'),
    },
  ];

  const platforms = [
    { name: "Windows", icon: Monitor },
    { name: "macOS", icon: Monitor },
    { name: "Linux", icon: Monitor },
    { name: "Android", icon: Smartphone },
    { name: "iOS", icon: Smartphone },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-hover transition-all duration-300 border border-border hover:border-accent/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex p-3 rounded-xl bg-accent/10 text-accent mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Platforms Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            {t('features.platforms')}
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center gap-3 px-6 py-4 rounded-xl bg-secondary border border-border hover:border-accent/30 transition-colors"
              >
                <platform.icon className="h-5 w-5 text-accent" />
                <span className="font-medium text-foreground">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
