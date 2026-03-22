import { BookOpen, GraduationCap, Globe, Landmark, ExternalLink, Library, Monitor, Users, Database, Building2, CircleDollarSign, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SourceFooter } from "@/components/SourceLinks";

const learningResources = [
  { name: "SWAYAM", desc: "Free online courses offered by Indian universities and institutions.", link: "https://swayam.gov.in", icon: GraduationCap, category: "Courses" },
  { name: "NPTEL", desc: "Engineering, science, and management courses from IITs and IISc.", link: "https://nptel.ac.in", icon: Monitor, category: "Courses" },
  { name: "National Digital Library of India", desc: "Millions of books, research papers, and educational materials.", link: "https://ndl.iitkgp.ac.in", icon: Library, category: "Library" },
  { name: "DIKSHA", desc: "Digital learning platform for school education and teacher training.", link: "https://diksha.gov.in", icon: BookOpen, category: "School" },
  { name: "Coursera", desc: "Online courses from global universities and institutions.", link: "https://www.coursera.org", icon: Globe, category: "Courses" },
  { name: "edX", desc: "Free courses from universities such as Harvard and MIT.", link: "https://www.edx.org", icon: GraduationCap, category: "Courses" },
  { name: "Khan Academy", desc: "Free courses for school and college-level learning.", link: "https://www.khanacademy.org", icon: BookOpen, category: "School" },
  { name: "Project Gutenberg", desc: "Free public domain books including classics and historical texts.", link: "https://www.gutenberg.org", icon: FileText, category: "Library" },
];

const govResources = [
  { name: "India.gov.in", desc: "Official portal for government services, schemes, and information.", link: "https://www.india.gov.in", icon: Landmark, category: "Portal" },
  { name: "MyGov", desc: "Platform for citizen participation in governance and policy discussions.", link: "https://www.mygov.in", icon: Users, category: "Participation" },
  { name: "Open Government Data Platform India", desc: "Public datasets from government departments.", link: "https://data.gov.in", icon: Database, category: "Data" },
  { name: "Census of India", desc: "Population statistics and demographic data of India.", link: "https://censusindia.gov.in", icon: Users, category: "Data" },
  { name: "Reserve Bank of India", desc: "Financial policies, reports, and economic data.", link: "https://www.rbi.org.in", icon: CircleDollarSign, category: "Finance" },
  { name: "National Portal of India Services", desc: "Directory of online government services for citizens.", link: "https://services.india.gov.in", icon: Building2, category: "Services" },
];

const ResourceCard = ({ item, index }: { item: typeof learningResources[0]; index: number }) => {
  const Icon = item.icon;
  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 60}ms` }}>
      <CardContent className="p-5 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">{item.category}</span>
            <h3 className="mt-1 text-base font-semibold font-heading text-foreground leading-tight">{item.name}</h3>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="mt-4">
          <Button variant="outline" size="sm" className="w-full gap-2">
            Visit <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

const Resources = () => (
  <div className="container mx-auto px-4 py-10 space-y-14">
    {/* Header */}
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-display text-foreground animate-title-reveal">
        Resources
      </h1>
      <p className="mt-3 text-muted-foreground text-lg">
        Curated learning platforms and official government portals for students and citizens.
      </p>
    </div>

    {/* Free Learning Resources */}
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-hero">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-heading text-foreground">Free Learning Resources</h2>
          <p className="text-sm text-muted-foreground">Access free online education, books, and learning platforms</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {learningResources.map((item, i) => (
          <ResourceCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>

    {/* Government & Public Information */}
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-saffron">
          <Landmark className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-heading text-foreground">Government & Public Information</h2>
          <p className="text-sm text-muted-foreground">Official government resources and public data portals</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {govResources.map((item, i) => (
          <ResourceCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>

    <SourceFooter sources={["Government of India", "Wikipedia", "Government of India Open Data Portal"]} />
  </div>
);

export default Resources;
