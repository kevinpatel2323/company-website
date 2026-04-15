'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-16">
      {/* Direct Contact */}
      <div>
        <h3 className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wide">
          Direct Contact
        </h3>
        <div className="space-y-6">
          <a 
            href="mailto:hello@Tachyon Tech."
            className="flex items-center gap-4 group hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-foreground font-medium">hello@Tachyon Tech.</p>
            </div>
          </a>

          <a 
            href="tel:+16049999999"
            className="flex items-center gap-4 group hover:opacity-80 transition-opacity"
          >
            <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground/20 transition-colors">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <p className="text-foreground font-medium">+1 (604) 999-9999</p>
            </div>
          </a>
        </div>
      </div>

      {/* Office Locations */}
      <div>
        <h3 className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wide">
          Office Locations
        </h3>
        
        <div className="space-y-12">
          {/* Vancouver */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Vancouver, Canada</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                #210 - 128 W Hastings St
                <br />
                Vancouver, BC V6B 1G8
              </p>
            </div>
          </div>

          {/* Toronto */}
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Toronto, Canada</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                123 King Street West
                <br />
                Toronto, ON M5H 2A1
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div>
        <h3 className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wide">
          Business Hours
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saturday</span>
            <span className="text-foreground font-medium">10:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sunday</span>
            <span className="text-foreground font-medium">Closed</span>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-sm font-mono text-muted-foreground mb-8 uppercase tracking-wide">
          Follow Us
        </h3>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors text-sm font-medium">
            X
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors text-sm font-medium">
            In
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors text-sm font-medium">
            Ig
          </a>
        </div>
      </div>
    </div>
  );
}
