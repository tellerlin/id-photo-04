import { Card } from "@/components/ui/card"
import { Shield, Lock, Eye, FileText, Server, Trash2 } from "lucide-react"

export default function Privacy() {
  const sections = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Data Protection",
      description: "We employ industry-standard security measures to protect your personal information and photos."
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Processing",
      description: "All photo processing is done securely on our servers with encrypted transmission."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Privacy First",
      description: "We never share your personal information or photos with third parties."
    },
    {
      icon: <Trash2 className="h-8 w-8" />,
      title: "Data Deletion",
      description: "Your photos are automatically deleted after processing and download."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              We take your privacy seriously. Learn how we protect your personal information and photos.
            </p>
          </div>
        </div>
      </section>

      {/* Key Privacy Features */}
      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4 text-primary">{section.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground">{section.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Privacy Policy */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-6">
              We collect only the necessary information needed to provide our ID photo service:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground">
              <li>Your uploaded photos</li>
              <li>Basic contact information (email address)</li>
              <li>Payment information (processed securely by our payment providers)</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-6">
              Your information is used solely for:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground">
              <li>Processing your ID photos</li>
              <li>Providing customer support</li>
              <li>Sending order confirmations and updates</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">3. Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We implement various security measures to maintain the safety of your personal information:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground">
              <li>SSL encryption for all data transmission</li>
              <li>Secure photo processing servers</li>
              <li>Automatic photo deletion after processing</li>
              <li>Regular security audits and updates</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">4. Your Rights</h2>
            <p className="text-muted-foreground mb-6">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-8 text-muted-foreground">
              <li>Access your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">5. Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about our privacy policy or how we handle your data, please contact our privacy team at privacy@idphotopro.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}