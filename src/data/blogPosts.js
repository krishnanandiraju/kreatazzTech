export const blogPosts = [
  {
    title: "Empowering Businesses with Custom Application Development: Kreatazz's Expertise",
    slug: 'best-in-class-custom-application-development',
    date: '2025-02-05',
    excerpt:
      'Custom application development helps businesses address unique challenges and drive growth through tailored, scalable, modern solutions.',
    featuredImage: '/blog/licensed-app-development.jpg',
    content: [
      'In today\'s digital era, businesses need to stay ahead by adopting innovative technologies. At Kreatazz, we build bespoke applications tailored to business context and measurable outcomes.',
      'Our delivery model combines leadership-level consulting, modern architecture, and iterative engineering from discovery and prototyping through deployment and long-term support.',
      'From quality assurance and performance testing to production rollout and ongoing maintenance, we focus on reliable delivery and sustainable product evolution.',
    ],
  },
  {
    title: 'Empowering Decision-Making with Kreatazz: Your Path to the Right Analytical Solutions',
    slug: 'your-right-ai-partner',
    date: '2025-02-13',
    excerpt:
      'Transforming raw data into actionable insights requires strong analytics foundations, practical dashboards, and domain-aware strategy.',
    featuredImage: '/blog/licensed-ai-analytics.jpg',
    content: [
      'Organizations today face a data abundance problem. The real advantage comes from translating data into operationally useful decisions.',
      'Kreatazz delivers customized analytics solutions with data engineering, predictive models, and clear visualization layers that support business velocity.',
      'We combine implementation with training and ongoing support so teams can confidently use analytics capabilities in day-to-day decisions.',
    ],
  },
  {
    title: 'Tailored Talent Solutions: How KITS Elevates Executive Search',
    slug: 'tailored-talent-solutions-how-kits-elevates-executive-search',
    date: '2025-02-20',
    excerpt:
      'Executive search and staffing success depend on context understanding, structured assessment, and disciplined candidate relationship management.',
    featuredImage: '/blog/licensed-executive-search.jpg',
    content: [
      'KITS follows a context-first talent model: role clarity, organization fit, and process discipline before candidate shortlisting.',
      'The approach includes attraction planning, screening, structured assessment, interview coordination, and offer-stage alignment with both client and candidate expectations.',
      'This process-driven framework helps organizations build high-quality teams while reducing hiring risk and execution delays.',
    ],
  },
]

export const blogPostBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post]))
