import type { FollowingProfile } from "./fetch_followings_list";

export const PROFILE_CATEGORIES = [
  {
    id: "ai_ml_data",
    label: "AI / ML / Data",
    strong: [
      "\\b(ai|artificial intelligence|machine learning|ml|deep learning|llm|llms|nlp|computer vision|generative ai|genai|data science|data scientist|neural network|neural networks|transformer|transformers|alignment|rag|embedding|embeddings)\\b",
    ],
    weak: [
      "\\b(model|models|agent|agents|dataset|datasets|analytics|prediction|classification|recommendation system|recommender|automation)\\b",
    ],
  },
  {
    id: "software_engineering",
    label: "Software Engineering",
    strong: [
      "\\b(software engineer|software developer|developer|programmer|coder|backend|front end|frontend|full stack|fullstack|web developer|app developer|systems engineer|site reliability|sre|devops)\\b",
    ],
    weak: [
      "\\b(javascript|typescript|java|python|rust|golang|go developer|kotlin|react|nextjs|next js|nodejs|node js|spring boot|django|rails|linux|api|apis|database|postgres|postgresql|mysql|docker|kubernetes)\\b",
    ],
  },
  {
    id: "open_source",
    label: "Open Source",
    strong: [
      "\\b(open source|opensource|oss|foss|free software|maintainer|core maintainer|contributor|github|gitlab)\\b",
    ],
    weak: [
      "\\b(package|library|framework|tooling|cli|plugin|extension|project maintainer)\\b",
    ],
  },
  {
    id: "academia_research",
    label: "Academia / Research",
    strong: [
      "\\b(phd|phd student|doctoral|doctorate|postdoc|professor|lecturer|researcher|research scientist|academic|academia|university|lab|laboratory)\\b",
    ],
    weak: [
      "\\b(research|paper|papers|publication|publications|conference|journal|thesis|dissertation|student|master student|msc|bsc)\\b",
    ],
  },
  {
    id: "politics_policy",
    label: "Politics / Policy / Governance",
    strong: [
      "\\b(politics|political|policy|public policy|governance|government|democracy|election|elections|parliament|law|legal|regulation|regulatory|geopolitics|international relations)\\b",
    ],
    weak: [
      "\\b(state|rights|justice|campaign|civic|civil society|public affairs|diplomacy|activism|activist)\\b",
    ],
  },
  {
    id: "news_journalism_media",
    label: "News / Journalism / Media",
    strong: [
      "\\b(journalist|journalism|reporter|editor|news|newsletter|media|press|correspondent|columnist|writer at|editor at)\\b",
    ],
    weak: [
      "\\b(breaking news|coverage|analysis|commentary|publication|magazine|newspaper|podcast|radio|broadcast)\\b",
    ],
  },
  {
    id: "art_design",
    label: "Art / Illustration / Design",
    strong: [
      "\\b(artist|illustrator|illustration|designer|graphic designer|visual artist|digital artist|concept artist|character artist|animator|animation|painter|painting|sketch|sketches|comic artist|mangaka)\\b",
    ],
    weak: [
      "\\b(art|draws|drawing|commission|commissions|portfolio|visuals|creative|design|poster|logo|typography|photography|photographer)\\b",
    ],
  },
  {
    id: "writing_books_literature",
    label: "Writing / Books / Literature",
    strong: [
      "\\b(writer|author|novelist|poet|poetry|essayist|copywriter|screenwriter|books|literature|fiction|nonfiction|fantasy author|sci fi author|science fiction)\\b",
    ],
    weak: [
      "\\b(reading|reader|bookworm|novel|novels|stories|storytelling|essays|blog|blogger|newsletter)\\b",
    ],
  },
  {
    id: "startups_product",
    label: "Startups / Indie Hacking / Product",
    strong: [
      "\\b(startup|startups|founder|cofounder|co founder|indie hacker|indie hacking|bootstrapped|builder|building in public|entrepreneur|solopreneur|saas|product manager|product management)\\b",
    ],
    weak: [
      "\\b(product|growth|maker|launch|mvp|side project|side projects|business|marketing|sales|customer|users)\\b",
    ],
  },
  {
    id: "ux_product_design",
    label: "UX / Product Design",
    strong: [
      "\\b(ux|ui|user experience|user interface|product design|product designer|web design|design systems|interaction design|frontend design)\\b",
    ],
    weak: [
      "\\b(figma|prototype|wireframe|accessibility|a11y|usability|interface|interfaces|designing apps)\\b",
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity / InfoSec",
    strong: [
      "\\b(cybersecurity|cyber security|infosec|information security|security researcher|appsec|opsec|threat intelligence|malware|reverse engineering|pentest|penetration testing|red team|blue team)\\b",
    ],
    weak: [
      "\\b(security|vulnerability|vulnerabilities|exploit|exploits|hacking|hacker|ctf|privacy|encryption|cryptography)\\b",
    ],
  },
  {
    id: "science_technology",
    label: "Science / Technology",
    strong: [
      "\\b(science|scientist|physics|physicist|biology|biologist|chemistry|chemist|mathematics|mathematician|neuroscience|astronomy|space|engineering|robotics)\\b",
    ],
    weak: [
      "\\b(tech|technology|innovation|experiment|experiments|lab|stem|research)\\b",
    ],
  },
  {
    id: "climate_environment",
    label: "Climate / Environment",
    strong: [
      "\\b(climate|climate change|environment|environmental|sustainability|sustainable|ecology|ecologist|biodiversity|conservation|renewable energy|carbon|decarbonization)\\b",
    ],
    weak: [
      "\\b(nature|wildlife|green|planet|earth|energy transition|solar|wind energy|pollution|ecosystem|ecosystems)\\b",
    ],
  },
  {
    id: "gaming",
    label: "Gaming",
    strong: [
      "\\b(gamer|gaming|game dev|gamedev|game developer|video games|videogames|esports|streamer|twitch|speedrunner|rpg|jrpg|mmorpg)\\b",
    ],
    weak: [
      "\\b(playstation|xbox|nintendo|steam|zelda|pokemon|minecraft|final fantasy|dnd|dungeons and dragons)\\b",
    ],
  },
  {
    id: "anime_manga_japanese_media",
    label: "Anime / Manga / Japanese Media",
    strong: [
      "\\b(anime|manga|light novel|light novels|visual novel|visual novels|japanese media|otaku|vtuber|v tuber|hololive|nijisanji)\\b",
    ],
    weak: [
      "\\b(japan|japanese|jrpg|cosplay|cosplayer|web novel|webnovel|manhwa|donghua)\\b",
    ],
  },
  {
    id: "germany_europe",
    label: "Germany / Europe",
    strong: [
      "\\b(germany|german|deutschland|deutsch|berlin|munich|münchen|hamburg|cologne|köln|paderborn|nrw|europe|european union|eu)\\b",
    ],
    weak: [
      "\\b(bundestag|bundesliga|deutsche|deutscher|deutsches|europa|european|vienna|wien|zurich|zürich|amsterdam|brussels|brüssel)\\b",
    ],
  },
  {
    id: "education_learning",
    label: "Education / Learning",
    strong: [
      "\\b(teacher|educator|education|learning|teaching|tutor|trainer|instructor|course creator|language learner|language learning)\\b",
    ],
    weak: [
      "\\b(student|school|university|study|studying|learn|learning|course|courses|notes|anki|flashcards)\\b",
    ],
  },
  {
    id: "health_medicine_psychology",
    label: "Health / Medicine / Psychology",
    strong: [
      "\\b(doctor|physician|nurse|medicine|medical|healthcare|public health|therapist|psychologist|psychiatrist|psychology|mental health|neuroscience)\\b",
    ],
    weak: [
      "\\b(health|wellbeing|wellness|therapy|clinic|hospital|patient|patients|adhd|autism|neurodivergent)\\b",
    ],
  },
  {
    id: "crypto_web3",
    label: "Crypto / Web3",
    strong: [
      "\\b(crypto|cryptocurrency|bitcoin|btc|ethereum|eth|web3|blockchain|defi|nft|dao|smart contract|solana)\\b",
    ],
    weak: [
      "\\b(token|tokens|wallet|onchain|on chain|decentralized|zk|zero knowledge)\\b",
    ],
  },
  {
    id: "bots_automation_feeds",
    label: "Bots / Automation / Feeds",
    strong: [
      "\\b(bot|automated|automation|feed bot|mirror bot|rss|crosspost|crossposter|archive bot|updates bot)\\b",
    ],
    weak: [
      "\\b(feed|updates|posts every|auto post|autopost|aggregator|daily updates)\\b",
    ],
  },
  {
    id: "organizations_projects_communities",
    label: "Organizations / Projects / Communities",
    strong: [
      "\\b(organization|organisation|official account|project|community|collective|foundation|institute|lab|nonprofit|non profit|ngo|association|society)\\b",
    ],
    weak: [
      "\\b(team|group|network|club|initiative|platform|workspace|community account)\\b",
    ],
  },
  {
    id: "personal_social_lifestyle",
    label: "Personal / Social / Lifestyle",
    strong: [
      "\\b(personal account|personal blog|dad|mom|parent|husband|wife|coffee|cats|dogs|food|travel|music|movies|life|diary)\\b",
    ],
    weak: [
      "\\b(random thoughts|posting about|mostly here for|just vibes|vibes|personal|social|friends|family|hobby|hobbies)\\b",
    ],
  },
] as const;

export const UNCATEGORIZED_CATEGORY = {
  id: "uncategorized",
  label: "Uncategorized",
} as const;

const STRONG_MATCH_SCORE = 3;
const WEAK_MATCH_SCORE = 1;
const CATEGORY_THRESHOLD = 3;

export type ProfileCategoryId =
  | (typeof PROFILE_CATEGORIES)[number]["id"]
  | typeof UNCATEGORIZED_CATEGORY.id;

export type ProfileCategoryStat = {
  id: ProfileCategoryId;
  label: string;
  count: number;
};

export type CategorizedFollowingProfile = FollowingProfile & {
  categoryIds: ProfileCategoryId[];
};

export const ALL_PROFILE_CATEGORY_STATS: ProfileCategoryStat[] = [
  ...PROFILE_CATEGORIES.map((category) => ({
    id: category.id,
    label: category.label,
    count: 0,
  })),
  {
    id: UNCATEGORIZED_CATEGORY.id,
    label: UNCATEGORIZED_CATEGORY.label,
    count: 0,
  },
];

function countMatches(description: string, pattern: string) {
  return [...description.matchAll(new RegExp(pattern, "gi"))].length;
}

export function categorizeFollowing(
  profile: FollowingProfile,
): CategorizedFollowingProfile {
  const description = profile.description.toLowerCase();
  const categoryIds: ProfileCategoryId[] = PROFILE_CATEGORIES.flatMap((category) => {
    const strongScore = category.strong.some((pattern) =>
      new RegExp(pattern, "i").test(description),
    )
      ? STRONG_MATCH_SCORE
      : 0;
    const weakScore =
      category.weak.reduce(
        (total, pattern) => total + countMatches(description, pattern),
        0,
      ) * WEAK_MATCH_SCORE;

    return strongScore + weakScore >= CATEGORY_THRESHOLD ? [category.id] : [];
  });

  return {
    ...profile,
    categoryIds:
      categoryIds.length > 0 ? categoryIds : [UNCATEGORIZED_CATEGORY.id],
  };
}

export function categorizeFollowings(profiles: FollowingProfile[]) {
  const categorizedFollows = profiles.map(categorizeFollowing);
  const categoryStatsDelta = ALL_PROFILE_CATEGORY_STATS.map((category) => ({
    ...category,
    count: categorizedFollows.filter((profile) =>
      profile.categoryIds.includes(category.id),
    ).length,
  }));

  return {
    categorizedFollows,
    categoryStatsDelta,
  };
}
