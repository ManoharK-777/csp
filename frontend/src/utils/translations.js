// Localized Telugu Translation Dictionary and Dynamic Translator Helper

const schemeNamesTe = {
  "thalliki vandanam": "తల్లీకి వందనం",
  "ntr bharosa pension scheme": "ఎన్టీఆర్ భరోసా పింఛను పథకం",
  "ntr aarogyaseva": "ఎన్టీఆర్ ఆరోగ్యసేవ",
  "ntr cheyutha": "ఎన్టీఆర్ చేయూత",
  "ntr kapu nestham": "ఎన్టీఆర్ కాపు నేస్తం",
  "annadatha sukhibhava": "అన్నదాత సుఖీభవ",
  "ntr vidya deevena": "ఎన్టీఆర్ విద్యా దీవెన",
  "ntr vasathi deevena": "ఎన్టీఆర్ వసతి దీవెన",
  "ntr asara": "ఎన్టీఆర్ ఆసరా",
  "ntr vahana mitra": "ఎన్టీఆర్ వాహన మిత్ర",
  "ntr thodu": "ఎన్టీఆర్ తోడు",
  "ntr matsyakara bharosa": "ఎన్టీఆర్ మత్స్యకార భరోసా",
  "ntr netanna nestham": "ఎన్టీఆర్ నేతన్న నేస్తం",
  "aadabidda nidhi": "ఆడబిడ్డ నిధి",
  "deepam scheme": "దీపం పథకం",

  "pm kisan samman nidhi": "పీఎం కిసాన్ సమ్మాన్ నిధి",
  "ayushman bharat pradhan mantri jan arogya yojana (pm-jay)": "ఆయుష్మాన్ భారత్ ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన (PM-JAY)",
  "atal pension yojana (apy)": "అటల్ పెన్షన్ యోజన (APY)",
  "pm garib kalyan anna yojana": "పీఎం గరీబ్ కల్యాణ్ అన్న యోజన",
  "pradhan mantri awas yojana (pmay)": "ప్రధాన మంత్రి ఆవాస్ యోజన (PMAY)",
  "pradhan mantri mudra yojana": "ప్రధాన మంత్రి ముద్రా యోజన",
  "sukanya samriddhi yojana (ssy)": "సుకన్య సమృద్ధి యోజన (SSY)",
  "e-shram card": "ఈ-శ్రమ్ కార్డ్",
  "pradhan mantri vishwakarma scheme": "ప్రధాన మంత్రి విశ్వకర్మ పథకం",
  "pradhan mantri svanidhi": "ప్రధాన మంత్రి స్వనిధి",
  "pradhan mantri jeevan jyoti bima yojana (pmjjby)": "ప్రధాన మంత్రి జీవన్ జ్యోతి బీమా యోజన (PMJJBY)",
  "pradhan mantri suraksha bima yojana (pmsby)": "ప్రధాన మంత్రి సురక్షా బీమా యోజన (PMSBY)",
  "startup india seed fund": "స్టార్టప్ ఇండియా సీడ్ ఫండ్",
  "pm kisan maandhan yojana": "పీఎం కిసాన్ మాన్‌ధన్ యోజన",
  "pm ujjwala yojana": "పీఎం ఉజ్వల యోజన",
  "stand-up india scheme": "స్టాండ్-అప్ ఇండియా పథకం",
  "national social assistance program (nsap)": "జాతీయ సామాజిక సహాయ కార్యక్రమం (NSAP)"
};

const schemeDescsTe = {
  "thalliki vandanam": "పాఠశాలకు వెళ్లే పిల్లల తల్లులకు ఏటా ₹15,000 ఆర్థిక సహాయం అందించే పథకం.",
  "ntr bharosa pension scheme": "వృద్ధులు, వికలాంగులు మరియు ఒంటరి మహిళలకు సామాజిక భద్రత కల్పించడానికి నెలవారీ పెన్షన్ సహాయం.",
  "ntr aarogyaseva": "పేద కుటుంబాలకు ఉచితంగా రూ. 25 లక్షల వరకు నగదు రహిత ద్వితీయ మరియు తృతీయ వైద్య చికిత్స అందించే ఆరోగ్య బీమా పథకం.",
  "ntr cheyutha": "మహిళల జీవనోపాధి మెరుగుపరచడానికి మరియు వారి ఆర్థిక స్వవలంబనకు ఆర్థిక సహాయం అందించే పథకం.",
  "ntr kapu nestham": "కాపు, బలిజ, ఒంటరి సామాజిక వర్గాలకు చెందిన మహిళలకు ఆర్థిక స్వవలంబన కొరకు సహాయం.",
  "annadatha sukhibhava": "రైతు కుటుంబాలకు సాగు పెట్టుబడి సహాయం అందించే కేంద్ర-రాష్ట్ర సంయుక్త పథకం.",
  "ntr vidya deevena": "ఉన్నత చదువులు చదివే పేద విద్యార్థులకు పూర్తి ఫీజు రీయింబర్స్మెంట్ అందించే పథకం.",
  "ntr vasathi deevena": "ఉన్నత విద్య అభ్యసించే విద్యార్థుల వసతి మరియు భోజన ఖర్చుల కొరకు ఆర్థిక సహాయం.",
  "ntr asara": "డ్వాక్రా మహిళల స్వయం సహాయక సంఘాల పాత రుణాల ఉపశమన సహాయ పథకం.",
  "ntr vahana mitra": "స్వంత ఆటో, టాక్సీ కలిగిన డ్రైవర్లకు వార్షిక భీమా మరియు నిర్వహణ సహాయ పథకం.",
  "ntr thodu": "చిరు వ్యాపారులు, వీధి వ్యాపారులకు వడ్డీ లేని లఘు రుణాలు అందించే పథకం.",
  "ntr matsyakara bharosa": "చేపల వేట నిషేధ కాలంలో మత్స్యకారుల కుటుంబాలకు ఆర్థిక సహాయం మరియు సబ్సిడీ డీజిల్.",
  "ntr netanna nestham": "సంత మగ్గం కలిగిన చేనేత కార్మికులకు ఆధునికీకరణ మరియు జీవనోపాధి సహాయం.",
  "aadabidda nidhi": "రాష్ట్రంలోని అర్హులైన మహిళలకు ప్రతినెలా ఆర్థిక జీవన సహాయం అందించే విప్లవాత్మక పథకం.",
  "deepam scheme": "పేద మహిళలకు ఉచిత వంటగ్యాస్ కనెక్షన్ మరియు ఉచిత సిలిండర్లు అందించే మహిళా సంక్షేమ పథకం.",

  "pm kisan samman nidhi": "దేశంలోని భూమి కలిగిన రైతు కుటుంబాలకు పెట్టుబడి మద్దతుగా ఏటా ₹6,000 సహాయం.",
  "ayushman bharat pradhan mantri jan arogya yojana (pm-jay)": "పేద కుటుంబాలకు సంవత్సరానికి రూ. 5 లక్షల ఉచిత ద్వితీయ మరియు తృతీయ వైద్య బీమా సేవలు.",
  "atal pension yojana (apy)": "అసంఘటిత రంగ కార్మికులు తమ వృద్ధాప్య భద్రత కోసం పొదుపు చేసుకునేలా నెలవారీ పింఛను హామీ పథకం.",
  "pm garib kalyan anna yojana": "పేదలకు ఉచితంగా ఆహార ధాన్యాలు పంపిణీ చేసే జాతీయ ఆహార భద్రతా పథకం.",
  "pradhan mantri awas yojana (pmay)": "నిరుపేదలు మరియు అల్పఆదాయ వర్గాలకు గృహ నిర్మాణ రాయితీ సహాయం అందించే కేంద్ర పథకం.",
  "pradhan mantri mudra yojana": "చిన్న మరియు సూక్ష్మ వ్యాపారాల స్థాపన, విస్తరణ కోసం రూ. 10 లక్షల వరకు సులభమైన బ్యాంక్ రుణాలు.",
  "sukanya samriddhi yojana (ssy)": "బాలికల భవిష్యత్తు చదువు మరియు వివాహ ఖర్చుల కొరకు కేంద్ర ప్రభుత్వం ప్రవేశపెట్టిన అధిక వడ్డీ పొదుపు పథకం.",
  "e-shram card": "అసంఘటిత రంగ కార్మికుల జాతీయ డేటాబేస్ రిజిస్ట్రేషన్ మరియు ప్రమాద బీమా సౌకర్యం.",
  "pradhan mantri vishwakarma scheme": "చేతివృత్తుల వారు మరియు కులవృత్తుల వారికి నైపుణ్య శిక్షణ మరియు తక్కువ వడ్డీ రుణాలు అందించే పథకం.",
  "pradhan mantri svanidhi": "వీధి వ్యాపారులకు వర్కింగ్ క్యాపిటల్ రుణాలు మరియు డిజిటల్ లావాదేవీలపై క్యాష్‌బ్యాక్ అందించే పథకం.",
  "pradhan mantri jeevan jyoti bima yojana (pmjjby)": "రూ. 330 వార్షిక ప్రీమియంతో రూ. 2 లక్షల జీవిత బీమా రక్షణ కల్పించే కేంద్ర పథకం.",
  "pradhan mantri suraksha bima yojana (pmsby)": "రూ. 12 వార్షిక ప్రీమియంతో రూ. 2 లక్షల వ్యక్తిగత ప్రమాద బీమా రక్షణ పథకం.",
  "startup india seed fund": "స్టార్టప్ వ్యవస్థాపకులకు నమూనా తయారీ, మార్కెట్ ప్రవేశం కొరకు ఆర్థిక సాయం.",
  "pm kisan maandhan yojana": "చిన్న మరియు సన్నకారు రైతులకు 60 ఏళ్ల తర్వాత నెలకు ₹3,000 పెన్షన్ భద్రత కల్పించే పథకం.",
  "pm ujjwala yojana": "దారిద్య్ర రేఖకు దిగువన ఉన్న కుటుంబాల మహిళలకు ఉచిత ఎల్‌పీజీ గ్యాస్ కనెక్షన్ సేవ.",
  "stand-up india scheme": "మహిళలు మరియు ఎస్సీ/ఎస్టీ సామాజిక వర్గాలకు గ్రీన్-ఫీల్డ్ ప్రాజెక్టుల స్థాపనకు బ్యాంక్ రుణాలు.",
  "national social assistance program (nsap)": "వృద్ధాప్య, వితంతు మరియు వికలాంగ నిరుపేద కుటుంబాలకు కేంద్ర సామాజిక భద్రతా పింఛన్ల పంపిణీ."
};

const serviceNamesTe = {
  "ap epdcl online electricity bill payment": "ఏపీ ఈపీడీసీఎల్ ఆన్‌లైన్ విద్యుత్ బిల్లు చెల్లింపు",
  "ap mee bhoomi - land records (adangal & 1b)": "ఏపీ మీభూమి - భూ రికార్డులు (అడంగల్ & 1బి)",
  "ap mee bhoomi land mutation application": "ఏపీ మీభూమి భూమి మార్పిడి (మ్యుటేషన్) దరఖాస్తు",
  "ap meeseva agriculture farmer registration": "ఏపీ మీసేవ వ్యవసాయ రైతు నమోదు",
  "ap meeseva integrated caste certificate application": "ఏపీ మీసేవ సమగ్ర కుల ధృవీకరణ పత్రం దరఖాస్తు",
  "ap meeseva income certificate application": "ఏపీ మీసేవ ఆదాయ ధృవీకరణ పత్రం దరఖాస్తు",
  "ap meeseva birth certificate registration": "ఏపీ మీసేవ జనన ధృవీకరణ పత్రం నమోదు",
  "ap meeseva death certificate registration": "ఏపీ మీసేవ మరణ ధృవీకరణ పత్రం నమోదు",
  "ap meeseva non-creamy layer certificate": "ఏపీ మీసేవ నాన్-క్రీమీ లేయర్ ధృవీకరణ పత్రం",
  "ap meeseva residence certificate": "ఏపీ మీసేవ నివాస ధృవీకరణ పత్రం",
  "national career service portal registration": "జాతీయ కెరీర్ సర్వీస్ పోర్టల్ నమోదు",
  "national passport seva online application": "జాతీయ పాస్‌పోర్ట్ సేవా ఆన్‌లైన్ దరఖాస్తు",
  "uidai aadhaar card download/update": "యూఐడీఏఐ ఆధార్ కార్డ్ డౌన్‌లోడ్/నవీకరణ",
  "national voter portal services (nvsp)": "జాతీయ ఓటరు పోర్టల్ సేవలు (NVSP)",
  "national pan card application portal": "జాతీయ పాన్ కార్డ్ దరఖాస్తు పోర్టల్"
};

const serviceDescsTe = {
  "ap epdcl online electricity bill payment": "వినియోగదారులు వారి ఇంటి నుండే ఆన్‌లైన్ ద్వారా త్వరితంగా విద్యుత్ బిల్లును చెల్లించే సేవ.",
  "ap mee bhoomi - land records (adangal & 1b)": "మీ భూముల యొక్క రికార్డులు, అడంగల్, 1బి కాపీలను ఆన్‌లైన్‌లో ఉచితంగా చూసుకునే సేవ.",
  "ap mee bhoomi land mutation application": "భూమి కొనుగోలు, అమ్మకం లేదా విభజన తర్వాత రికార్డులలో పేరు మార్పిడి కొరకు దరఖాస్తు.",
  "ap meeseva agriculture farmer registration": "ప్రభుత్వ రాయితీలు, విత్తనాలు పొందడానికి రైతులు మీసేవ ద్వారా నమోదు చేసుకునే విధానం.",
  "ap meeseva integrated caste certificate application": "ఉద్యోగ, విద్యా ప్రయోజనాల కొరకు అధికారిక కుల ధృవీకరణ పత్రాన్ని పొందే సేవ.",
  "ap meeseva income certificate application": "సంవత్సర కుటుంబ ఆదాయాన్ని ధృవీకరిస్తూ ప్రభుత్వ పథకాలు, స్కాలర్‌షిప్‌ల కొరకు పొందే పత్రం.",
  "ap meeseva birth certificate registration": "శిశువు జన్మించిన తర్వాత అధికారిక జనన ధృవీకరణ పత్రాన్ని పొందే ప్రక్రియ.",
  "ap meeseva death certificate registration": "వ్యక్తి మరణాన్ని ధృవీకరిస్తూ మరణ ధృవీకరణ పత్రం పొందే సేవ.",
  "ap meeseva non-creamy layer certificate": "బీసీ అభ్యర్థులు ఓబీసీ రిజర్వేషన్ల కొరకు పొందే నిరూపణ పత్రం.",
  "ap meeseva residence certificate": "ఆంధ్రప్రదేశ్‌లో నివాసం ఉంటున్నట్లు ధృవీకరించే నివాస పత్రం.",
  "national career service portal registration": "ఉద్యోగార్థులు దేశవ్యాప్తంగా ఉద్యోగ అవకాశాలు వెతుక్కోవడానికి మరియు కెరీర్ కౌన్సెలింగ్ పొందే వేదిక.",
  "national passport seva online application": "కొత్త పాస్‌పోర్ట్ కొరకు లేదా పునరుద్ధరణ కొరకు కేంద్ర ప్రభుత్వ అధికారిక పోర్టల్ ద్వారా దరఖాస్తు.",
  "uidai aadhaar card download/update": "ఆధార్ కార్డు డౌన్‌లోడ్ చేసుకోవడం, బయోమెట్రిక్ లేదా చిరునామా వివరాలను సరిచేసుకునే ఆన్‌లైన్ సేవ.",
  "national voter portal services (nvsp)": "కొత్త ఓటర్ నమోదు, ఓటర్ కార్డ్ సవరణలు మరియు డౌన్‌లోడ్ సేవలు.",
  "national pan card application portal": "ఆదాయపు పన్ను రిటర్నులు సమర్పించడానికి అవసరమైన పాన్ కార్డ్ కొరకు ఆన్‌లైన్ దరఖాస్తు."
};

const categoryTe = {
  "all categories": "అన్ని విభాగాలు",
  "health": "ఆరోగ్య రంగం",
  "agriculture": "వ్యవసాయ రంగం",
  "education": "విద్యా రంగం",
  "social welfare": "సామాజిక సంక్షేమం",
  "housing": "గృహ నిర్మాణం",
  "finance": "ఆర్థిక రంగం",
  "rural development": "గ్రామీణ అభివృద్ధి",
  "skills & labor": "నైపుణ్యాలు & కార్మికులు",
  "business & startups": "వ్యాపారాలు & స్టార్టప్‌లు",
  "women & children": "మహిళా & శిశు సంక్షేమం",
  "utilities": "సౌకర్యాలు"
};

const departmentTe = {
  "health, medical & family welfare department": "ఆరోగ్య, వైద్య మరియు కుటుంబ సంక్షేమ శాఖ",
  "revenue department": "రెవెన్యూ శాఖ",
  "agriculture & cooperation department": "వ్యవసాయ మరియు సహకార శాఖ",
  "school education department": "పాఠశాల విద్యా శాఖ",
  "social welfare department": "సామాజిక సంక్షేమ శాఖ",
  "finance department": "ఆర్థిక శాఖ",
  "panchayat raj & rural development department": "పంచాయతీ రాజ్ & గ్రామీణాభివృద్ధి శాఖ",
  "municipal administration & urban development department": "పురపాలక పరిపాలన & పట్టణాభివృద్ధి శాఖ",
  "women, children, disabled & senior citizens department": "మహిళా, శిశు, వికలాంగులు & వృద్ధుల సంక్షేమ శాఖ",
  "consumer affairs, food & civil supplies department": "వినియోగదారుల వ్యవహారాలు, ఆహార & పౌర సరఫరాల శాఖ"
};

// Helper function to dynamically translate text patterns for generated content
export function translateText(text, lang) {
  if (lang !== 'TE' || !text) return text;

  let translated = text;

  // Replace names/labels
  const lowerText = text.toLowerCase().trim();
  if (schemeNamesTe[lowerText]) return schemeNamesTe[lowerText];
  if (serviceNamesTe[lowerText]) return serviceNamesTe[lowerText];
  if (schemeDescsTe[lowerText]) return schemeDescsTe[lowerText];
  if (serviceDescsTe[lowerText]) return serviceDescsTe[lowerText];
  if (categoryTe[lowerText]) return categoryTe[lowerText];
  if (departmentTe[lowerText]) return departmentTe[lowerText];

  // Pattern translations for programmatically generated titles
  if (/^bhartiya\s/i.test(text)) {
    translated = translated.replace(/^bhartiya\s/i, "భారతీయ ");
  }
  if (/^central\s/i.test(text)) {
    translated = translated.replace(/^central\s/i, "కేంద్ర ");
  }
  if (/^digital\s/i.test(text)) {
    translated = translated.replace(/^digital\s/i, "డిజిటల్ ");
  }

  // Common keywords replacement
  translated = translated
    .replace(/Scheme/g, "పథకం")
    .replace(/Yojana/g, "యోజన")
    .replace(/Program/g, "కార్యక్రమం")
    .replace(/Grant/g, "గ్రాంట్")
    .replace(/Scholarship/g, "స్కాలర్‌షిప్")
    .replace(/Pension/g, "పెన్షన్")
    .replace(/Assistance/g, "సహాయం")
    .replace(/Subvention/g, "సబ్సిడీ")
    .replace(/Mission/g, "మిషన్")
    .replace(/Initiative/g, "చొరవ")
    .replace(/Support/g, "మద్దతు");

  // If description pattern matches, translate description dynamically
  if (translated === text) {
    if (lowerText.includes("scholarship")) {
      return "అర్హులైన విద్యార్థులకు విద్యా సహాయాన్ని అందించే జాతీయ/రాష్ట్ర పథకం.";
    }
    if (lowerText.includes("livestock") || lowerText.includes("cattle")) {
      return "పశుపోషణ, డైరీ రంగాలు మరియు జంతువుల ఉత్పాదకత పెంపుదల కొరకు మద్దతు పథకం.";
    }
    if (lowerText.includes("organic") || lowerText.includes("farming") || lowerText.includes("agriculture")) {
      return "రైతులకు సాగు సాయం మరియు సేంద్రీయ వ్యవసాయ పద్ధతుల వ్యాప్తి కొరకు సహాయ పథకం.";
    }
    if (lowerText.includes("green") || lowerText.includes("solar") || lowerText.includes("energy")) {
      return "పునరుత్పాదక ఇంధనం, సోలార్ ప్యానెల్ కనెక్షన్లు మరియు హరిత వనరుల ప్రోత్సాహక కార్యక్రమం.";
    }
    if (lowerText.includes("housing") || lowerText.includes("house site") || lowerText.includes("rural home")) {
      return "పేద కుటుంబాలకు పక్కా ఇళ్ల నిర్మాణం లేదా ఇంటి స్థలాల కేటాయింపు మద్దతు.";
    }
    if (lowerText.includes("widow") || lowerText.includes("disabled") || lowerText.includes("senior")) {
      return "సామాజిక భద్రతా పింఛన్ల కింద నిరుపేదలకు నెలవారీ ఆర్థిక పెన్షన్ అందించే పధకం.";
    }
    if (lowerText.includes("skill") || lowerText.includes("job") || lowerText.includes("training")) {
      return "యువతకు ఉచిత ఉపాధి శిక్షణ, నైపుణ్యాల పెంపుదల మరియు సర్టిఫికేట్ అందించే మిషన్.";
    }
  }

  return translated;
}

// Translate full scheme objects
export function translateScheme(scheme, lang) {
  if (!scheme) return scheme;
  if (lang !== 'TE') return scheme;

  const keyName = scheme.name.toLowerCase();

  return {
    ...scheme,
    name: schemeNamesTe[keyName] || translateText(scheme.name, lang),
    description: schemeDescsTe[keyName] || translateText(scheme.description, lang),
    category_name: categoryTe[scheme.category_name.toLowerCase()] || scheme.category_name,
    department_name: departmentTe[scheme.department_name.toLowerCase()] || scheme.department_name,
    benefits: translateBenefits(scheme.benefits, keyName, lang),
    eligibility_criteria: translateEligibility(scheme.eligibility_criteria, keyName, lang),
    required_documents: translateDocs(scheme.required_documents, lang),
    application_process: translateProcess(scheme.application_process, keyName, lang)
  };
}

// Translate full service objects
export function translateService(srv, lang) {
  if (!srv) return srv;
  if (lang !== 'TE') return srv;

  const keyName = srv.name.toLowerCase();

  return {
    ...srv,
    name: serviceNamesTe[keyName] || translateText(srv.name, lang),
    description: serviceDescsTe[keyName] || translateText(srv.description, lang),
    category_name: categoryTe[srv.category_name?.toLowerCase()] || srv.category_name,
    department_name: departmentTe[srv.department_name?.toLowerCase()] || srv.department_name,
    required_documents: translateDocs(srv.required_documents, lang)
  };
}

// Child translate functions
function translateBenefits(text, key, lang) {
  if (schemeDescsTe[key]) {
    // Return standard translated benefits
    if (key.includes("thalliki")) return "తల్లులకు సంవత్సరానికి ₹15,000 ఆర్థిక సహాయం పాఠశాల ఫీజుల కొరకు.";
    if (key.includes("pension")) return "రూ. 4,000 (వికలాంగులకు రూ. 6,000) నెలవారీ పెన్షన్ సహాయం.";
    if (key.includes("aarogyaseva")) return "ఎంపిక చేసిన సూపర్ స్పెషాలిటీ ఆసుపత్రులలో ఉచిత నగదు రహిత చికిత్స (రూ. 25 లక్షల వరకు).";
    if (key.includes("kisan")) return "సంవత్సరానికి ₹6,000 పెట్టుబడి సహాయం (రూ. 2,000 చొప్పున మూడు విడతలలో).";
    if (key.includes("sukanya")) return "ఆకర్షణీయమైన వడ్డీ రేటు, పన్ను మినహాయింపు మరియు మెచ్యూరిటీ సహాయం.";
    if (key.includes("e-shram")) return "రూ. 2 లక్షల ఉచిత ప్రమాద మరణ బీమా రక్షణ మరియు సామాజిక భద్రత.";
    if (key.includes("mudra")) return "వ్యాపార అభివృద్ధికి రూ. 10 లక్షల వరకు ఎటువంటి గ్యారెంటీ లేని బ్యాంక్ లోన్లు.";
  }
  return text;
}

function translateEligibility(text, key, lang) {
  if (schemeDescsTe[key]) {
    if (key.includes("thalliki")) return "ఆంధ్రప్రదేశ్ నివాసి అయి ఉండి, తెల్ల రేషన్ కార్డు కలిగి ఉండాలి. పిల్లలు 1 నుండి 12 తరగతి చదువుతుండాలి.";
    if (key.includes("pension")) return "వృద్ధాప్య పెన్షన్ కు 60+ ఏళ్ళు ఉండాలి. వికలాంగులు అయితే సదరం (SADAREM) ధృవీకరణ పత్రం కలిగి ఉండాలి.";
    if (key.includes("aarogyaseva")) return "ఆంధ్రప్రదేశ్ లో నివసించే నిరుపేద కుటుంబాలు, తెల్ల రేషన్/ఆరోగ్య కార్డు దారులు.";
    if (key.includes("kisan")) return "సొంత సాగుభూమి కలిగి ఉన్న దేశంలోని సన్నకారు, చిన్నకారు రైతు కుటుంబాలు.";
    if (key.includes("sukanya")) return "10 సంవత్సరాలలోపు వయస్సు ఉన్న బాలికలు. కేవలం ఒక బాలిక పేరిట ఒక ఖాతా మాత్రమే.";
    if (key.includes("e-shram")) return "16 నుండి 59 సంవత్సరాల మధ్య వయస్సు కలిగి ఉండి, ఆదాయపు పన్ను పరిధిలోకి రాని అసంఘటిత రంగ కార్మికులు.";
  }
  return text;
}

function translateDocs(docs, lang) {
  if (!docs || lang !== 'TE') return docs;
  return docs
    .replace(/Aadhaar Card/gi, "ఆధార్ కార్డ్")
    .replace(/Aadhar/gi, "ఆధార్")
    .replace(/Ration Card/gi, "రేషన్ కార్డ్")
    .replace(/Bank Passbook/gi, "బ్యాంక్ పాస్‌బుక్")
    .replace(/Bank Account/gi, "బ్యాంక్ ఖాతా")
    .replace(/Income Certificate/gi, "ఆదాయ ధృవీకరణ పత్రం")
    .replace(/Caste Certificate/gi, "కుల ధృవీకరణ పత్రం")
    .replace(/Land Documents/gi, "భూమి పత్రాలు")
    .replace(/Passport size photos/gi, "పాస్‌పోర్ట్ సైజు ఫోటోలు")
    .replace(/Mobile Number/gi, "మొబైల్ సంఖ్య")
    .replace(/Disability Certificate/gi, "వికలాంగ ధృవీకరణ పత్రం")
    .replace(/Electricity Bill/gi, "కరెంట్ బిల్లు");
}

function translateProcess(process, key, lang) {
  if (schemeDescsTe[key]) {
    if (key.includes("thalliki")) return "వార్డు/గ్రామ సచివాలయంలో పత్రాలు సమర్పించండి లేదా పాఠశాల ప్రధానోపాధ్యాయుల ద్వారా నమోదు చేయండి.";
    if (key.includes("pension")) return "గ్రామ సచివాలయంలోని వెల్ఫేర్ అసిస్టెంట్ ద్వారా లేదా ఆన్‌లైన్ లో సేవా పోర్టల్ ద్వారా దరఖాస్తు చేసుకోవాలి.";
    if (key.includes("aarogyaseva")) return "నెట్‌వర్క్ ఆసుపత్రులలోని ఆరోగ్య మిత్ర సహాయ కేంద్రం వద్ద నేరుగా ఉచితంగా చేరవచ్చు.";
    if (key.includes("kisan")) return "పీఎం కిసాన్ పోర్టల్ ద్వారా ఆన్‌లైన్ లో స్వీయ నమోదు లేదా సమీప మీసేవా కేంద్రంలో దరఖాస్తు.";
  }
  return process;
}
