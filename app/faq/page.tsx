import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, FileQuestion, Camera, CreditCard } from "lucide-react"

export default function FAQ() {
  const categories = [
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Photo Requirements",
      count: 6
    },
    {
      icon: <FileQuestion className="h-6 w-6" />,
      title: "Technical Support",
      count: 4
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Pricing & Payment",
      count: 3
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "General Questions",
      count: 5
    }
  ];

  const faqs = [
    {
      category: "Photo Requirements",
      questions: [
        {
          q: "What types of ID photos can I create?",
          a: "You can create photos for passports, driver's licenses, visas, and other official documents from any country. Our system supports multiple formats and sizes to meet various requirements."
        },
        {
          q: "What are the basic requirements for ID photos?",
          a: "Generally, you should have a neutral facial expression, look directly at the camera, and ensure your face is clearly visible without shadows. The photo should have a plain background and good lighting."
        },
        {
          q: "Can I wear glasses in my ID photo?",
          a: "It depends on the document type and country. For most passport photos, glasses are not recommended unless medically required. Our system will guide you through the specific requirements for your document type."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "How long does it take to get my photos?",
          a: "Most photos are processed within 5 minutes. You'll receive both digital and printable versions that you can download immediately."
        },
        {
          q: "What file formats do you provide?",
          a: "We provide photos in JPEG format, which is universally accepted. For printing, we also provide high-resolution files that meet professional printing standards."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          q: "Are the photos guaranteed to be accepted?",
          a: "Yes! We guarantee acceptance for official use or we'll refund your purchase. Our compliance check ensures your photos meet all requirements."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, PayPal, and other popular payment methods. All transactions are secure and encrypted."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions about our ID photo service
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for answers..."
                className="pl-10 py-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <div className="text-primary">{category.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12">
        <div className="container">
          {faqs.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem key={faqIndex} value={`${index}-${faqIndex}`}>
                    <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent>{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}