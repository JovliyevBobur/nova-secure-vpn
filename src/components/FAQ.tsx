import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a VPN and why do I need one?",
    answer:
      "A VPN (Virtual Private Network) encrypts your internet connection and hides your IP address. This protects your data from hackers on public WiFi, prevents your ISP from tracking your browsing, and lets you access geo-restricted content securely.",
  },
  {
    question: "How many devices can I connect?",
    answer:
      "It depends on your plan. The Free plan supports 1 device, Standard supports 5 devices, and Premium allows unlimited simultaneous connections. All your devices stay protected with a single account.",
  },
  {
    question: "Will a VPN slow down my internet?",
    answer:
      "Modern VPNs like SecureVPN use optimized protocols that minimize speed loss. Most users experience less than 10% speed reduction. Our WireGuard protocol on Premium plans offers near-native speeds.",
  },
  {
    question: "Do you keep logs of my activity?",
    answer:
      "No. We operate under a strict no-logs policy. We don't track, collect, or share your browsing activity, connection timestamps, or IP addresses. Your privacy is our priority.",
  },
  {
    question: "Can I use SecureVPN for streaming?",
    answer:
      "Yes! SecureVPN works great for streaming. Our servers are optimized to bypass geo-restrictions, allowing you to access content from different regions on platforms like Netflix, Disney+, and more.",
  },
  {
    question: "How do I install SecureVPN?",
    answer:
      "Simply download the app for your platform from our Download section, install it, and log in with your account. The app will automatically connect you to the best server. Most users are up and running in under 2 minutes.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrency (Bitcoin, Ethereum). All payments are processed securely.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes! All paid plans come with a 30-day money-back guarantee. If you're not completely satisfied, contact our support team for a full refund, no questions asked.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about SecureVPN
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 shadow-card data-[state=open]:shadow-hover data-[state=open]:border-accent/30 transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
