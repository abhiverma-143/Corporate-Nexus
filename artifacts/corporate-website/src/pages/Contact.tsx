import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Building, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is required"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate(
      { data },
      {
        onSuccess: (res) => {
          toast({
            title: "Success",
            description: res.message || "Your message has been sent successfully. We will get back to you soon.",
          });
          reset();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to send message. Please try again later.",
          });
        }
      }
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Get in Touch" subtitle="Global Contact" />

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          
          {/* Contact Info & Map Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-foreground mb-6">Headquarters</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-sm bg-secondary border border-border flex items-center justify-center text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Aegis Tower</h4>
                    <p className="text-muted-foreground mt-1">1 Financial District<br/>New York, NY 10004<br/>United States</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-sm bg-secondary border border-border flex items-center justify-center text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Phone</h4>
                    <p className="text-muted-foreground mt-1">+1 (212) 555-0199</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-sm bg-secondary border border-border flex items-center justify-center text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Email</h4>
                    <p className="text-muted-foreground mt-1">corporate@aegisgroup.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[300px] bg-secondary border border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground relative overflow-hidden">
              {/* Fake map background using abstract lines */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #d4af37 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <Building size={48} className="mb-4 text-primary/50" />
              <p className="font-medium tracking-wide">Interactive Map Interface</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-8 md:p-10 shadow-xl"
          >
            <h3 className="text-2xl font-display font-bold text-foreground mb-8">Send an Inquiry</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input 
                    {...register("name")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <input 
                    {...register("email")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company (Optional)</label>
                  <input 
                    {...register("company")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Organization Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                  <input 
                    {...register("subject")}
                    className="w-full bg-background border border-border px-4 py-3 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Inquiry Subject"
                  />
                  {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea 
                  {...register("message")}
                  rows={5}
                  className="w-full bg-background border border-border px-4 py-3 rounded-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={submitContact.isPending}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitContact.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  "Submit Message"
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
