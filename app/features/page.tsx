import { Card } from "@/components/ui/card"
import { Wand2, Shield, Clock, CheckCircle2, Camera, Sparkles, Globe, Lock } from "lucide-react"
import Image from "next/image"

export default function Features() {
  const mainFeatures = [
    {
      icon: <Wand2 className="h-12 w-12" />,
      title: "AI Enhancement",
      description: "Smart background removal and lighting adjustment for perfect ID photos every time."
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Compliance Guaranteed",
      description: "Our system ensures your photos meet official requirements for any document type worldwide."
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: "Instant Results",
      description: "Get your professional ID photos in less than 5 minutes, no appointment needed."
    },
    {
      icon: <CheckCircle2 className="h-12 w-12" />,
      title: "Expert Verification",
      description: "Every photo is verified by our AI system and reviewed by photography experts."
    }
  ];

  const additionalFeatures = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Multiple Photo Sizes",
      description: "Support for passport, visa, ID card, and driver's license photos from any country."
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Retouching",
      description: "Professional-grade enhancement while maintaining compliance with official requirements."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Standards",
      description: "Up-to-date requirements for documents from over 100 countries."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Processing",
      description: "Your photos are processed securely and deleted after download."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Advanced Features for Perfect ID Photos</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Our AI-powered platform combines cutting-edge technology with expert verification to deliver perfect ID photos every time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="mb-6 text-primary">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Powered by Advanced AI Technology</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI system processes thousands of photos daily, learning and improving continuously to provide the best results for our users.
              </p>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Real-time Analysis</h3>
                    <p className="text-muted-foreground">Instant feedback on photo quality and compliance</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Compliance Check</h3>
                    <p className="text-muted-foreground">Automatic verification against official requirements</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1633419461186-7d40a38105ec"
                alt="AI Technology"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">More Powerful Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}