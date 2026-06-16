import { resumeData } from '../../data/resume';
import { MapPin, Mail, Phone, Download, FileText } from 'lucide-react';
import { Badge } from '@allsetlabs/forge/components/ui/badge';
import { Button } from '@allsetlabs/forge/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@allsetlabs/forge/components/ui/dropdown-menu';
import { downloadResume, type ResumeFormat } from '@allsetlabs/forge/lib/generateResume/index';
import { fetchResumeData } from '../../utils';

export function Hero(): JSX.Element {
  const handleDownloadResume = async (format: ResumeFormat): Promise<void> => {
    try {
      const data = await fetchResumeData();
      await downloadResume(data, format);
    } catch (error) {
      console.error('Failed to download resume:', error);
      alert('Failed to generate resume. Please try again.');
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="animate-fade-in max-w-4xl text-center">
        <div className="animate-slide-up mb-8 inline-block">
          <Badge className="font-mono">Open to opportunities</Badge>
        </div>

        <h1 className="animate-slide-up text-foreground mb-6 text-5xl font-bold md:text-7xl">
          {resumeData.name}
        </h1>

        <p className="animate-slide-up text-card-foreground mb-4 text-xl font-semibold md:text-2xl">
          Lead Software Developer
        </p>

        <p className="animate-slide-up text-muted-foreground mx-auto mb-8 max-w-3xl text-lg leading-relaxed">
          {resumeData.summary}
        </p>

        <div className="animate-slide-up text-muted-foreground mb-8 flex flex-wrap justify-center gap-4 text-sm">
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

        <div className="animate-slide-up flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="clickable rounded-full">
            <a href={`mailto:${resumeData.email}`}>Get in Touch</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="clickable rounded-full">
            <a href="#experience">View Experience</a>
          </Button>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="lg" className="clickable rounded-full">
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" matchTriggerWidth>
              <DropdownMenuItem onClick={() => handleDownloadResume('docx')}>
                <FileText className="mr-2 h-4 w-4" />
                Download as DOCX
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadResume('pdf')}>
                <Download className="mr-2 h-4 w-4" />
                Download as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
