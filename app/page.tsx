import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, Wand2, Shield, Clock, Upload, Sparkles, Settings, Download, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Professional ID Photos in Seconds
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Advanced AI-powered photo processing for official documents. Get perfect ID photos without leaving your home.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                alt="Profile photo example"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Wand2 className="h-8 w-8" />,
                title: "AI Enhancement",
                description: "Smart background removal and lighting adjustment"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Compliance Guaranteed",
                description: "Meets official document requirements worldwide"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Instant Results",
                description: "Get your photos in less than 5 minutes"
              },
              {
                icon: <CheckCircle2 className="h-8 w-8" />,
                title: "Expert Verification",
                description: "Manual review by photography experts"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Professional ID Photo in 4 Simple Steps</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                icon: <Upload className="h-8 w-8" />,
                title: "Upload Photo",
                description: "Capture or upload your front-facing portrait using any device"
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "AI Smart Processing",
                description: [
                  "Intelligent background removal",
                  "Automatic cropping recommendations",
                  "Outline guidance for precise framing"
                ]
              },
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Customize Your Photo",
                description: [
                  "Select preferred aspect ratio",
                  "Choose background color"
                ]
              },
              {
                icon: <Download className="h-8 w-8" />,
                title: "Download Instantly",
                description: "Get your professional, print-ready ID photo in seconds"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                {Array.isArray(step.description) ? (
                  <ul className="text-muted-foreground text-left list-disc pl-4">
                    {step.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{step.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {[
                {
                  question: "What types of ID photos can I create?",
                  answer: "You can create photos for passports, driver's licenses, visas, and other official documents from any country."
                },
                {
                  question: "How long does it take to get my photos?",
                  answer: "Most photos are processed within 5 minutes. You'll receive both digital and printable versions."
                },
                {
                  question: "Are the photos guaranteed to be accepted?",
                  answer: "Yes! We guarantee acceptance for official use or we'll refund your purchase."
                },
                {
                  question: "What if I'm not satisfied with the results?",
                  answer: "We offer unlimited retakes and a 100% satisfaction guarantee. If you're not happy, we'll make it right."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
      {/* Privacy Section */}
      <section id="privacy" className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Privacy Policy</h2>
          <div className="max-w-3xl mx-auto text-muted-foreground">
            <p className="mb-4">
              Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="mb-4">
              We collect information such as your name, email address, and payment information when you use our services. We use this information to provide you with our services, process payments, and communicate with you.
            </p>
            <p className="mb-4">
              We do not share your personal information with third parties except as necessary to provide our services or as required by law.
            </p>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-3xl mx-auto text-muted-foreground text-center">
            <p>
              Email us at <a href="mailto:support@example.com" className="text-primary">support@example.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
