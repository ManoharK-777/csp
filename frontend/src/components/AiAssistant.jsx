import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, ArrowRight, Mic } from 'lucide-react';

export default function AiAssistant({
  bilingual,
  schemes,
  services,
  categories,
  departments,
  setSelectedScheme,
  setPage,
  startListening // Passed globally from App.jsx
}) {
  const [query, setQuery] = useState('');
  const [typing, setTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const isTelugu = bilingual === 'TE';

  // Pre-configured questions
  const samplePrompts = [
    {
      label: isTelugu ? 'తల్లీకి వందనం పథకం అర్హతలు ఏమిటి?' : 'What are the eligibility rules for Thalliki Vandanam?',
      query: isTelugu ? 'తల్లీకి వందనం' : 'Thalliki Vandanam'
    },
    {
      label: isTelugu ? 'పీఎం కిసాన్ కింద ఎంత సహాయం లభిస్తుంది?' : 'How much financial aid does PM Kisan provide?',
      query: isTelugu ? 'పిఎం కిసాన్' : 'PM Kisan'
    },
    {
      label: isTelugu ? 'జనన ధృవీకరణ పత్రం ఎలా దరఖాస్తు చేయాలి?' : 'How to apply for Birth Certificate?',
      query: isTelugu ? 'జనన ధృవీకరణ పత్రం' : 'Birth Certificate'
    },
    {
      label: isTelugu ? 'ఎన్టీఆర్ ఆరోగ్యసేవ కార్డుకి కావలసిన పత్రాలు ఏమిటి?' : 'What documents are required for NTR Aarogyaseva?',
      query: isTelugu ? 'ఆరోగ్యసేవ' : 'NTR Aarogyaseva'
    }
  ];

  // Initialize with greeting
  useEffect(() => {
    setChatMessages([
      {
        sender: 'ai',
        text: isTelugu
          ? 'నమస్కారం! నేను మీ డిజిటల్ ప్రభుత్వ సహాయకుడిని. సంక్షేమ పథకాలు, పౌర సేవలు, గ్రీవెన్స్ లేదా అవసరమైన పత్రాల గురించి నన్ను ఏదైనా అడగండి.'
          : 'Hello! I am your AI e-Governance Digital Assistant. Feel free to ask me any question about central schemes, AP welfare programs, MeeSeva certificates, or filing grievances.'
      }
    ]);
  }, [bilingual]);

  // Scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages, typing]);

  const handleMicClick = () => {
    if (startListening) {
      startListening(
        isTelugu ? 'ఇక్కడ మీ ప్రశ్న చెప్పండి...' : 'Speak your query...',
        (result) => {
          setQuery(result);
        }
      );
    }
  };

  const executeQuery = (queryText) => {
    const cleanQuery = queryText.trim();
    if (!cleanQuery) return;

    // Add user message
    const updatedMessages = [...chatMessages, { sender: 'user', text: cleanQuery }];
    setChatMessages(updatedMessages);
    setQuery('');
    setTyping(true);

    // AI thinking delay
    setTimeout(() => {
      const response = processQuery(cleanQuery);
      setChatMessages((prev) => [...prev, { sender: 'ai', ...response }]);
      setTyping(false);
    }, 1000);
  };

  // Advanced NLP/Keyword Query Matching Engine
  const processQuery = (q) => {
    const qLower = q.toLowerCase();

    const stopwords = new Set([
      'what', 'are', 'the', 'required', 'documents', 'for', 'to', 'apply', 'in', 'of', 'and', 
      'a', 'an', 'is', 'any', 'about', 'how', 'who', 'am', 'i', 'with', 'need', 'please', 
      'give', 'details', 'application', 'certificate', 'service', 'registration', 'scheme', 'yojana',
      'ఏమిటి', 'ఏమి', 'ఎలా', 'కావాలి', 'పత్రాలు', 'కొరకు', 'క్రింది', 'వివరాలు', 'పథకం', 
      'పథకాలు', 'సేవ', 'సేవలు', 'ద్వారా', 'ఆన్‌లైన్', 'దరఖాస్తు', 'చేయాలి', 'కాగితాలు', 'అర్హత', 'అర్హతలు'
    ]);

    const strongKeywords = new Set([
      'income', 'caste', 'birth', 'death', 'pan', 'passport', 'land', 'ration', 'rice', 'pension', 
      'electricity', 'power', 'water', 'house', 'housing', 'tax', 'itr', 'voter', 'epf', 'epfo', 
      'aadhaar', 'uidai', 'meebhoomi', 'encumbrance', 'ec', 'bills', 'bill', 'thalliki', 'vandanam',
      'bharosa', 'aarogyaseva', 'cheyutha', 'kapu', 'nestham', 'annadatha', 'sukhibhava', 'deevena',
      'vasathi', 'asara', 'vahana', 'mitra', 'thodu', 'matsyakara', 'netanna', 'aadabidda', 'nidhi',
      'deepam', 'kisan', 'samman', 'vishwakarma', 'svanidhi', 'jan', 'dhan', 'pmjdy', 'mudra', 'awas',
      'pmjay', 'suraksha', 'bima', 'jeevan', 'jyoti', 'atal', 'sukanya', 'samriddhi', 'spandana', 'meekosam',
      'ఆదాయ', 'ఆదాయం', 'కుల', 'కులం', 'జనన', 'పుట్టిన', 'మరణ', 'చనిపోయిన', 'ప్యాన్', 'పాస్పోర్ట్', 
      'భూమి', 'రేషన్', 'రైస్', 'పింఛన్', 'పెన్షన్', 'కరెంట్', 'విద్యుత్', 'నీటి', 'ఇల్లు', 'ఇళ్ళ', 
      'పన్ను', 'ఓటర్', 'ఆధార్', 'మీభూమి', 'ఈసీ', 'తల్లీకి', 'వందనం', 'భరోసా', 'ఆరోగ్యసేవ', 'చేయూత',
      'కాపు', 'నేస్తం', 'అన్నదాత', 'సుఖీభవ', 'దీవెన', 'వసతి', 'ఆసరా', 'వాహన', 'మిత్ర', 'తోడు',
      'మత్స్యకార', 'నేతన్న', 'ఆడబిడ్డ', 'నిధి', 'దీపం', 'కిసాన్', 'విశ్వకర్మ', 'స్పందన', 'మీకోసం'
    ]);

    const getMatchScore = (item) => {
      if (!item) return 0;
      const nameLower = item.name.toLowerCase();
      const descLower = (item.description || '').toLowerCase();
      
      // 1. Exact phrase/name match (highest priority)
      if (qLower.includes(nameLower)) {
        return 1000;
      }
      
      // 2. Tokenized word intersection score
      const queryWords = qLower.split(/[^a-zA-Z0-9\u0C00-\u0C7F]+/).filter(w => w.length > 1 && !stopwords.has(w));
      const nameWords = nameLower.split(/[^a-zA-Z0-9\u0C00-\u0C7F]+/).filter(w => w.length > 1 && !stopwords.has(w));
      const descWords = descLower.split(/[^a-zA-Z0-9\u0C00-\u0C7F]+/).filter(w => w.length > 1 && !stopwords.has(w));

      let score = 0;
      
      // Match words in name
      for (const qw of queryWords) {
        if (nameWords.includes(qw)) {
          if (strongKeywords.has(qw)) {
            score += 200; // Large weight for strong keywords in name
          } else {
            score += 20; // Medium weight for other words in name
          }
        } else if (descWords.includes(qw)) {
          if (strongKeywords.has(qw)) {
            score += 50; // Smaller weight for strong keywords in description
          } else {
            score += 5;
          }
        }
      }
      return score;
    };

    // Helper to match a scheme in the query
    let bestScheme = null;
    let bestSchemeScore = 0;
    for (const s of schemes) {
      const score = getMatchScore(s);
      if (score > bestSchemeScore) {
        bestSchemeScore = score;
        bestScheme = s;
      }
    }

    // Helper to match a service in the query
    let bestService = null;
    let bestServiceScore = 0;
    for (const srv of services) {
      const score = getMatchScore(srv);
      if (score > bestServiceScore) {
        bestServiceScore = score;
        bestService = srv;
      }
    }

    // Determine the best match overall
    let matchedItem = null;
    let matchType = ''; // 'scheme' or 'service'
    if (bestSchemeScore >= 20 || bestServiceScore >= 20 || bestSchemeScore === 1000 || bestServiceScore === 1000) {
      if (bestSchemeScore >= bestServiceScore) {
        matchedItem = bestScheme;
        matchType = 'scheme';
      } else {
        matchedItem = bestService;
        matchType = 'service';
      }
    }

    // If we matched a specific scheme or service, check if they asked a specific sub-query about it
    if (matchedItem) {
      const isDocQuery = qLower.includes('doc') || qLower.includes('paper') || qLower.includes('file') || qLower.includes('need') || qLower.includes('పత్రాలు') || qLower.includes('కాగితాలు');
      const isEligQuery = qLower.includes('elig') || qLower.includes('qualified') || qLower.includes('who can') || /\bfit\b/.test(qLower) || qLower.includes('am i') || qLower.includes('అర్హత') || qLower.includes('అర్హుడినా');
      const isBenefitQuery = qLower.includes('benefit') || qLower.includes('money') || qLower.includes('financial') || qLower.includes('give') || qLower.includes('how much') || qLower.includes('లాభం') || qLower.includes('డబ్బులు') || qLower.includes('సహాయం') || qLower.includes('ప్రయోజనం');
      const isProcessQuery = qLower.includes('how') || qLower.includes('apply') || qLower.includes('process') || qLower.includes('where') || qLower.includes('submit') || qLower.includes('ఎలా') || qLower.includes('దరఖాస్తు') || qLower.includes('ఎక్కడ');

      if (matchType === 'scheme') {
        if (isDocQuery) {
          return {
            text: isTelugu
              ? `**${matchedItem.name}** పథకానికి కావలసిన పత్రాలు ఇవి:\n\n${matchedItem.required_documents || 'ఆధార్ కార్డ్, బ్యాంక్ పాస్‌బుక్, ఆదాయ ధృవీకరణ పత్రం.'}`
              : `To apply for **${matchedItem.name}**, you will need to submit these documents:\n\n${matchedItem.required_documents || 'Aadhaar Card, BPL Ration Card, Bank Passbook, Passport photos.'}`,
            scheme: matchedItem
          };
        }
        if (isEligQuery) {
          return {
            text: isTelugu
              ? `**${matchedItem.name}** అర్హత ప్రమాణాలు:\n\n• వయస్సు: ${matchedItem.min_age} నుండి ${matchedItem.max_age} సంవత్సరాలు.\n• గరిష్ట ఆదాయం: ${matchedItem.max_income < 99999999 ? `₹${Number(matchedItem.max_income).toLocaleString('en-IN')} లోపు` : 'ఆдая పరిమితి లేదు'}.\n• నిబంధనలు: ${matchedItem.eligibility_criteria || 'సాధారణ సంక్షేమ పథకం.'}`
              : `Here are the eligibility criteria for **${matchedItem.name}**:\n\n• Age Limit: ${matchedItem.min_age} to ${matchedItem.max_age} years.\n• Annual Income: ${matchedItem.max_income < 99999999 ? `Below ₹${Number(matchedItem.max_income).toLocaleString('en-IN')}` : 'No income ceiling'}.\n• Additional Criteria: ${matchedItem.eligibility_criteria || 'General public scheme.'}`,
            scheme: matchedItem
          };
        }
        if (isBenefitQuery) {
          return {
            text: isTelugu
              ? `**${matchedItem.name}** పథకం యొక్క ప్రయోజనాలు:\n\n• **సహాయం మొత్తం**: ${matchedItem.financial_assistance_amount > 0 ? `₹${Number(matchedItem.financial_assistance_amount).toLocaleString('en-IN')} సంవత్సరానికి` : 'సబ్సిడీ / సేవలు'}\n• **వివరాలు**: ${matchedItem.benefits || 'సంక్షేమ సహాయం.'}`
              : `Here are the benefits for **${matchedItem.name}**:\n\n• **Financial Aid**: ${matchedItem.financial_assistance_amount > 0 ? `₹${Number(matchedItem.financial_assistance_amount).toLocaleString('en-IN')} per year` : 'Welfare service / subsidy'}\n• **Details**: ${matchedItem.benefits || 'Welfare support.'}`,
            scheme: matchedItem
          };
        }
        if (isProcessQuery) {
          return {
            text: isTelugu
              ? `**${matchedItem.name}** దరఖాస్తు విధానం:\n\n1. అధికారిక పోర్టల్ సందర్శించండి: ${matchedItem.official_website}\n2. మీ పత్రాలను సమర్పించండి.\n3. విధానం: ${matchedItem.application_process || 'వార్డు సచివాలయంలో లేదా ఆన్‌లైన్ ద్వారా.'}`
              : `Here is the application process for **${matchedItem.name}**:\n\n1. Visit the official website: ${matchedItem.official_website}\n2. Prepare your documents.\n3. Process: ${matchedItem.application_process || 'Submit physical files in Ward Sachivalayam or register on official portal.'}`,
            scheme: matchedItem
          };
        }
        // General scheme response
        return {
          text: isTelugu
            ? `నేను మీ ప్రశ్నకు సరిపోయే పథకాన్ని కనుగొన్నాను: **${matchedItem.name}**. కింద ఉన్న కార్డులో వివరాలను చూడవచ్చు:`
            : `I found a matching welfare scheme: **${matchedItem.name}**. Here are the core details:`,
          scheme: matchedItem
        };
      } else {
        // service matches
        if (isDocQuery) {
          return {
            text: isTelugu
              ? `**${matchedItem.name}** దరఖాస్తు కొరకు క్రింది పత్రాలు అవసరం:\n\n${matchedItem.required_documents || 'ఆధార్ కార్డ్, ఫోటోలు, సంబంధిత ఆధారాలు.'}`
              : `To apply for **${matchedItem.name}**, you will need to submit these documents:\n\n${matchedItem.required_documents || 'Aadhaar Card, photos, and relevant supporting proofs.'}`,
            service: matchedItem
          };
        }
        if (isProcessQuery || isEligQuery || isBenefitQuery) {
          return {
            text: isTelugu
              ? `**${matchedItem.name}** సేవల దరఖాస్తు వివరణ:\n\n• **వివరణ**: ${matchedItem.description}\n• **విధానం**: మీ సేవ పోర్టల్ లేదా వార్డు సచివాలయం ద్వారా ఆన్‌లైన్‌లో దరఖాస్తు చేసుకోండి. అధికారిక లింక్ కింద కార్డులో ఉంది.`
              : `Here is the details on how to apply for **${matchedItem.name}**:\n\n• **Description**: ${matchedItem.description}\n• **Process**: Apply online via the MeeSeva portal or visit the local secretariat. Direct link is available in the card below.`,
            service: matchedItem
          };
        }
        // General service response
        return {
          text: isTelugu
            ? `నేను మీ కొరకు సేవను కనుగొన్నాను: **${matchedItem.name}**. దరఖాస్తు వివరాలు కింద ఇవ్వబడ్డాయి:`
            : `I located a matching digital service: **${matchedItem.name}**. Here is how to apply:`,
          service: matchedItem
        };
      }
    }

    // 3. Check for grievances keywords
    if (qLower.includes('grievance') || qLower.includes('complaint') || qLower.includes('ఫిర్యాదు') || qLower.includes('సమస్య') || qLower.includes('గ్రీవెన్స్')) {
      return {
        text: isTelugu
          ? 'మీరు మీ పరిసరాలలో పారిశుధ్యం, రోడ్లు, లేదా నీటి సమస్యలపై గ్రీవెన్స్ దాఖలు చేయాలనుకుంటే, సహాయక డ్రాఫ్ట్ టూల్‌ను ఉపయోగించండి.'
          : 'To file a complaint or write a formal grievance letter for local civic issues, you can use our built-in Grievance Assistant.',
        action: {
          label: isTelugu ? 'గ్రీవెన్స్ సహాయకురాలికి వెళ్ళు' : 'Go to Grievance Assistant',
          page: 'grievance'
        }
      };
    }

    // 4. General Knowledge Base mapping
    const generalKb = [
      {
        keys: ['chief minister', 'cm of ap', 'ap cm', 'chandrababu', 'naidu', 'చంద్రబాబు', 'ముఖ్యమంత్రి'],
        en: 'The current Chief Minister of Andhra Pradesh is **Nara Chandrababu Naidu**, representing the Telugu Desam Party (TDP).',
        te: 'ఆంధ్రప్రదేశ్ ప్రస్తుత ముఖ్యమంత్రి **నారా చంద్రబాబు నాయుడు** గారు (తెలుగుదేశం పార్టీ).'
      },
      {
        keys: ['prime minister', 'pm of india', 'modi', 'ప్రధానమంత్రి', 'మోదీ'],
        en: 'The current Prime Minister of India is **Narendra Modi**.',
        te: 'భారతదేశ ప్రస్తుత ప్రధానమంత్రి **నరేంద్ర మోదీ** గారు.'
      },
      {
        keys: ['spandana', 'register complaint', 'how to complain', 'స్పందన', 'ఫిర్యాదు చేయడం', 'pgrs', 'mee kosam', 'మీకోసం'],
        en: '**PGRS / Mee Kosam** (https://meekosam.ap.gov.in/) is the public grievance redressal portal of Andhra Pradesh (formerly Spandana). Citizens can register complaints using Aadhaar verification and track status. You can also generate complaint drafts using the "Grievance Assistant" tab.',
        te: '**PGRS / మీకోసం** (https://meekosam.ap.gov.in/) అనేది ఆంధ్రప్రదేశ్ ప్రభుత్వ ప్రజా సమస్యల పరిష్కార వేదిక (గతంలో స్పందన). పౌరులు తమ ఆధార్ నంబర్ ఉపయోగించి లాగిన్ అయి సమస్యలపై ఫిర్యాదు చేయవచ్చు.'
      },
      {
        keys: ['cpgrams', 'pgportal', 'central complaint', 'complaint to central'],
        en: '**CPGRAMS** (https://pgportal.gov.in/) is the Central Government grievance system. It allows citizens to lodge complaints against Central ministries and banking/telecom departments directly.',
        te: '**CPGRAMS** అనేది కేంద్ర ప్రభుత్వానికి సమస్యలపై ఫిర్యాదులు చేసే ఆన్‌లైన్ వేదిక. దీని ద్వారా కేంద్ర ప్రభుత్వ శాఖలపై నేరుగా ఫిర్యాదులు చేయవచ్చు.'
      },
      {
        keys: ['meeseva', 'mee seva', 'మీసేవా', 'మీ సేవ'],
        en: '**MeeSeva** is the official citizen services portal for Andhra Pradesh. It provides certificates (birth, death, income, caste), land records (Adangal, 1B), and billing services securely.',
        te: '**మీసేవా** అనేది ఆంధ్రప్రదేశ్ పౌర సేవల పోర్టల్. దీని ద్వారా కుల, ఆదాయ, జనన, మరణ ధృవీకరణ పత్రాలు మరియు భూ రికార్డులను పొందవచ్చు.'
      },
      {
        keys: ['sachivalayam', 'secretariat', 'ward secretariat', 'సచివాలయం', 'వార్డు సచివాలయం'],
        en: '**Ward and Grama Sachivalayams** are local administrative offices in Andhra Pradesh designed to deliver government services, welfare schemes, and register complaints directly at the citizen doorstep.',
        te: '**గ్రామ మరియు వార్డు సచివాలయాలు** ద్వారా ప్రజలకు ప్రభుత్వ పథకాలు మరియు సేవలు నేరుగా స్థానికంగా అందజేయబడతాయి.'
      },
      {
        keys: ['aadhaar', 'uidai', 'ఆధార్', 'యూఐడీఏఐ'],
        en: '**Aadhaar** is a 12-digit unique identity number issued by UIDAI. It is mandatory for most government welfare schemes to verify eligibility and ensure direct benefit transfer (DBT).',
        te: '**ఆధార్** అనేది భారతీయ పౌరుల ప్రత్యేక 12 అంకెల గుర్తింపు సంఖ్య. ప్రభుత్వ పథకాల సహాయాన్ని నేరుగా పొందడానికి ఇది తప్పనిసరి.'
      },
      {
        keys: ['ration card', 'bpl card', 'white ration card', 'రేషన్ కార్డు', 'రైస్ కార్డు'],
        en: '**Ration/Rice Cards** are issued to Below Poverty Line (BPL) families to purchase subsidized food grains. It is also used as standard income eligibility proof for state welfare benefits.',
        te: '**రేషన్/రైస్ కార్డ్** పేదరిక రేఖకు దిగువన ఉన్న కుటుంబాలకు అందజేయబడుతుంది. ఇది ప్రభుత్వ పథకాలకు దరఖాస్తు చేయడానికి ఒక ముఖ్యమైన ఆదాయ నిరూపణ పత్రం.'
      }
    ];

    for (const kb of generalKb) {
      if (kb.keys.some(k => qLower.includes(k))) {
        return {
          text: isTelugu ? kb.te : kb.en
        };
      }
    }

    // 5. Smart NLP Fallback Resolver
    // Extract keywords and match dynamically
    const keywords = qLower.split(/[^a-zA-Z0-9\u0C00-\u0C7F]+/).filter(w => w.length > 3);
    if (keywords.length > 0) {
      // Find schemes or services that contain any of these keywords in their name/desc/eligibility
      const matchingSchemes = schemes.filter(s => {
        if (!s) return false;
        const fullText = ((s.name || '') + ' ' + (s.description || '') + ' ' + (s.eligibility_criteria || '')).toLowerCase();
        return keywords.some(kw => fullText.includes(kw));
      });
      const matchingServices = services.filter(srv => {
        if (!srv) return false;
        const fullText = ((srv.name || '') + ' ' + (srv.description || '') + ' ' + (srv.required_documents || '')).toLowerCase();
        return keywords.some(kw => fullText.includes(kw));
      });

      if (matchingSchemes.length > 0 || matchingServices.length > 0) {
        let responseText = isTelugu
          ? `నేను మీ ప్రశ్నకు సంబంధించిన కొన్ని సేవలు/పథకాలను కనుగొన్నాను:\n\n`
          : `Based on your question about **"${q}"**, here are some related programs and digital services I found:\n\n`;

        if (matchingSchemes.length > 0) {
          responseText += (isTelugu ? `**పథకాలు:**\n` : `**Welfare Schemes:**\n`);
          matchingSchemes.slice(0, 3).forEach(s => {
            responseText += `• **${s.name}**: ${s.description.substring(0, 100)}...\n`;
          });
        }
        if (matchingServices.length > 0) {
          responseText += `\n` + (isTelugu ? `**డిజిటల్ సేవలు:**\n` : `**MeeSeva / Digital Services:**\n`);
          matchingServices.slice(0, 3).forEach(srv => {
            responseText += `• **${srv.name}**: ${srv.description.substring(0, 100)}...\n`;
          });
        }

        responseText += `\n` + (isTelugu 
          ? `దయచేసి నిర్దిష్ట వివరాల కొరకు సంబంధిత పథకం/సేవ పేరుతో ప్రశ్నించండి.`
          : `For specific forms, eligibility check, or document lists, please search or select one of these schemes directly.`);

        return {
          text: responseText,
          // Attach the first matched item as preview card
          scheme: matchingSchemes[0] || null,
          service: matchingSchemes[0] ? null : (matchingServices[0] || null)
        };
      }
    }

    // Default response if no keyword hits
    return {
      text: isTelugu
        ? `క్షమించండి, మీ ప్రశ్నకు సరిపోయే సమాచారం కనుగొనబడలేదు. దయచేసి **పిఎం కిసాన్**, **తల్లీకి వందనం**, **ఎన్టీఆర్ ఆరోగ్యసేవ** వంటి పథకాలు లేదా **జనన ధృవీకరణ పత్రం**, **ఆదాయ ధృవీకరణ** వంటి సర్టిఫికేట్ల గురించి అడగండి.`
        : `I could not find a specific match for your query. Try asking about specific programs like **PM Kisan**, **Thalliki Vandanam**, **NTR Aarogyaseva**, or MeeSeva services like **Birth Certificate** or **Income Certificate**.`
    };
  };

  return (
    <div className="space-y-6 pb-12 flex flex-col h-[75vh]">
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-1.5 h-8 bg-gov-blue rounded-full"></span>
          {isTelugu ? 'AI సిటిజెన్ హెల్ప్ డెస్క్ సహాయకుడు' : 'AI e-Governance Assistant'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isTelugu 
            ? 'ఈ ద్వారం గురించి ఏవైనా సందేహాలను అడగండి. వాయిస్ లేదా టెక్స్ట్ ద్వారా శోధించవచ్చు.' 
            : 'Ask any questions about the portal services, documents, or schemes. Supports voice commands and natural language inquiries.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
        {/* Left Side: Prompts & Suggestions */}
        <div className="lg:col-span-1 space-y-4 flex-shrink-0 hidden lg:block">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
            <h3 className="font-bold text-slate-950 dark:text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gov-gold" />
              {isTelugu ? 'సూచన ప్రశ్నలు' : 'Try Asking:'}
            </h3>
            <div className="space-y-2">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => executeQuery(p.query)}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-slate-200 dark:border-slate-800 dark:hover:border-slate-700 bg-slate-50/50 hover:bg-slate-100/50 dark:bg-slate-950/20 text-xs text-slate-600 dark:text-slate-400 transition font-medium leading-relaxed"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Chat Streams */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-sm flex flex-col justify-between overflow-hidden">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/25 dark:bg-slate-950/10">
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  msg.sender === 'user' 
                    ? 'bg-gov-blue text-white' 
                    : 'bg-gov-gold/15 text-gov-navy border border-gov-gold/30 dark:text-amber-300'
                }`}>
                  {msg.sender === 'user' ? 'U' : 'AI'}
                </div>

                <div className="space-y-3">
                  {/* Chat Box */}
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                    msg.sender === 'user'
                      ? 'bg-gov-blue text-white border-gov-blue rounded-tr-none'
                      : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Render Scheme Card */}
                  {msg.scheme && (
                    <div className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-5 rounded-2xl shadow-sm space-y-3 max-w-md animate-scaleUp">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                        <span>{msg.scheme.type === 'Central' ? (isTelugu ? 'కేంద్రం' : 'Central') : (isTelugu ? 'రాష్ట్రం' : 'State')}</span>
                        <span>{msg.scheme.category_name}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">
                        {msg.scheme.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {msg.scheme.description}
                      </p>
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {isTelugu ? 'సహాయం' : 'Aid'}: {msg.scheme.financial_assistance_amount > 0 ? `₹${msg.scheme.financial_assistance_amount.toLocaleString('en-IN')}` : (isTelugu ? 'సబ్సిడీలు' : 'Subsidies')}
                        </span>
                        <button 
                          onClick={() => setSelectedScheme(msg.scheme)}
                          className="bg-gov-blue text-white px-3.5 py-1.5 rounded-lg font-bold text-[10px] hover:bg-gov-navy transition"
                        >
                          {isTelugu ? 'వివరాలు చూడు' : 'View Details'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Render Service Card */}
                  {msg.service && (
                    <div className="bg-white dark:bg-slate-950 border border-slate-150 dark:border-slate-850 p-5 rounded-2xl shadow-sm space-y-3 max-w-md animate-scaleUp">
                      <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400">
                        <span>{msg.service.type}</span>
                        <span>{msg.service.department_code}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-950 dark:text-white text-sm">
                        {msg.service.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {msg.service.description}
                      </p>
                      {msg.service.required_documents && (
                        <div className="text-[11px] p-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-400">
                          <strong>{isTelugu ? 'పత్రాలు:' : 'Documents:'} </strong>
                          {msg.service.required_documents}
                        </div>
                      )}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                        <a 
                          href={msg.service.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-gov-blue text-white px-3.5 py-1.5 rounded-lg font-bold text-[10px] hover:bg-gov-navy transition inline-flex items-center gap-1"
                        >
                          {isTelugu ? 'అప్లై చెయ్యి' : 'Apply Online'} &rarr;
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Render Action button redirection */}
                  {msg.action && (
                    <button
                      onClick={() => setPage(msg.action.page)}
                      className="bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition animate-pulse"
                    >
                      {msg.action.label} <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {typing && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="w-8 h-8 rounded-full bg-gov-gold/15 text-gov-navy border border-gov-gold/30 flex items-center justify-center text-xs font-bold animate-pulse">
                  AI
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            
            {/* Scroll bottom anchor */}
          </div>

          {/* Chat Input Workspace */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
            <form 
              onSubmit={(e) => { e.preventDefault(); executeQuery(query); }}
              className="flex items-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden px-3 py-1.5"
            >
              {/* Mic dictate button */}
              <button
                type="button"
                onClick={handleMicClick}
                className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-xl transition flex-shrink-0"
                title={isTelugu ? 'వాయిస్ సహాయకుడు' : 'Voice Query Assistant'}
              >
                <Mic className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder={isTelugu ? 'సంక్షేమ పథకాలు లేదా పత్రాల వివరాల గురించి అడగండి...' : 'Ask about welfare schemes, MeeSeva, required documents...'}
                className="flex-1 bg-transparent focus:outline-none p-3 text-xs sm:text-sm text-slate-900 dark:text-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                type="submit"
                disabled={!query.trim()}
                className="bg-gov-blue hover:bg-gov-navy disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white p-3 rounded-xl transition flex-shrink-0 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
