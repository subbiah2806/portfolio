import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = 'Subbiah Chandramouli | Lead Software Developer | React, TypeScript, Web3',
  description = 'Lead Software Developer with 7+ years of experience in React, TypeScript, Next.js, Vue.js, and AI-powered development. Specialized in building scalable web applications, enterprise security platforms, and modern UI/UX. Expert in React 18, Vite, TailwindCSS, and AI tools integration.',
  keywords = 'frontend developer, software developer, lead developer, react developer, typescript, nextjs, vuejs, web3, blockchain, ethereum, solidity, tailwindcss, ai tools, claude code, openai, cursor ai, enterprise security, praetorian, banyan security, logichub, apple, texas a&m',
  image = 'https://avatars.githubusercontent.com/subbiah2806',
  url = 'https://subbiah.dev',
  type = 'profile',
}: SEOProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Subbiah Chandramouli',
    jobTitle: 'Lead Software Developer',
    description: description,
    url: url,
    image: image,
    email: 'subbiah2806@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dallas',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Texas A&M University',
        location: 'Kingsville, TX',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Saveetha Engineering College',
        location: 'Chennai, India',
      },
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'Next.js',
      'Vue.js',
      'Web3',
      'Blockchain',
      'Ethereum',
      'Solidity',
      'TailwindCSS',
      'AI Tools Integration',
      'Claude Code',
      'OpenAI Codex',
      'Cursor AI',
      'Devin AI',
      'Frontend Architecture',
      'Performance Optimization',
      'Enterprise Security',
      'UI/UX Design',
      'Component Libraries',
      'Storybook',
      'AWS',
      'Node.js',
      'Go',
      'Neo4j',
      'DynamoDB',
    ],
    workLocation: {
      '@type': 'Place',
      name: 'Remote',
    },
    sameAs: ['https://github.com/subbiah2806', 'https://www.linkedin.com/in/subbiah-c-31b339184/'],
    worksFor: [
      {
        '@type': 'Organization',
        name: 'Praetorian Security',
        description: 'Lead Software Developer',
        startDate: '2023-09',
        endDate: '2025-10',
      },
      {
        '@type': 'Organization',
        name: 'Banyan Security',
        description: 'Senior Software Developer',
        startDate: '2022-06',
        endDate: '2023-08',
      },
      {
        '@type': 'Organization',
        name: 'LogicHub',
        description: 'Senior Software Developer',
        startDate: '2019-12',
        endDate: '2022-05',
      },
      {
        '@type': 'Organization',
        name: 'Apple',
        description: 'Software Developer',
        startDate: '2018-07',
        endDate: '2019-11',
      },
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Subbiah Chandramouli" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Subbiah Chandramouli Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@subbiah2806" />

      {/* Additional Meta Tags for SEO */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Subbiah Portfolio" />
      <meta name="application-name" content="Subbiah Portfolio" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="format-detection" content="telephone=no" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};

export default SEO;
