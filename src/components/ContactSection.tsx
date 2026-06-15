import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

interface ContactSectionProps {
  onStartOrdering: () => void;
  onGeneralChat: () => void;
}

export default function ContactSection({ onStartOrdering, onGeneralChat }: ContactSectionProps) {
  return (
    <section id="contact" className="py-12 bg-gradient-to-t from-white to-[#F2FAED] scroll-mt-20 border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}

  

      </div>
    </section>
  );
}
