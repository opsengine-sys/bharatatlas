const sourceLinks: Record<string, string> = {
  "Wikipedia": "https://en.wikipedia.org",
  "Government of India": "https://www.india.gov.in",
  "Census of India": "https://censusindia.gov.in",
  "World Bank": "https://data.worldbank.org/country/india",
  "RBI": "https://www.rbi.org.in",
  "NHAI": "https://nhai.gov.in",
  "TRAI": "https://www.trai.gov.in",
  "AAI": "https://www.aai.aero",
  "Ministry of Commerce": "https://commerce.gov.in",
  "Ministry of Culture": "https://www.indiaculture.gov.in",
  "Ministry of Railways": "https://indianrailways.gov.in",
  "Survey of India": "https://surveyofindia.gov.in",
  "National Geographic": "https://www.nationalgeographic.com",
  "UNESCO": "https://whc.unesco.org",
  "Government of India Open Data Portal": "https://data.gov.in",
  "MoP": "https://powermin.gov.in",
};

export const SourceLink = ({ name }: { name: string }) => {
  const url = sourceLinks[name];
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline transition-colors">
        {name}
      </a>
    );
  }
  return <span>{name}</span>;
};

export const SourceChip = ({ name }: { name: string }) => {
  const url = sourceLinks[name];
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
      >
        {name} ↗
      </a>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-muted-foreground">{name}</span>
  );
};

export const SourceFooter = ({ sources }: { sources: string[] }) => (
  <p className="mt-4 text-[10px] text-muted-foreground">
    Sources:{" "}
    {sources.map((s, i) => (
      <span key={s}>
        <SourceLink name={s} />
        {i < sources.length - 1 && ", "}
      </span>
    ))}
  </p>
);

export default sourceLinks;
