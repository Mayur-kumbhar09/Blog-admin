import HoverableCell from "../pages/HoverableCell";

export const columns = [
  {
    // title: "Title",
    // dataIndex: "title",
    // key: "title",
    // render: (text, record) => (
    //   <HoverableCell
    //     key={record.key}
    //     text={text}
    //     record={{
    //       ...record,
    //       id: record.key,
    //     }}
    //   />
    // ),
    title: "Title",
    dataIndex: "title",
    key: "title",

    render: (text, record) => {
      console.log("TABLE RECORD:", record);

      return <HoverableCell text={text} record={record} />;
    },
  },

  {
    title: "Authors",
    dataIndex: "authors",
  },

  {
    title: "Categories",
    dataIndex: "categories",
  },

  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Post Activity",
    dataIndex: "activity",

    render: (activity) => (
      <div>
        <div>👁 Views: {activity.views}</div>
        <div>❤️ Likes: {activity.likes}</div>
      </div>
    ),
  },

  {
    title: "Post Review",
    dataIndex: "review",
  },

  {
    title: "AIOSEO Details",
    dataIndex: "aioseo",

    render: (aioseo) => (
      <div>
        <div>
          <span
            style={{
              color: aioseo.seoScore < 50 ? "#ff4d4f" : "#52c41a",
            }}
          >
            SEO: {aioseo.seoScore}/100
          </span>
        </div>

        <div>
          <span
            style={{
              color: aioseo.readabilityScore < 50 ? "#ff4d4f" : "#52c41a",
            }}
          >
            Readability: {aioseo.readabilityScore}/100
          </span>
        </div>

        <div>
          <b>Title:</b> {aioseo.title}
        </div>

        <div>
          <b>Description:</b> {aioseo.description}
        </div>
      </div>
    ),
  },
];

export const data = [
  {
    key: "1",
    title: "Stream Companies Named Stellantis MarketCenter Partner",
    authors: "GlobeNewswire",
    categories: "Performance Marketing",
    date: "2026/05/22 at 7:00 pm",
    activity: { views: 6, likes: "N/A" },
    review: "N/A",
    aioseo: {
      seoScore: 40,
      readabilityScore: 58,
      title: "Stream Companies Named Stellantis MarketCenter Partner",
      description:
        "Through MarketCenter, Stream Companies brings its full marketing suite...",
    },
  },
  {
    key: "2",
    title: "Gemini Rises to No. 2 AI Referral Source: BrightEdge",
    authors: "GlobeNewswire",
    categories: "Advocacy, Loyalty & Referrals",
    date: "2026/05/22 at 6:45 pm",
    activity: { views: 6, likes: "N/A" },
    review: "N/A",
    aioseo: {
      seoScore: 53,
      readabilityScore: 64,
      title: "Gemini Rises to No. 2 AI Referral Source: BrightEdge",
      description:
        "Google’s Gemini triples AI referral share as consumer engagement grows...",
    },
  },
  {
    key: "3",
    title: "OtterlyAI Wins European Search Awards 2026",
    authors: "GlobeNewswire",
    categories: "Optimization, Personalization & Testing",
    date: "2026/05/22 at 6:30 pm",
    activity: { views: 8, likes: "N/A" },
    review: "N/A",
    aioseo: {
      seoScore: 42,
      readabilityScore: 71,
      title: "OtterlyAI Wins European Search Awards 2026",
      description: "Bootstrapped platform surpasses +30,000 active users...",
    },
  },
  {
    key: "4",
    title: "AI Chatbots Revolutionizing Customer Support",
    authors: "TechWorld",
    categories: "AI, Customer Experience",
    date: "2026/05/21 at 5:00 pm",
    activity: { views: 12, likes: 5 },
    review: "N/A",
    aioseo: {
      seoScore: 65,
      readabilityScore: 80,
      title: "AI Chatbots Revolutionizing Customer Support",
      description: "How AI chatbots reduce response times and improve CX...",
    },
  },
  {
    key: "5",
    title: "Top Marketing Trends 2026",
    authors: "MarketInsights",
    categories: "Marketing, Trends",
    date: "2026/05/21 at 4:15 pm",
    activity: { views: 15, likes: 7 },
    review: "N/A",
    aioseo: {
      seoScore: 70,
      readabilityScore: 85,
      title: "Top Marketing Trends 2026",
      description: "Explore the emerging marketing trends shaping 2026...",
    },
  },
  {
    key: "6",
    title: "Cloud Security Best Practices",
    authors: "CyberSecure",
    categories: "Technology, Security",
    date: "2026/05/21 at 3:30 pm",
    activity: { views: 10, likes: 2 },
    review: "N/A",
    aioseo: {
      seoScore: 60,
      readabilityScore: 75,
      title: "Cloud Security Best Practices",
      description:
        "Ensure your cloud infrastructure is protected against threats...",
    },
  },
  {
    key: "7",
    title: "Effective SEO Strategies for E-commerce",
    authors: "SEOExperts",
    categories: "SEO, E-commerce",
    date: "2026/05/20 at 2:45 pm",
    activity: { views: 20, likes: 8 },
    review: "N/A",
    aioseo: {
      seoScore: 80,
      readabilityScore: 90,
      title: "Effective SEO Strategies for E-commerce",
      description:
        "Boost your online store traffic with these proven SEO tactics...",
    },
  },
  {
    key: "8",
    title: "Remote Work Productivity Tips",
    authors: "WorkSmart",
    categories: "Productivity, Remote Work",
    date: "2026/05/20 at 1:30 pm",
    activity: { views: 18, likes: 9 },
    review: "N/A",
    aioseo: {
      seoScore: 75,
      readabilityScore: 88,
      title: "Remote Work Productivity Tips",
      description: "Maximize your output while working remotely...",
    },
  },
  {
    key: "9",
    title: "The Rise of AI in Healthcare",
    authors: "HealthTech",
    categories: "AI, Healthcare",
    date: "2026/05/19 at 11:00 am",
    activity: { views: 25, likes: 12 },
    review: "N/A",
    aioseo: {
      seoScore: 85,
      readabilityScore: 92,
      title: "The Rise of AI in Healthcare",
      description:
        "AI technologies transforming patient care and diagnostics...",
    },
  },
  {
    key: "10",
    title: "Blockchain Beyond Cryptocurrency",
    authors: "FinTechToday",
    categories: "Blockchain, Finance",
    date: "2026/05/19 at 10:00 am",
    activity: { views: 22, likes: 11 },
    review: "N/A",
    aioseo: {
      seoScore: 78,
      readabilityScore: 86,
      title: "Blockchain Beyond Cryptocurrency",
      description: "Exploring blockchain applications outside of crypto...",
    },
  },
  {
    key: "11",
    title: "Sustainable Marketing Practices",
    authors: "EcoMarketers",
    categories: "Sustainability, Marketing",
    date: "2026/05/18 at 4:00 pm",
    activity: { views: 9, likes: 3 },
    review: "N/A",
    aioseo: {
      seoScore: 68,
      readabilityScore: 81,
      title: "Sustainable Marketing Practices",
      description:
        "How businesses can adopt eco-friendly marketing strategies...",
    },
  },
  {
    key: "12",
    title: "Data Privacy Regulations 2026",
    authors: "LegalTech",
    categories: "Law, Technology",
    date: "2026/05/18 at 3:00 pm",
    activity: { views: 14, likes: 6 },
    review: "N/A",
    aioseo: {
      seoScore: 72,
      readabilityScore: 84,
      title: "Data Privacy Regulations 2026",
      description: "Key updates to GDPR and other privacy regulations...",
    },
  },
  {
    key: "13",
    title: "Next-gen Mobile Apps to Watch",
    authors: "AppInsights",
    categories: "Mobile, Tech",
    date: "2026/05/17 at 2:15 pm",
    activity: { views: 16, likes: 7 },
    review: "N/A",
    aioseo: {
      seoScore: 77,
      readabilityScore: 87,
      title: "Next-gen Mobile Apps to Watch",
      description: "Innovative mobile applications trending this year...",
    },
  },
  {
    key: "14",
    title: "AI-Powered Content Marketing",
    authors: "ContentGenius",
    categories: "AI, Marketing",
    date: "2026/05/17 at 1:30 pm",
    activity: { views: 19, likes: 9 },
    review: "N/A",
    aioseo: {
      seoScore: 83,
      readabilityScore: 91,
      title: "AI-Powered Content Marketing",
      description: "Using AI to automate and optimize content creation...",
    },
  },
  {
    key: "15",
    title: "Future of Remote Collaboration Tools",
    authors: "CollabTech",
    categories: "Technology, Remote Work",
    date: "2026/05/16 at 12:45 pm",
    activity: { views: 21, likes: 10 },
    review: "N/A",
    aioseo: {
      seoScore: 79,
      readabilityScore: 89,
      title: "Future of Remote Collaboration Tools",
      description:
        "Tools and platforms shaping the future of remote teamwork...",
    },
  },
];

export const items = [
  { value: "-1", label: "Bulk actions" },
  { value: "edit", label: "Edit" },
  { value: "trash", label: "Move to Trash" },
  {
    value: "AIOSEO",
    label: "AIOSEO",
    children: [
      {
        value: "aioseo_generate_ai_titles",
        label: "Generate SEO Titles with AI",
      },
      {
        value: "aioseo_generate_ai_descriptions",
        label: "Generate Meta Descriptions with AI",
      },
    ],
  },
];
