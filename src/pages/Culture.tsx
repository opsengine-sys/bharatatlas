import { Languages, PartyPopper, Music, UtensilsCrossed, BookOpen, Building, Palette, Film, Shirt, Gem, Heart, Star, Globe, Users } from "lucide-react";
import { SourceFooter } from "@/components/SourceLinks";
import { useState } from "react";

const keyFacts = [
  { label: "Official Languages", value: "22", icon: Languages },
  { label: "UNESCO Sites", value: "42", icon: Building },
  { label: "Classical Dances", value: "8", icon: Music },
  { label: "Religions", value: "6 Major", icon: Heart },
  { label: "Total Languages", value: "19,500+", icon: Globe },
  { label: "Classical Languages", value: "6", icon: BookOpen },
  { label: "Film Industries", value: "30+", icon: Film },
  { label: "Textile Traditions", value: "100+", icon: Shirt },
];

const languages = [
  { name: "Hindi", speakers: "528M", family: "Indo-Aryan", script: "Devanagari", detail: "Most widely spoken. Official language of the Union. Used in Bollywood, governance, and commerce across the Hindi belt — UP, MP, Bihar, Rajasthan, etc." },
  { name: "Bengali", speakers: "100M", family: "Indo-Aryan", script: "Bengali", detail: "Language of Rabindranath Tagore (Nobel 1913). 'Jana Gana Mana' (national anthem) composed in Bengali. Rich literary tradition spanning 1,000+ years." },
  { name: "Telugu", speakers: "83M", family: "Dravidian", script: "Telugu", detail: "Most spoken Dravidian language. Called 'Italian of the East' for its vowel-heavy phonetics. Tollywood is India's largest film industry by output." },
  { name: "Marathi", speakers: "83M", family: "Indo-Aryan", script: "Devanagari", detail: "Language of Maharashtra. Rich saint-poet tradition — Tukaram, Dnyaneshwar. Oldest inscription dates to 983 CE." },
  { name: "Tamil", speakers: "78M", family: "Dravidian", script: "Tamil", detail: "One of the longest-surviving classical languages (2,000+ years). Sangam literature dates to 300 BCE. First Indian language to get classical status (2004)." },
  { name: "Urdu", speakers: "69M", family: "Indo-Aryan", script: "Nastaliq", detail: "Born in Delhi's Mughal courts. Shares grammar with Hindi but Persian-Arabic vocabulary. Language of ghazals, qawwali, and Lucknowi culture." },
  { name: "Kannada", speakers: "56M", family: "Dravidian", script: "Kannada", detail: "Classical language of Karnataka. Kavirajamarga (850 CE) — oldest surviving Kannada literary work. Halmidi inscription (450 CE)." },
  { name: "Malayalam", speakers: "38M", family: "Dravidian", script: "Malayalam", detail: "Language of Kerala — India's most literate state (96.2%). Rich cinema tradition. Unique script evolved from Tamil-Brahmi." },
  { name: "Sanskrit", speakers: "24K native", family: "Indo-Aryan", script: "Devanagari", detail: "Ancient liturgical language. Mother of many modern Indian languages. Vedas, Upanishads, epics composed in Sanskrit. NASA considers it ideal for computing." },
  { name: "Gujarati", speakers: "57M", family: "Indo-Aryan", script: "Gujarati", detail: "Mother tongue of Mahatma Gandhi. Language of Gujarat's vibrant mercantile culture. Rich tradition of garba, dandiya, and Navratri literature." },
];

const festivals = [
  { name: "Diwali", season: "Oct–Nov", region: "Pan-India", type: "Hindu", detail: "Festival of Lights. Celebrates Lord Rama's return to Ayodhya. Five days: Dhanteras → Diwali → Govardhan Puja. 1 billion+ diyas lit. Fireworks, rangoli, sweets, Lakshmi puja.", significance: "Victory of light over darkness" },
  { name: "Holi", season: "Mar", region: "Pan-India", type: "Hindu", detail: "Festival of Colors. Celebrates spring, love (Radha-Krishna), and victory of Prahlada. Bonfires (Holika Dahan) night before. Lathmar Holi of Barsana is legendary.", significance: "Triumph of good over evil" },
  { name: "Eid ul-Fitr", season: "Varies", region: "Pan-India", type: "Islamic", detail: "Marks end of Ramadan fasting. Special prayers at mosques, new clothes, feasts of biryani & seviyan (vermicelli). Eidi (gifts) for children.", significance: "Gratitude and charity" },
  { name: "Navratri / Durga Puja", season: "Sep–Oct", region: "Gujarat / Bengal", type: "Hindu", detail: "Nine nights celebrating Goddess Durga. Gujarat: world's largest open-air dance festival (garba). Bengal: grand pandals, immersion processions, dhunuchi dance.", significance: "Divine feminine power" },
  { name: "Pongal / Makar Sankranti", season: "Jan", region: "South / Pan-India", type: "Hindu", detail: "Harvest festival. Pongal (Tamil Nadu): boiling rice offering to Sun God. Makar Sankranti: kite flying (Gujarat), bonfires (Punjab's Lohri).", significance: "Gratitude for harvest" },
  { name: "Ganesh Chaturthi", season: "Aug–Sep", region: "Maharashtra", type: "Hindu", detail: "Birthday of Lord Ganesha. 10-day festival with elaborate clay idols in public pandals. Mumbai's Lalbaughcha Raja draws millions. Visarjan (immersion) procession.", significance: "New beginnings and wisdom" },
  { name: "Onam", season: "Aug–Sep", region: "Kerala", type: "Hindu", detail: "Celebrates mythical King Mahabali's annual return. Pookalam (flower carpet), Onasadya (26-dish feast on banana leaf), Vallam Kali (snake boat races).", significance: "Prosperity and unity" },
  { name: "Christmas", season: "Dec", region: "Pan-India", type: "Christian", detail: "Celebrated widely, especially in Goa, Kerala, NE India, and metros. Midnight mass, stars & cribs. Goa's unique Indo-Portuguese traditions. Kuswar (sweets) in Mangalore.", significance: "Birth of Jesus Christ" },
  { name: "Baisakhi / Vaisakhi", season: "Apr", region: "Punjab", type: "Sikh", detail: "Sikh New Year & harvest festival. Commemorates Khalsa founding (1699) by Guru Gobind Singh. Bhangra dancing, nagar kirtan processions, langar feasts.", significance: "Faith, harvest, new year" },
];

const dances = [
  { name: "Bharatanatyam", state: "Tamil Nadu", detail: "Oldest classical form (2,000+ years). Born in temples of Tamil Nadu. Combines nritta (pure dance), nritya (expression), and natya (drama). 108 karanas from Natya Shastra. Revived by Rukmini Devi Arundale.", mudras: "32 single-hand, 23 double-hand", tempo: "Alarippu → Jatiswaram → Varnam → Padam → Thillana" },
  { name: "Kathak", state: "North India", detail: "Storytelling dance of Mughal courts. Three gharanas: Lucknow (grace), Jaipur (footwork), Benares (bhakti). 100+ spins (chakkar) in performances. Birju Maharaj was its greatest modern exponent.", mudras: "Varied hand gestures", tempo: "Thaat → Toda → Tukda → Tarana" },
  { name: "Odissi", state: "Odisha", detail: "Temple dance of Jagannath Puri. Distinguished by tribhangi (three-body-bend) posture. Depicted in 2nd century BCE Udayagiri caves. Revived by Kelucharan Mohapatra.", mudras: "28 single, 24 combined", tempo: "Mangalacharan → Batu → Pallavi → Moksha" },
  { name: "Kathakali", state: "Kerala", detail: "Dance-drama with elaborate makeup (chutti) & costumes. Stories from Ramayana & Mahabharata. Five face colors denote character types. Performances last all night.", mudras: "24 basic mudras", tempo: "Kelikottu → Todayam → Purappadu → Katha" },
  { name: "Kuchipudi", state: "Andhra Pradesh", detail: "Dance-drama tradition from Kuchipudi village. Unique brass plate dance (Tarangam). Combines Natya, Nritta, and Nritya. Both male and female performers since origin.", mudras: "Detailed abhinaya system", tempo: "Dharu → Shabdam → Kirtana → Tarangam" },
  { name: "Manipuri", state: "Manipur", detail: "Graceful, gentle form depicting Radha-Krishna love (Ras Leela). No stamping — feet stay close to ground. Pung cholom (drum dance) is energetic counterpart.", mudras: "Soft, flowing movements", tempo: "Ras Leela → Sankirtana → Pung Cholom" },
  { name: "Mohiniyattam", state: "Kerala", detail: "Dance of the enchantress (Mohini). Feminine, graceful movements inspired by swaying palms and gentle waves. White and gold costumes. Revived from near extinction.", mudras: "Distinctive eye movements", tempo: "Cholkettu → Jatiswaram → Varnam → Padam" },
  { name: "Sattriya", state: "Assam", detail: "Originated in 15th century Vaishnavite monasteries (Sattras). Created by saint Srimanta Sankardev. Recognized as classical dance in 2000. Devotional themes.", mudras: "64 body movements", tempo: "Gayan-Bayan → Kharmanar Nach → Sutradhaar" },
];

const cuisines = [
  { region: "North India", states: "Punjab, UP, Delhi, Rajasthan", staple: "Wheat (roti, naan, paratha)", cooking: "Tandoor, dum (slow cooking)", signature: "Butter Chicken, Dal Makhani, Biryani, Chole Bhature, Kebabs", detail: "Mughal-influenced rich curries. Heavy use of dairy (ghee, paneer, cream). Tandoori cooking in clay ovens. Street food capital: chaat, gol gappe, jalebi." },
  { region: "South India", states: "Tamil Nadu, Kerala, Karnataka, AP, Telangana", staple: "Rice, coconut", cooking: "Tempering, steaming, fermentation", signature: "Dosa, Idli, Sambhar, Rasam, Appam, Fish Moilee", detail: "Fermented batters (dosa/idli). Coconut in everything. Kerala's Sadya: 26+ dishes on banana leaf. Chettinad cuisine — India's spiciest. Filter coffee culture." },
  { region: "East India", states: "West Bengal, Odisha, Bihar, Jharkhand", staple: "Rice, fish", cooking: "Mustard oil, panch phoron (5-spice)", signature: "Machher Jhol, Rosogolla, Litti Chokha, Pakhala", detail: "Bengali cuisine: subtle sweetness in savory dishes. Seven-course meal structure. Rosogolla invented 1868. Odisha's temple cuisine (Mahaprasad) at Jagannath Puri." },
  { region: "West India", states: "Gujarat, Maharashtra, Goa", staple: "Varies by state", cooking: "Coconut, kokum, jaggery", signature: "Vada Pav, Dhokla, Vindaloo, Puran Poli, Thali", detail: "Gujarat: largely vegetarian, sweet-savory balance. Mumbai: street food capital (vada pav, pav bhaji). Goa: Portuguese-influenced (vindaloo, bebinca, feni)." },
  { region: "Northeast", states: "Assam, Meghalaya, Nagaland, Mizoram", staple: "Rice, bamboo", cooking: "Smoking, fermenting, boiling", signature: "Pork with Bamboo Shoot, Jadoh, Axone, Smoked Meats", detail: "Minimally spiced, focus on fermentation. Bamboo shoot and bhut jolokia (ghost pepper). Tribal traditions preserved. Largely non-vegetarian, organic farming." },
];

const architectureWonders = [
  { name: "Taj Mahal", location: "Agra, UP", period: "1632–1653", style: "Mughal", detail: "Built by Shah Jahan for wife Mumtaz Mahal. White marble, 73m tall, 42-acre complex. 22 years, 20,000+ workers. Changes color with sunlight — pink (morning), white (noon), golden (evening)." },
  { name: "Khajuraho Temples", location: "MP", period: "950–1050 CE", style: "Nagara", detail: "Chandela dynasty temples. 25 surviving of original 85. Famous erotic sculptures represent ~10% of carvings. UNESCO site. Hindu & Jain temples celebrating all aspects of life." },
  { name: "Hampi", location: "Karnataka", period: "14th–16th century", style: "Dravidian", detail: "Ruins of Vijayanagara Empire — once the world's 2nd largest city. Virupaksha Temple, Stone Chariot, Musical Pillars. 4,100+ monuments across 26 km²." },
  { name: "Konark Sun Temple", location: "Odisha", period: "1250 CE", style: "Kalinga", detail: "Designed as a colossal stone chariot of Sun God Surya. 24 elaborately carved wheels (sundials), 7 horses. 'Black Pagoda' for European sailors. UNESCO site." },
  { name: "Ellora & Ajanta Caves", location: "Maharashtra", period: "2nd BCE–10th CE", style: "Rock-cut", detail: "Ajanta: 30 Buddhist caves with exquisite murals (400 BCE–650 CE). Ellora: 34 caves — Buddhist, Hindu, Jain. Kailasa Temple carved from single rock — 200,000 tonnes removed." },
  { name: "Meenakshi Temple", location: "Madurai, TN", period: "6th century CE+", style: "Dravidian", detail: "14 gopurams (gateway towers) up to 52m tall. 33,000+ sculptures. Dedicated to Goddess Meenakshi & Lord Sundareswarar. Daily evening ceremony attracts thousands." },
  { name: "Qutub Minar", location: "Delhi", period: "1193–1368 CE", style: "Indo-Islamic", detail: "73m tall — world's tallest brick minaret. 5 stories, 379 steps. Built by Qutb-ud-din Aibak. Iron Pillar (4th century) nearby — no rust for 1,600+ years." },
  { name: "Hawa Mahal", location: "Jaipur, Rajasthan", period: "1799", style: "Rajput", detail: "Palace of Winds — 953 small windows (jharokhas) with intricate latticework. 5 stories, honeycomb facade. Designed so royal women could observe street life unseen." },
];

const literature = [
  { name: "Mahabharata", author: "Vyasa", period: "~400 BCE", detail: "World's longest epic poem (100,000+ verses). Contains the Bhagavad Gita. Story of Kurukshetra War between Pandavas & Kauravas. Explores dharma, duty, and cosmic order." },
  { name: "Ramayana", author: "Valmiki", period: "~500 BCE", detail: "24,000 verses narrating Lord Rama's exile and rescue of Sita. Template for ideal governance (Ram Rajya). Versions across Southeast Asia — Thai Ramakien, Javanese Kakawin." },
  { name: "Arthashastra", author: "Chanakya/Kautilya", period: "~300 BCE", detail: "Ancient treatise on statecraft, economics, military strategy, and law. Blueprint for Mauryan Empire. Rediscovered in 1905. Compared to Machiavelli's The Prince." },
  { name: "Gitanjali", author: "Rabindranath Tagore", period: "1910", detail: "103 English prose-poems. Won Nobel Prize in Literature (1913) — first non-European laureate. 'Where the mind is without fear...' National anthem also by Tagore." },
  { name: "Kamasutra", author: "Vatsyayana", period: "~300 CE", detail: "Not merely a manual of love — comprehensive guide to virtuous living, relationships, and aesthetics. 7 books covering society, courtship, marriage, and philosophy." },
  { name: "Panchatantra", author: "Vishnu Sharma", period: "~300 BCE", detail: "Animal fables teaching statecraft and wisdom. Translated into 50+ languages — second most translated book after the Bible. Inspired Aesop's Fables, Arabian Nights." },
];

const [selectedTab, setSelectedTab] = [null, () => {}]; // placeholder

const Culture = () => {
  const [activeSection, setActiveSection] = useState("languages");
  const [selectedDance, setSelectedDance] = useState<number | null>(null);

  const sections = [
    { id: "languages", label: "Languages", icon: Languages },
    { id: "festivals", label: "Festivals", icon: PartyPopper },
    { id: "dances", label: "Classical Dance", icon: Music },
    { id: "cuisine", label: "Cuisine", icon: UtensilsCrossed },
    { id: "architecture", label: "Architecture", icon: Building },
    { id: "literature", label: "Literature", icon: BookOpen },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-2">Heritage</p>
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">Culture & Heritage</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          A 5,000-year civilization — from the world's oldest languages and epics to living traditions of dance, cuisine, and architecture that shape 1.4 billion lives daily.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
        {keyFacts.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card rounded-xl shadow-card p-3 text-center">
              <Icon className="h-4 w-4 text-secondary mx-auto mb-1" />
              <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Section Nav */}
      <div className="flex flex-wrap gap-2 mb-8 sticky top-0 bg-background/80 backdrop-blur-sm py-3 z-10">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === s.id
                  ? "gradient-hero text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted shadow-card"
              }`}
            >
              <Icon className="h-4 w-4" /> {s.label}
            </button>
          );
        })}
      </div>

      {/* Languages */}
      {activeSection === "languages" && (
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Languages className="h-5 w-5 text-secondary" /> Languages of India
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            India has 22 scheduled languages in the Eighth Schedule and 19,500+ mother tongues. The Constitution recognizes no single "national language" — Hindi and English serve as official languages of the Union.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <div key={lang.name} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow">
                <div className="flex items-start justify-between">
                  <h3 className="font-display font-bold text-foreground">{lang.name}</h3>
                  <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">{lang.speakers}</span>
                </div>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span><strong>Family:</strong> {lang.family}</span>
                  <span><strong>Script:</strong> {lang.script}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{lang.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Festivals */}
      {activeSection === "festivals" && (
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-secondary" /> Festivals
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            India celebrates over 50 major festivals annually across religions. Nearly every day of the year has a festival somewhere in the country — earning India the title of "Land of Festivals."
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {festivals.map((f) => (
              <div key={f.name} className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-shadow">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-display font-bold text-foreground">{f.name}</h3>
                    <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{f.season}</span>
                  </div>
                  <div className="flex gap-2 text-xs text-muted-foreground mb-2">
                    <span className="text-secondary font-medium">{f.type}</span>
                    <span>•</span>
                    <span>{f.region}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.detail}</p>
                  <p className="text-xs text-secondary mt-2 italic">"{f.significance}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Classical Dance */}
      {activeSection === "dances" && (
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Music className="h-5 w-5 text-secondary" /> 8 Classical Dance Forms
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            Recognized by the Sangeet Natak Akademi, these eight forms trace lineage to the Natya Shastra (200 BCE) — the world's oldest treatise on performing arts.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {dances.map((d, i) => {
              const isSelected = selectedDance === i;
              return (
                <div
                  key={d.name}
                  onClick={() => setSelectedDance(isSelected ? null : i)}
                  className={`bg-card rounded-xl shadow-card p-4 cursor-pointer transition-all ${
                    isSelected ? "ring-2 ring-secondary shadow-elevated" : "hover:shadow-elevated"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-display font-bold text-foreground">{d.name}</h3>
                    <span className="text-xs text-secondary font-medium">{d.state}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d.detail}</p>
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-border animate-fade-in-up">
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div><strong>Mudras:</strong> {d.mudras}</div>
                        <div><strong>Structure:</strong> {d.tempo}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cuisine */}
      {activeSection === "cuisine" && (
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-secondary" /> Regional Cuisine
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            Indian cuisine varies dramatically by region — from the dairy-rich curries of the north to coconut-laced southern dishes, fermented flavors of the east to the sweet-savory balance of the west.
          </p>
          <div className="space-y-4">
            {cuisines.map((c) => (
              <div key={c.region} className="bg-card rounded-xl shadow-card overflow-hidden hover:shadow-elevated transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="font-display font-bold text-foreground text-lg">{c.region}</h3>
                      <p className="text-xs text-muted-foreground">{c.states}</p>
                    </div>
                    <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">Staple: {c.staple}</span>
                  </div>
                  <div className="mt-3 grid md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-secondary font-medium mb-1">Signature Dishes</p>
                      <p className="text-sm text-muted-foreground">{c.signature}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium mb-1">Cooking Methods</p>
                      <p className="text-sm text-muted-foreground">{c.cooking}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture */}
      {activeSection === "architecture" && (
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-secondary" /> Architectural Wonders
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            India houses 42 UNESCO World Heritage Sites — from rock-cut cave temples (2nd century BCE) to Mughal masterpieces, Dravidian temple towers to colonial-era monuments.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {architectureWonders.map((a) => (
              <div key={a.name} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow">
                <div className="flex items-start justify-between">
                  <h3 className="font-display font-bold text-foreground">{a.name}</h3>
                  <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{a.period}</span>
                </div>
                <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                  <span className="text-secondary font-medium">{a.style}</span>
                  <span>•</span>
                  <span>{a.location}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Literature */}
      {activeSection === "literature" && (
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" /> Literary Heritage
          </h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-3xl">
            Indian literature spans 3,500+ years — from Vedic hymns to modern Nobel Prize-winning poetry. Sanskrit literature alone contains more texts than Greek and Latin combined.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {literature.map((l) => (
              <div key={l.name} className="bg-card rounded-xl shadow-card p-4 hover:shadow-elevated transition-shadow">
                <h3 className="font-display font-bold text-foreground">{l.name}</h3>
                <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                  <span className="text-secondary font-medium">{l.author}</span>
                  <span>•</span>
                  <span>{l.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <SourceFooter sources={["Ministry of Culture", "UNESCO", "Sangeet Natak Akademi", "Wikipedia"]} />
    </div>
  );
};

export default Culture;
