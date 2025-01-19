// page.tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Camera, Wand2, Shield, Clock, Upload, Sparkles, Settings, Download, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto relative z-10"> {/* 添加 container 和 mx-auto */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Create Professional ID Photos Instantly with ID Photographic
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Get perfect ID photos for any official document with our advanced AI-powered ID photo maker. No need to visit a photo booth, create your compliant ID photo from the comfort of your home.
              </p>
              <div className="flex gap-4">
                <Link href="/idphoto">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-md">
                    Start Making Your ID Photo
                  </Button>
                </Link>
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
        <div className="container mx-auto"> {/* 添加 container 和 mx-auto */}
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Wand2 className="h-8 w-8" />,
                title: "Smart AI Processing",
                description: "Our AI automatically removes backgrounds and adjusts lighting for perfect ID photos."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Guaranteed Compliance",
                description: "Meets all official ID photo requirements, ensuring your photos are accepted worldwide."
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Instant ID Photo Maker",
                description: "Get your professional ID photos in just minutes, no appointment needed."
              },
              {
                icon: <CheckCircle2 className="h-8 w-8" />,
                title: "Professional Review",
                description: "Expert verification ensures your ID photos meet the highest standards."
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
        <div className="container mx-auto"> {/* 添加 container 和 mx-auto */}
          <h2 className="text-3xl font-bold text-center mb-12">Create Your ID Photo in 4 Simple Steps</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                icon: <Upload className="h-8 w-8" />,
                title: "Upload Your Photo",
                description: "Use any device to upload a clear, front-facing portrait."
              },
              {
                icon: <Sparkles className="h-8 w-8" />,
                title: "AI-Powered Processing",
                description: [
                  "Intelligent background removal",
                  "Automatic cropping to the correct ID photo size",
                  "Outline guidance for precise framing"
                ]
              },
              {
                icon: <Settings className="h-8 w-8" />,
                title: "Customize Your ID Photo",
                description: [
                  "Select the required aspect ratio",
                  "Choose your preferred background color"
                ]
              },
              {
                icon: <Download className="h-8 w-8" />,
                title: "Download Your ID Photo",
                description: "Get your professional, print-ready ID photo instantly."
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
        <div className="container mx-auto"> {/* 添加 container 和 mx-auto */}
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {[
                {
                  question: "What kind of ID photos can I create with ID Photographic?",
                  answer: "Our ID photo maker supports photos for passports, driver's licenses, visas, and other official documents for any country. We ensure your photos meet all specific requirements. This service is completely free to use."
                },
                 {
                  question: "How does the AI processing work?",
                   answer: "Our AI first intelligently removes the background from your photo, then it assists in cropping the image to the correct ID photo size, ensuring the person's face is properly centered and sized according to the selected aspect ratio."
                },
                {
                  question: "How quickly can I get my ID photos?",
                  answer: "Our AI-powered system processes your photos in just a few minutes. You'll receive both digital and printable versions instantly."
                },
                {
                  question: "Are the ID photos guaranteed to be accepted?",
                  answer: "We strive to ensure your ID photos meet all official requirements. While we cannot guarantee acceptance by every authority, we provide tools and guidance to help you create compliant photos."
                },
                 {
                  question: "What are the photo requirements?",
                  answer: "For best results, please use a clear, front-facing portrait with a plain, light-colored background. Avoid wearing hats or sunglasses, and maintain a neutral expression."
                },
                {
                  question: "What if I'm not satisfied with the results?",
                  answer: "We offer unlimited retakes and a 100% satisfaction guarantee. Our goal is to ensure you are completely happy with your ID photos. Since the service is free, you can try as many times as you need."
                },
                 {
                    question: "What aspect ratios are supported and what are they used for?",
                    answer: (
                        <>
                            <p>We support various aspect ratios to meet different ID photo requirements:</p>
                            <ul>
                                <li><strong>1:1</strong> - 2x2 inches (51x51mm): Common for US and UK passports, and social media profile pictures.</li>
                                <li><strong>2:3</strong> - 2x3 inches (51x76mm): Used for ID photos in France and Spain, and standard photo prints.</li>
                                <li><strong>3:4</strong> - 3x4 inches (76x102mm): Used for passports in Germany and the Netherlands, and visa applications.</li>
                                <li><strong>4:3</strong> - 4x3 inches (102x76mm): Used for driver's licenses in some US states, and is a standard digital camera ratio.</li>
                                <li><strong>5:7</strong> - 2.5x3.5 inches (64x89mm): Used for certain professional ID cards in European countries.</li>
                                <li><strong>7:9</strong> - 2.8x3.5 inches (71x89mm): Used for specific ID requirements in Japan and South Korea.</li>
                                <li><strong>9:7</strong> - 3.5x2.8 inches (89x71mm): Used for some Asian countries' residence permit photos.</li>
                            </ul>
                        </>
                    )
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
        <div className="container mx-auto"> {/* 添加 container 和 mx-auto */}
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
        <div className="container mx-auto"> {/* 添加 container 和 mx-auto */}
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-3xl mx-auto text-muted-foreground text-center">
            <p>
              Email us at <a href="mailto:info@idphotographic.com" className="text-primary">info@idphotographic.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
