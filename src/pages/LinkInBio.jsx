import { BookOpen, MessageCircle, MapPin, Mail, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function LinkInBio() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "640220232207";

  const links = [
    {
      icon: BookOpen,
      title: "Browse Our Collection",
      description: "Explore our curated selection of books",
      href: "/",
      internal: true,
    },
    {
      icon: MessageCircle,
      title: "Request a Book",
      description: "Can't find what you're looking for?",
      href: "/request",
      internal: true,
    },
    {
      icon: MessageCircle,
      title: "Chat on WhatsApp",
      description: "Quick questions? Message us directly",
      href: `https://wa.me/${whatsappNumber}`,
      internal: false,
    },
    // {
    //   icon: MapPin,
    //   title: 'Visit Our Store',
    //   description: 'Come browse in person',
    //   href: 'https://maps.google.com',
    //   internal: false
    // },
    // {
    //   icon: Mail,
    //   title: 'Email Us',
    //   description: 'hello@veenaandverse.com',
    //   href: 'mailto:hello@veenaandverse.com',
    //   internal: false
    // }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">
            Veena & Verse
          </h1>
          <p className="text-sm text-gray-500 font-light tracking-wide">
            Your Literary Haven
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          {links.map((link, index) => {
            const Icon = link.icon;
            const LinkComponent = link.internal ? Link : "a";
            const linkProps = link.internal
              ? { to: link.href }
              : {
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };

            return (
              <LinkComponent key={index} {...linkProps} className="block group">
                <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-900 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                        <Icon
                          size={20}
                          className="text-gray-600 group-hover:text-white transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-base font-medium text-gray-900 mb-1">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-light">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </div>
              </LinkComponent>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-light tracking-wide">
            &copy; 2024 Veena & Verse
          </p>
        </div>
      </div>
    </div>
  );
}
