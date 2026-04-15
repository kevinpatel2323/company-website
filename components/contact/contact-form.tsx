'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from 'lucide-react';

const serviceOptions = [
  "Brand & Strategy",
  "Digital Design",
  "Development",
  "Growth & Analytics",
  "UX Research",
  "Others"
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    service: '',
    project: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-3">
          01. Your name
        </label>
        <Input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-foreground/5 border-foreground/10 placeholder:text-muted-foreground/50 h-12"
        />
      </div>

      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-3">
          02. Company name
        </label>
        <Input
          type="text"
          name="company"
          placeholder="Your company name"
          value={formData.company}
          onChange={handleChange}
          className="bg-foreground/5 border-foreground/10 placeholder:text-muted-foreground/50 h-12"
        />
      </div>

      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-3">
          03. Phone number
        </label>
        <Input
          type="tel"
          name="phone"
          placeholder="Enter your number"
          value={formData.phone}
          onChange={handleChange}
          className="bg-foreground/5 border-foreground/10 placeholder:text-muted-foreground/50 h-12"
        />
      </div>

      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-3">
          04. Email address
        </label>
        <Input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-foreground/5 border-foreground/10 placeholder:text-muted-foreground/50 h-12"
        />
      </div>

      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-3">
          05. Website
        </label>
        <Input
          type="url"
          name="website"
          placeholder="https://yourwebsite.com"
          value={formData.website}
          onChange={handleChange}
          className="bg-foreground/5 border-foreground/10 placeholder:text-muted-foreground/50 h-12"
        />
      </div>

      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-3">
          06. I&apos;m interested in...
        </label>
        <Select value={formData.service} onValueChange={handleServiceChange}>
          <SelectTrigger className="bg-foreground/5 border-foreground/10 h-12">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-mono text-muted-foreground mb-3">
          07. Tell us about your project
        </label>
        <Textarea
          name="project"
          placeholder="Describe your project and what you're looking for..."
          value={formData.project}
          onChange={handleChange}
          required
          rows={5}
          className="bg-foreground/5 border-foreground/10 placeholder:text-muted-foreground/50 resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-foreground hover:bg-foreground/90 text-background px-8 h-14 text-base rounded-full group"
      >
        Send Message
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
}
