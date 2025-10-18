import { resumeData } from '../../data/resume';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Badge } from '@subbiah/component/components/ui/badge';
import { Button } from '@subbiah/component/components/ui/button';

export default function Hero(): JSX.Element {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="z-10 max-w-4xl animate-fade-in text-center">
        <div className="mb-8 inline-block animate-slide-up">
          <Badge className="font-mono">Open to opportunities</Badge>
        </div>

        <h1 className="mb-6 animate-slide-up text-5xl font-bold text-foreground md:text-7xl">
          {resumeData.name}
        </h1>

        <p className="mb-4 animate-slide-up text-xl font-semibold text-card-foreground md:text-2xl">
          Lead Frontend Developer
        </p>

        <p className="mx-auto mb-8 max-w-3xl animate-slide-up text-lg leading-relaxed text-muted-foreground">
          {resumeData.summary}
        </p>

        <div className="mb-8 flex animate-slide-up flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {resumeData.location}
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {resumeData.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            {resumeData.phone}
          </div>
        </div>

        <div className="flex animate-slide-up flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="clickable rounded-full">
            <a href={`mailto:${resumeData.email}`}>Get in Touch</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="clickable rounded-full">
            <a href="#experience">View Experience</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
