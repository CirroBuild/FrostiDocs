type Quote = {
  website: string
  logo: {
    alt: string
    src: string
    height: number
    width: number
  }
  text: string
  author: string
  role: string
  company: string
}

const quotes: Quote[] = [
  {
    website: "https://www.airbus.com/",
    logo: {
      alt: "Airbus logo",
      src: "/img/pages/customers/cards/airbus.svg",
      height: 56,
      width: 140,
    },
    text:
      "QuestDB is used at Airbus for real-time applications involving hundreds of millions of data points per day. For us, QuestDB is an outstanding solution that meets (and exceeds) our performance requirements.",
    author: "Oliver Pfeiffer",
    role: "Software Architect",
    company: "Airbus",
  },
  {
    website: "https://www.yahoo.com/",
    logo: {
      alt: "Yahoo logo",
      src: "/img/pages/customers/cards/yahoo.svg",
      height: 56,
      width: 140,
    },
    text:
      "We use QuestDB to monitor metrics for autoscaling decisions within our ML engine that provides search, recommendation, and personalization via models and aggregations on continuously changing data.",
    author: "Jon Bratseth",
    role: "VP Architect",
    company: "Yahoo",
  },
  {
    website: "https://www.keplercheuvreux.com/en/",
    logo: {
      alt: "Kepler logo",
      src: "/img/pages/customers/cards/kepler.svg",
      height: 56,
      width: 140,
    },
    text:
      "When we set out to design the next generation of our execution platform, one of our requirements was large-scale model calibration based on real-time market data streams. QuestDB allows us to derive quick insights on live and historical data that would not be achievable with other open source time series databases.",
    author: "Jean-Francois Perreton",
    role: "Head of Algo Quant",
    company: "Kepler Cheuvreux",
  },
  {
    website: "https://www.datron.com/",
    logo: {
      alt: "Datron logo",
      src: "/img/pages/customers/cards/datron.svg",
      height: 56,
      width: 140,
    },
    text:
      "With QuestDB's turnkey solution in Docker, we quickly built a solid foundation for a data acquisition pipeline with billions of measurements.",
    author: "Andreas Landmann",
    role: "Director, Research & Technology",
    company: "DATRON",
  },
  {
    website: "https://www.ably.io/",
    logo: {
      alt: "Ably logo",
      src: "/img/pages/customers/cards/ably.svg",
      height: 56,
      width: 140,
    },
    text:
      "QuestDB allows me to build tools and systems without having to learn proprietary query languages while maintaining industry-leading performance and a straightforward setup.",
    author: "Ben Gamble",
    role: "Head of Dev Rel",
    company: "Ably",
  },
  {
    website: "https://toggle.ai/",
    logo: {
      alt: "Toggle logo",
      src: "/img/pages/customers/cards/toggle.svg",
      height: 56,
      width: 140,
    },
    text:
      "We switched from InfluxDB to QuestDB to get queries that are on average 300x faster utilizing 1/4 of the hardware, without ever overtaxing our servers.",
    author: "Armenak Mayalian",
    role: "CTO",
    company: "Toggle",
  },
  {
    website: "https://www.innova.com.tr/en/about-us/about-innova",
    logo: {
      alt: "Innova logo",
      src: "/img/pages/customers/logos/turk_telekom.svg",
      height: 56,
      width: 140,
    },
    text:
      "QuestDB allows us to query data while writing millions of records. It is an excellent database for time series analysis and can efficiently store our data. QuestDB’s community is constantly growing and its popularity is on the rise.",
    author: "Erdem Aydemir",
    role: "Software Engineer",
    company: "Türk Telekom",
  },
  {
    website: "https://www.samtec.com/",
    logo: {
      alt: "Samtec logo",
      src: "/img/pages/customers/cards/samtec.svg",
      height: 56,
      width: 140,
    },
    text:
      "QuestDB is the most promising open source platform for time series analytics. It's thoughtfully designed to be both wicked fast and easy to use.",
    author: "Nick Slocum",
    role: "Senior Software Engineer",
    company: "Samtec",
  },
  {
    website: "https://www.biba.uni-bremen.de/en/institute/infrastructure.html",
    logo: {
      alt: "BIBA logo",
      src: "/img/pages/customers/cards/biba.svg",
      height: 56,
      width: 140,
    },
    text:
      "At BIBA, we leverage QuestDB in IoT and Industrial Automation. Aside from out-of-the-box readiness, the performance is fantastic, and the ease of usage provides us a path to perform faster and better analyses.",
    author: "Shan Desai",
    role: "Research Scientist",
    company: "BIBA",
  },
]

export default quotes
