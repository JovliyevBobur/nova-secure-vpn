import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Basic protection for casual users",
    features: [
      { text: "1 Device", included: true },
      { text: "3 Server Locations", included: true },
      { text: "Basic Encryption", included: true },
      { text: "Limited Bandwidth (500MB/day)", included: true },
      { text: "Unlimited Data", included: false },
      { text: "Priority Support", included: false },
    ],
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Standard",
    price: "$9.99",
    period: "/month",
    description: "Complete protection for individuals",
    features: [
      { text: "5 Devices", included: true },
      { text: "30+ Server Locations", included: true },
      { text: "AES-256 Encryption", included: true },
      { text: "Unlimited Bandwidth", included: true },
      { text: "Ad & Malware Blocker", included: true },
      { text: "Email Support", included: true },
    ],
    buttonVariant: "hero" as const,
    popular: true,
  },
  {
    name: "Premium",
    price: "$14.99",
    period: "/month",
    description: "Maximum security for power users",
    features: [
      { text: "Unlimited Devices", included: true },
      { text: "50+ Server Locations", included: true },
      { text: "AES-256 + WireGuard", included: true },
      { text: "Unlimited Bandwidth", included: true },
      { text: "Dedicated IP Option", included: true },
      { text: "24/7 Priority Support", included: true },
    ],
    buttonVariant: "premium" as const,
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the plan that fits your needs. Cancel anytime.
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
                  Most Popular
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
                {plan.name === "Free" ? "Start Free" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <p className="text-center mt-12 text-muted-foreground">
          ✓ 30-day money-back guarantee on all paid plans
        </p>
      </div>
    </section>
  );
};

export default Pricing;
