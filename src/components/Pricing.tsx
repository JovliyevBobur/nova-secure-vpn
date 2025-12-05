import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('pricing.free'),
      price: "$0",
      period: t('pricing.forever'),
      description: t('pricing.free.desc'),
      features: [
        { text: `1 ${t('pricing.device')}`, included: true },
        { text: `3 ${t('pricing.serverLocations')}`, included: true },
        { text: t('pricing.basicEncryption'), included: true },
        { text: t('pricing.limitedBandwidth'), included: true },
        { text: t('pricing.unlimitedData'), included: false },
        { text: t('pricing.prioritySupport'), included: false },
      ],
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: t('pricing.standard'),
      price: "$9.99",
      period: t('pricing.month'),
      description: t('pricing.standard.desc'),
      features: [
        { text: `5 ${t('pricing.devices')}`, included: true },
        { text: `30+ ${t('pricing.serverLocations')}`, included: true },
        { text: t('pricing.aes256'), included: true },
        { text: t('pricing.unlimitedBandwidth'), included: true },
        { text: t('pricing.adBlocker'), included: true },
        { text: t('pricing.emailSupport'), included: true },
      ],
      buttonVariant: "hero" as const,
      popular: true,
    },
    {
      name: t('pricing.premium'),
      price: "$14.99",
      period: t('pricing.month'),
      description: t('pricing.premium.desc'),
      features: [
        { text: `${t('pricing.unlimited')} ${t('pricing.devices')}`, included: true },
        { text: `50+ ${t('pricing.serverLocations')}`, included: true },
        { text: t('pricing.wireguard'), included: true },
        { text: t('pricing.unlimitedBandwidth'), included: true },
        { text: t('pricing.dedicatedIP'), included: true },
        { text: t('pricing.247Support'), included: true },
      ],
      buttonVariant: "premium" as const,
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('pricing.title')}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-8 rounded-2xl bg-card border transition-all duration-300 hover:shadow-hover ${
                plan.popular
                  ? "border-accent shadow-accent scale-105 z-10"
                  : "border-border shadow-card"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
                  {t('pricing.popular')}
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                    ) : (
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center">
                        <X className="h-3 w-3 text-muted-foreground" />
                      </div>
                    )}
                    <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button variant={plan.buttonVariant} size="lg" className="w-full">
                {plan.name === t('pricing.free') ? t('pricing.startFree') : t('pricing.getStarted')}
              </Button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <p className="text-center mt-12 text-muted-foreground">
          ✓ {t('pricing.guarantee')}
        </p>
      </div>
    </section>
  );
};

export default Pricing;
