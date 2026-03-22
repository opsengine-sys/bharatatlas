import { useState } from "react";
import { Calendar, User, MapPin, ChevronDown, Scroll, Swords, Crown, BookOpen, Globe, Coins, Landmark, Sparkles } from "lucide-react";
import { SourceLink } from "@/components/SourceLinks";

interface HistoryEvent {
  title: string;
  period: string;
  desc: string;
  details: string;
  figures: { name: string; role: string }[];
  location: string;
  source: string;
  highlights: string[];
  legacy: string;
  capital?: string;
  religion?: string;
  economy?: string;
  population?: string;
}

const periods = [
  {
    era: "Ancient",
    gradient: "gradient-saffron",
    icon: Scroll,
    desc: "From the earliest civilizations to the great classical empires",
    events: [
      {
        title: "Indus Valley Civilization",
        period: "3300–1300 BCE",
        desc: "One of the world's earliest urban civilizations, centered around the Indus River with over 1,400 known sites spanning modern Pakistan, India, and Afghanistan.",
        details: "The civilization demonstrated remarkable urban planning with grid-pattern streets, multi-story brick houses, public baths (Great Bath at Mohenjo-daro), and an advanced drainage system unmatched until the Roman era. They developed standardized weights, measures, and a still-undeciphered script. Trade networks reached Mesopotamia, Central Asia, and the Persian Gulf. The civilization's decline around 1300 BCE remains debated — theories include climate change, river shifts, and tectonic activity.",
        figures: [
          { name: "Unknown rulers", role: "Governance structure still debated" },
        ],
        location: "Punjab, Sindh, Gujarat, Rajasthan",
        source: "Wikipedia",
        highlights: ["Great Bath of Mohenjo-daro", "1,400+ archaeological sites", "Undeciphered script", "Advanced drainage & sanitation", "Trade with Mesopotamia"],
        legacy: "Laid the foundation for subcontinental urban culture; many practices like yoga postures and worship of nature may trace back to this era.",
        capital: "Mohenjo-daro & Harappa (major centers)",
        economy: "Agriculture, bead-making, metallurgy, long-distance trade",
        population: "~5 million at peak",
      },
      {
        title: "Vedic Period",
        period: "1500–500 BCE",
        desc: "Period of composition of the Vedas — the oldest scriptures of Hinduism — and the formation of early Indian philosophy, social structures, and political systems.",
        details: "The Early Vedic period (1500–1000 BCE) was pastoral and semi-nomadic, centered on the Sapta Sindhu (Seven Rivers) region. The Later Vedic period (1000–500 BCE) saw expansion into the Gangetic plain, rise of agriculture, formation of 16 Mahajanapadas (great kingdoms), and development of the varna system. The Upanishads, composed in this era, introduced concepts of Brahman, Atman, karma, and moksha that became foundational to Indian philosophy. The period also saw the emergence of Buddhism and Jainism as reform movements.",
        figures: [
          { name: "Vyasa", role: "Compiler of the Vedas" },
          { name: "Yajnavalkya", role: "Philosopher of the Upanishads" },
          { name: "Mahavira", role: "Founder of Jainism" },
          { name: "Gautama Buddha", role: "Founder of Buddhism" },
        ],
        location: "Indo-Gangetic Plain",
        source: "Wikipedia",
        highlights: ["Rigveda — oldest text", "Upanishadic philosophy", "16 Mahajanapadas", "Birth of Buddhism & Jainism", "Sanskrit language evolution"],
        legacy: "Established the religious, philosophical, and social frameworks that would shape Indian civilization for millennia.",
        religion: "Early Hinduism, emergence of Buddhism & Jainism",
        economy: "Pastoral → Agricultural transition, early trade guilds",
      },
      {
        title: "Maurya Empire",
        period: "322–185 BCE",
        desc: "The first empire to unify most of the Indian subcontinent, established by Chandragupta Maurya with guidance from the strategist Chanakya.",
        details: "Chandragupta Maurya overthrew the Nanda dynasty and repelled the Greek successor states in the northwest. His grandson Ashoka (r. 268–232 BCE) conquered Kalinga in a devastating war, after which he famously embraced Buddhism and non-violence. Ashoka erected pillars and rock edicts across the empire proclaiming dharma (moral law), religious tolerance, and welfare policies. The empire had a sophisticated bureaucracy described in Chanakya's Arthashastra — often called the world's first treatise on political science and economics. The empire maintained a standing army of 600,000 infantry, 30,000 cavalry, and 9,000 war elephants.",
        figures: [
          { name: "Chandragupta Maurya", role: "Founder, first emperor" },
          { name: "Chanakya (Kautilya)", role: "Chief advisor, author of Arthashastra" },
          { name: "Bindusara", role: "Second emperor, expanded southward" },
          { name: "Ashoka the Great", role: "Third emperor, spread Buddhism" },
        ],
        location: "Pan-India (except far south)",
        source: "Wikipedia",
        highlights: ["Arthashastra — political science treatise", "Ashoka's rock & pillar edicts", "600,000-strong army", "Spread of Buddhism to Sri Lanka & Central Asia", "Centralized bureaucracy"],
        legacy: "Created the template for Indian imperial governance; Ashoka's Lion Capital became the national emblem of modern India.",
        capital: "Pataliputra (modern Patna)",
        economy: "Centralized taxation, state-run industries, extensive trade routes",
        population: "~50–60 million",
      },
      {
        title: "Gupta Empire",
        period: "320–550 CE",
        desc: "Known as the Golden Age of India — an era of extraordinary achievements in science, mathematics, astronomy, philosophy, art, and literature.",
        details: "The Gupta period saw some of humanity's most important intellectual breakthroughs. Aryabhata calculated the value of pi to four decimal places, proposed that Earth rotates on its axis, and developed the place-value decimal system. The concept of zero as a number was formalized. Varahamihira contributed to astronomy and astrology. Kalidasa wrote Shakuntala and Meghaduta, considered masterpieces of Sanskrit literature. Nalanda University became the world's first residential university, attracting scholars from China, Korea, Japan, and Southeast Asia. The Ajanta and Ellora caves were carved with stunning Buddhist and Hindu art.",
        figures: [
          { name: "Chandragupta I", role: "Founder of the dynasty" },
          { name: "Samudragupta", role: "'Napoleon of India', great conqueror" },
          { name: "Chandragupta II (Vikramaditya)", role: "Patron of arts and learning" },
          { name: "Aryabhata", role: "Mathematician and astronomer" },
          { name: "Kalidasa", role: "Greatest Sanskrit poet and playwright" },
        ],
        location: "Northern & Central India",
        source: "Wikipedia",
        highlights: ["Invention of zero", "Aryabhata's heliocentric ideas", "Nalanda University", "Ajanta & Ellora cave paintings", "Iron Pillar of Delhi (rust-resistant)"],
        legacy: "Scientific and cultural achievements from this era influenced civilizations across Asia and eventually the entire world.",
        capital: "Pataliputra, later Ujjain",
        economy: "Flourishing trade with Rome, Southeast Asia; gold coins",
        population: "~30–35 million",
      },
      {
        title: "Chola Dynasty",
        period: "300 BCE–1279 CE",
        desc: "One of the longest-ruling dynasties in world history, the Cholas built a powerful maritime empire across Southeast Asia.",
        details: "Under Rajaraja Chola I and Rajendra Chola I (985–1044 CE), the Chola Empire became a major naval power. Rajendra Chola launched naval expeditions to Southeast Asia, conquering parts of the Malay Peninsula, Sumatra, and Java. The Cholas built magnificent temples including the Brihadeeswarar Temple at Thanjavur — a UNESCO World Heritage Site and engineering marvel with a 66-meter vimana (tower). They established an efficient local self-government system and promoted Tamil literature and Shaivite Hinduism. Their bronze sculptures, especially of Nataraja (dancing Shiva), are considered among the finest art of the ancient world.",
        figures: [
          { name: "Rajaraja Chola I", role: "Expanded empire, built Brihadeeswarar Temple" },
          { name: "Rajendra Chola I", role: "Naval conqueror of Southeast Asia" },
          { name: "Karikala Chola", role: "Early ruler, built Grand Anicut dam" },
        ],
        location: "Tamil Nadu, Southeast Asia",
        source: "Wikipedia",
        highlights: ["Brihadeeswarar Temple (1010 CE)", "Naval expeditions to SE Asia", "Local self-governance system", "Nataraja bronze sculptures", "Grand Anicut — oldest dam in use"],
        legacy: "Spread Indian culture, Hinduism, and Tamil language across Southeast Asia; temple architecture influenced the entire region.",
        capital: "Thanjavur, later Gangaikondacholapuram",
        economy: "Maritime trade, agriculture, textile exports",
      },
    ],
  },
  {
    era: "Medieval",
    gradient: "gradient-hero",
    icon: Swords,
    desc: "Sultanates, empires, and the rise of new cultural syntheses",
    events: [
      {
        title: "Delhi Sultanate",
        period: "1206–1526",
        desc: "A succession of five Turkic and Afghan dynasties ruling from Delhi that introduced Indo-Islamic culture and reshaped northern India's political landscape.",
        details: "The five dynasties — Mamluk, Khalji, Tughlaq, Sayyid, and Lodi — each brought distinct administrative and cultural contributions. Alauddin Khalji repelled multiple Mongol invasions (1297–1308), preventing the devastation that befell Central Asia and the Middle East. Muhammad bin Tughlaq, known for ambitious but often failed experiments, attempted to introduce token currency. The Sultanate era saw the construction of Qutub Minar, Alai Darwaza, and Tughlaqabad Fort. It introduced the iqta (land grant) system, Persian as the court language, and saw the emergence of Urdu as a lingua franca. Sufi saints like Nizamuddin Auliya spread Islam through peaceful means.",
        figures: [
          { name: "Qutb ud-Din Aibak", role: "Founder, built Qutub Minar" },
          { name: "Alauddin Khalji", role: "Military genius, repelled Mongols" },
          { name: "Muhammad bin Tughlaq", role: "Innovative but eccentric ruler" },
          { name: "Firoz Shah Tughlaq", role: "Builder and reformer" },
          { name: "Nizamuddin Auliya", role: "Influential Sufi saint" },
        ],
        location: "North India, expanding into Deccan",
        source: "Wikipedia",
        highlights: ["Qutub Minar (73m tower)", "Repelled 6 Mongol invasions", "Introduction of Persian governance", "Emergence of Urdu language", "Sufi movement expansion"],
        legacy: "Laid the foundations for Mughal rule; created a syncretic Indo-Islamic culture in architecture, music, language, and cuisine.",
        capital: "Delhi (multiple fortress cities)",
        economy: "Agricultural taxation, textile trade, horse imports from Central Asia",
      },
      {
        title: "Vijayanagara Empire",
        period: "1336–1646",
        desc: "A powerful South Indian empire that served as a bulwark against Islamic expansion in the south and became one of the wealthiest states in the medieval world.",
        details: "Founded by Harihara I and Bukka I with guidance from sage Vidyaranya, the empire reached its zenith under Krishnadevaraya (r. 1509–1529). The capital Hampi had a population of ~500,000, rivaling Rome and Beijing. Portuguese traveler Domingo Paes described it as 'the best provided city in the world.' The empire maintained a massive army with advanced military technology including gunpowder weapons. Krishnadevaraya patronized literature in Telugu, Kannada, Sanskrit, and Tamil. The Virupaksha Temple, Vittala Temple (with its famous stone chariot), and the empire's elaborate water management system showcase remarkable engineering.",
        figures: [
          { name: "Harihara I", role: "Co-founder of the empire" },
          { name: "Krishnadevaraya", role: "Greatest emperor, patron of arts" },
          { name: "Tenali Ramakrishna", role: "Legendary poet and wit" },
          { name: "Vidyaranya", role: "Sage and advisor" },
        ],
        location: "South India (Karnataka, Andhra, Tamil Nadu, Kerala)",
        source: "Wikipedia",
        highlights: ["Hampi — UNESCO World Heritage Site", "500,000 population capital city", "Stone chariot of Vittala Temple", "Advanced water management", "Multi-lingual literary patronage"],
        legacy: "Preserved and promoted Hindu culture and Dravidian architecture during a tumultuous period; Hampi's ruins remain one of India's most visited heritage sites.",
        capital: "Vijayanagara (Hampi)",
        economy: "International trade in spices, diamonds, textiles; diamond mines of Golconda",
        population: "~25 million",
      },
      {
        title: "Mughal Empire",
        period: "1526–1857",
        desc: "One of the largest and most culturally influential empires in world history, the Mughals created an extraordinary synthesis of Persian, Central Asian, and Indian cultures.",
        details: "Babur, a descendant of Timur and Genghis Khan, defeated the Delhi Sultanate at the First Battle of Panipat (1526). Akbar (r. 1556–1605) was the empire's greatest administrator — he abolished the jizya tax, created the Din-i-Ilahi interfaith dialogue, and established the mansabdari administrative system. Shah Jahan (r. 1628–1658) built the Taj Mahal (1632–1653), considered the finest example of Mughal architecture. At its peak under Aurangzeb (r. 1658–1707), the empire controlled almost the entire subcontinent and had a GDP estimated at 24.4% of the world economy — the largest of any empire at the time. The empire's decline accelerated after Aurangzeb's death due to succession wars, regional rebellions, and the rise of Maratha, Sikh, and European powers.",
        figures: [
          { name: "Babur", role: "Founder, victor of Panipat" },
          { name: "Akbar", role: "Greatest administrator, promoted tolerance" },
          { name: "Jahangir", role: "Patron of painting and gardens" },
          { name: "Shah Jahan", role: "Builder of the Taj Mahal" },
          { name: "Aurangzeb", role: "Last great emperor, largest territory" },
          { name: "Dara Shikoh", role: "Scholar prince, translated Upanishads" },
        ],
        location: "Pan-India (except extreme south)",
        source: "Wikipedia",
        highlights: ["Taj Mahal — Wonder of the World", "24.4% of world GDP at peak", "Mansabdari administrative system", "Red Fort & Jama Masjid of Delhi", "Mughal miniature painting tradition"],
        legacy: "Shaped India's architecture, cuisine, language (Urdu), music, gardens, and administrative traditions; the Mughal aesthetic remains central to Indian cultural identity.",
        capital: "Agra, Delhi, Fatehpur Sikri",
        economy: "Largest world economy; textiles (muslin, silk), spices, indigo export",
        population: "~150 million at peak (1700 CE)",
      },
      {
        title: "Maratha Empire",
        period: "1674–1818",
        desc: "Founded by Chhatrapati Shivaji Maharaj, the Marathas became the dominant political force in 18th-century India through innovative warfare and governance.",
        details: "Shivaji Maharaj established Hindavi Swarajya (self-rule) through guerrilla warfare against the Mughal and Bijapur Sultanates. He built a powerful navy — India's first significant naval force — and fortified over 300 forts across the Western Ghats. After his death, the Peshwas (prime ministers based in Pune) expanded Maratha control across India. At their zenith, the Marathas controlled territory from Peshawar to Tanjore. The Third Battle of Panipat (1761) against Ahmad Shah Abdali was a devastating defeat but didn't end Maratha power. The empire's confederate structure (Holkar, Scindia, Gaekwad, Bhonsle) ultimately weakened it against the British through the three Anglo-Maratha Wars (1775–1818).",
        figures: [
          { name: "Chhatrapati Shivaji Maharaj", role: "Founder, military genius" },
          { name: "Bajirao I", role: "Greatest Peshwa, undefeated general" },
          { name: "Ahilyabai Holkar", role: "Legendary queen of Indore" },
          { name: "Mahadji Scindia", role: "Restored Mughal emperor to throne" },
          { name: "Sambhaji Maharaj", role: "Shivaji's son, resisted Aurangzeb" },
        ],
        location: "Western, Central & Northern India",
        source: "Wikipedia",
        highlights: ["300+ forts across Western Ghats", "First Indian naval force", "Peshwa administration from Pune", "Third Battle of Panipat (1761)", "Confederacy spanning coast to coast"],
        legacy: "Demonstrated that indigenous Indian powers could challenge and defeat established empires; Shivaji remains one of India's most celebrated historical figures.",
        capital: "Raigad (under Shivaji), Pune (under Peshwas)",
        economy: "Chauth & Sardeshmukhi taxation, trade, agriculture",
        population: "~60–80 million under Maratha influence",
      },
      {
        title: "Sikh Empire",
        period: "1799–1849",
        desc: "A formidable sovereign state in the Punjab region founded by Maharaja Ranjit Singh, known for its religious tolerance and powerful military.",
        details: "Maharaja Ranjit Singh united the Sikh misls (confederacies) and created a modern, secular state with Hindus, Muslims, and Sikhs serving in his court and army. He modernized the Khalsa army with European-trained officers, making it one of the most disciplined forces in Asia. He recovered the Koh-i-Noor diamond and adorned the Harmandir Sahib (Golden Temple) with gold leaf, giving it its iconic appearance. The empire's decline after his death in 1839 led to the Anglo-Sikh Wars and eventual British annexation of Punjab in 1849.",
        figures: [
          { name: "Maharaja Ranjit Singh", role: "Founder, 'Lion of the Punjab'" },
          { name: "Hari Singh Nalwa", role: "Commander-in-chief, conqueror of Peshawar" },
          { name: "Jind Kaur", role: "Last queen regent" },
        ],
        location: "Punjab, Kashmir, parts of Afghanistan",
        source: "Wikipedia",
        highlights: ["Golden Temple gilded in gold", "Koh-i-Noor diamond recovered", "Secular multi-faith governance", "Modernized Khalsa army", "Controlled the Khyber Pass"],
        legacy: "Last major Indian power to fall to the British; Ranjit Singh's model of secular governance remains an ideal for pluralistic societies.",
        capital: "Lahore",
        economy: "Agriculture, trade, Kashmiri shawl exports",
      },
    ],
  },
  {
    era: "Modern",
    gradient: "gradient-emerald",
    icon: Crown,
    desc: "Colonial era, independence struggle, and the birth of a republic",
    events: [
      {
        title: "British Colonial Period",
        period: "1757–1947",
        desc: "Nearly two centuries of British rule that fundamentally transformed India's economy, society, legal system, and infrastructure — while igniting one of history's greatest freedom struggles.",
        details: "British control began with the East India Company's victory at the Battle of Plassey (1757) and was consolidated after the suppression of the 1857 Revolt. The Crown took direct control in 1858. Colonial policies deindustrialized India's textile sector, imposed exploitative land revenue systems (Permanent Settlement, Ryotwari), and caused devastating famines — the Bengal Famine of 1943 alone killed 3 million people. However, the British also introduced railways (67,000 km by 1947), telegraph, modern legal codes, English education, and universities. India's share of world GDP fell from ~24% in 1700 to ~3% by 1947, representing one of history's largest wealth transfers.",
        figures: [
          { name: "Robert Clive", role: "Won Battle of Plassey" },
          { name: "Lord Dalhousie", role: "Introduced railways, Doctrine of Lapse" },
          { name: "Lord Curzon", role: "Partitioned Bengal (1905)" },
          { name: "Lord Mountbatten", role: "Last Viceroy, oversaw independence" },
        ],
        location: "Pan-India",
        source: "Wikipedia",
        highlights: ["GDP share fell from 24% to 3%", "67,000 km of railways built", "Bengal Famine — 3 million deaths", "Introduction of English education", "Modern legal & judicial system"],
        legacy: "Left India with modern institutions but deep economic scars; the colonial experience shaped India's post-independence policies of self-reliance and non-alignment.",
        capital: "Calcutta (until 1911), New Delhi (1911–1947)",
        economy: "Extractive colonial economy; raw material export, manufactured goods import",
        population: "~390 million by 1941",
      },
      {
        title: "Indian Freedom Movement",
        period: "1857–1947",
        desc: "A 90-year struggle for independence that combined armed resistance, mass civil disobedience, and political mobilization — ultimately freeing 400 million people.",
        details: "The 1857 Revolt (Sepoy Mutiny) was the first large-scale uprising against British rule. The Indian National Congress (1885) and Muslim League (1906) became key political organizations. Mahatma Gandhi's arrival from South Africa (1915) transformed the movement with satyagraha (non-violent resistance). Key campaigns included Non-Cooperation (1920–22), Salt March (1930), and Quit India (1942). Subhas Chandra Bose formed the Indian National Army (INA) to fight alongside Japan during WWII. Revolutionary movements by Bhagat Singh, Chandrashekhar Azad, and others ran parallel to the non-violent struggle. India finally achieved independence on August 15, 1947, though Partition created two nations and caused one of history's largest mass migrations — 15 million people displaced and up to 2 million killed.",
        figures: [
          { name: "Mahatma Gandhi", role: "Father of the Nation, leader of non-violence" },
          { name: "Jawaharlal Nehru", role: "First Prime Minister" },
          { name: "Subhas Chandra Bose", role: "Leader of INA, 'Netaji'" },
          { name: "Bhagat Singh", role: "Revolutionary freedom fighter" },
          { name: "Sardar Vallabhbhai Patel", role: "'Iron Man', unified 565 princely states" },
          { name: "B.R. Ambedkar", role: "Chief architect of the Constitution" },
          { name: "Sarojini Naidu", role: "'Nightingale of India', first woman governor" },
        ],
        location: "Pan-India",
        source: "Wikipedia",
        highlights: ["Salt March — 388 km walk (1930)", "Quit India Movement (1942)", "INA and armed resistance", "Partition — 15 million displaced", "Non-violent resistance model for the world"],
        legacy: "Inspired global decolonization movements; Gandhi's non-violence influenced Martin Luther King Jr., Nelson Mandela, and civil rights movements worldwide.",
        capital: "British India: Delhi; INA: Rangoon, Singapore",
        population: "~400 million at independence",
      },
      {
        title: "Republic of India",
        period: "1947–Present",
        desc: "From a newly independent nation ravaged by Partition to the world's fifth-largest economy and a rising global power.",
        details: "India adopted its Constitution on January 26, 1950 — the world's longest written constitution, drafted primarily by B.R. Ambedkar. Nehru's era (1947–64) established democratic institutions, IITs, ISRO's predecessor, and the Non-Aligned Movement. The Green Revolution (1960s–70s) transformed India from food-deficit to food-surplus. The 1991 economic liberalization under PM Narasimha Rao and Finance Minister Manmohan Singh opened India to global trade and investment, triggering rapid growth. India conducted nuclear tests in 1998, launched the Mars Orbiter Mission (Mangalyaan) in 2013 on its first attempt, and Chandrayaan-3 achieved a lunar south pole landing in 2023. Today India has the world's largest population (1.44 billion), a $3.94 trillion economy, and is a leader in IT, pharmaceuticals, and space technology.",
        figures: [
          { name: "Jawaharlal Nehru", role: "First PM, architect of modern India" },
          { name: "B.R. Ambedkar", role: "Father of the Constitution" },
          { name: "Indira Gandhi", role: "PM, led Green Revolution era" },
          { name: "Manmohan Singh", role: "Architect of 1991 economic reforms" },
          { name: "A.P.J. Abdul Kalam", role: "'Missile Man', 11th President" },
          { name: "Narendra Modi", role: "Current PM since 2014" },
        ],
        location: "Pan-India",
        source: "Wikipedia",
        highlights: ["World's longest constitution (1950)", "Green Revolution — food self-sufficiency", "1991 economic liberalization", "Mangalyaan — Mars on first attempt (2013)", "Chandrayaan-3 — lunar south pole (2023)"],
        legacy: "The world's largest democracy, a nuclear power, and the fifth-largest economy — India's post-independence journey represents one of history's greatest democratic experiments.",
        capital: "New Delhi",
        economy: "$3.94 trillion GDP (2024), IT, pharma, space, agriculture",
        population: "1.44 billion (2024, world's most populous nation)",
      },
    ],
  },
];

const History = () => {
  const [activeEra, setActiveEra] = useState<string>("all");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const filtered = activeEra === "all" ? periods : periods.filter((p) => p.era === activeEra);

  const toggleEvent = (key: string) => {
    setExpandedEvent(expandedEvent === key ? null : key);
  };

  const totalEvents = periods.reduce((sum, p) => sum + p.events.length, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">History Module</p>
        <h1 className="text-3xl lg:text-5xl font-display text-foreground">
          5000+ Years of Indian History
        </h1>
        <p className="mt-3 text-muted-foreground max-w-2xl text-base font-heading">
          Explore the major periods, empires, and movements that shaped the Indian subcontinent — from the Indus Valley to the modern republic.
        </p>
        <div className="flex gap-6 mt-5 text-sm">
          <span className="text-muted-foreground"><span className="font-semibold text-foreground">{periods.length}</span> eras</span>
          <span className="text-muted-foreground"><span className="font-semibold text-foreground">{totalEvents}</span> events</span>
          <span className="text-muted-foreground"><span className="font-semibold text-foreground">5300+</span> years</span>
        </div>
      </div>

      {/* Era Selector Cards */}
      <div className="grid md:grid-cols-3 gap-3 mb-10">
        {periods.map((period) => {
          const Icon = period.icon;
          return (
            <button
              key={period.era}
              onClick={() => setActiveEra(activeEra === period.era ? "all" : period.era)}
              className={`text-left rounded-xl p-4 border transition-all duration-200 ${
                activeEra === period.era
                  ? "border-secondary shadow-elevated"
                  : "border-border hover:border-secondary/50 hover:shadow-card"
              } bg-card`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${period.gradient}`}>
                  <Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground text-sm">{period.era}</p>
                  <p className="text-[10px] text-muted-foreground">{period.events.length} events</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{period.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-8">
        {["all", "Ancient", "Medieval", "Modern"].map((era) => (
          <button
            key={era}
            onClick={() => setActiveEra(era)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
              activeEra === era
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            {era === "all" ? "All Eras" : era}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-14">
        {filtered.map((period) => {
          const Icon = period.icon;
          return (
            <div key={period.era}>
              <div className="flex items-center gap-3 mb-8">
                <div className={`h-10 w-10 rounded-xl ${period.gradient} flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground">{period.era} Period</h2>
                  <p className="text-xs text-muted-foreground">{period.desc}</p>
                </div>
              </div>

              <div className="relative pl-10 ml-4">
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full ${period.gradient}`} />

                <div className="space-y-4">
                  {period.events.map((event, i) => {
                    const key = `${period.era}-${i}`;
                    const isExpanded = expandedEvent === key;

                    return (
                      <div
                        key={i}
                        className={`relative rounded-xl border bg-card transition-all duration-300 cursor-pointer ${
                          isExpanded
                            ? "shadow-elevated border-secondary"
                            : "shadow-card border-border hover:border-secondary/40 hover:shadow-elevated"
                        }`}
                        onClick={() => toggleEvent(key)}
                      >
                        {/* Connector dot */}
                        <div className="absolute -left-[46px] top-5 flex items-center">
                          <div className={`h-4 w-4 rounded-full ${period.gradient} ring-4 ring-background transition-transform duration-200 ${isExpanded ? "scale-150" : ""}`} />
                          <div className="w-[30px] h-px bg-border" />
                        </div>

                        <div className="p-5">
                          {/* Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <Calendar className="h-3.5 w-3.5 text-secondary" />
                                <span className="text-xs font-mono text-secondary font-semibold">{event.period}</span>
                              </div>
                              <h3 className="text-lg font-display font-bold text-foreground">{event.title}</h3>
                            </div>
                            <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                          </div>

                          <p className={`mt-2 text-sm text-muted-foreground leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
                            {event.desc}
                          </p>

                          {/* Expanded content */}
                          <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                            {/* Detailed description */}
                            <div className="mb-4 p-4 rounded-lg bg-muted/50 border border-border">
                              <p className="text-sm text-foreground/80 leading-relaxed font-heading">{event.details}</p>
                            </div>

                            {/* Key highlights */}
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3 text-secondary" /> Key Highlights
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {event.highlights.map((h, hi) => (
                                  <span key={hi} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted text-xs font-medium text-foreground">
                                    <BookOpen className="h-3 w-3 text-secondary" />
                                    {h}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Quick facts grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                              {event.capital && (
                                <div className="p-2.5 rounded-lg bg-muted/50">
                                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1"><Landmark className="h-3 w-3" /> Capital</p>
                                  <p className="text-xs text-foreground mt-0.5">{event.capital}</p>
                                </div>
                              )}
                              {event.economy && (
                                <div className="p-2.5 rounded-lg bg-muted/50">
                                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1"><Coins className="h-3 w-3" /> Economy</p>
                                  <p className="text-xs text-foreground mt-0.5">{event.economy}</p>
                                </div>
                              )}
                              {event.population && (
                                <div className="p-2.5 rounded-lg bg-muted/50">
                                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1"><User className="h-3 w-3" /> Population</p>
                                  <p className="text-xs text-foreground mt-0.5">{event.population}</p>
                                </div>
                              )}
                              {event.religion && (
                                <div className="p-2.5 rounded-lg bg-muted/50">
                                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground flex items-center gap-1"><Globe className="h-3 w-3" /> Religion</p>
                                  <p className="text-xs text-foreground mt-0.5">{event.religion}</p>
                                </div>
                              )}
                            </div>

                            {/* Key Figures */}
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <User className="h-3 w-3 text-secondary" /> Key Figures
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {event.figures.map((fig, fi) => (
                                  <div key={fi} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center shrink-0">
                                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-foreground">{fig.name}</p>
                                      <p className="text-[10px] text-muted-foreground">{fig.role}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Legacy */}
                            <div className="p-3 rounded-lg border border-secondary/20 bg-secondary/5 mb-3">
                              <p className="text-[10px] uppercase tracking-wider font-semibold text-secondary mb-1">Legacy & Impact</p>
                              <p className="text-xs text-foreground/80 leading-relaxed">{event.legacy}</p>
                            </div>

                            {/* Location & Source */}
                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-secondary" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                Source: <SourceLink name={event.source} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
