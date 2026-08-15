/* ============================================================
   THANGAMAGAL — Language system (English / Tamil)
   Persists selection in localStorage as 'tgm_lang'
   ============================================================ */

const translations = {
  en: {
    metaTitle: "Thangamagal Gold Loan | Gold Loan in Trichy",
    metaDescription: "Thangamagal Gold Loan at Chithra Complex, Chatram Bus Stand, Tiruchirappalli — trusted, secure gold loan assistance. Powered by Greenvill.",
    skipLink: "Skip to main content",
    navHome: "Home",
    navAbout: "About",
    navGoldLoan: "Gold Loan",
    navWhyUs: "Why Choose Us",
    navHow: "How It Works",
    navFaq: "FAQ",
    navContact: "Contact",
    langCurrent: "English",
    langOther: "தமிழ்",

    heroEyebrow: "Thangamagal Gold Loan",
    heroName: "THANGAMAGAL",
    brandName: "Thangamagal",
    heroSub: "Gold Loan",
    heroTagline: "TRUST \u2022 SECURITY \u2022 PROSPERITY",
    heroLine: "Reliable gold loan assistance in Trichy \u2014 straightforward process, secure handling, and a team that treats every customer with respect.",
    ctaContact: "Get in Touch",
    ctaVisit: "Visit Us",

    trustEyebrow: "Why customers trust us",
    trust1Title: "Trusted Service",
    trust1Desc: "A customer-first approach built on honesty and transparency.",
    trust2Title: "Quick Disbursement",
    trust2Desc: "A simple process designed to save you time.",
    trust3Title: "Secure Your Gold",
    trust3Desc: "Your jewellery is handled with care and professional security.",
    trust4Title: "Maximum Value for Your Gold",
    trust4Desc: "Fair evaluation so you get the value your gold deserves.",

    aboutEyebrow: "About Thangamagal",
    aboutHeading: "A gold-loan service built on trust",
    aboutP1: "Thangamagal Gold Loan is a customer-focused gold-loan finance service located at Chithra Complex, Chatram Bus Stand, Tiruchirappalli. We work to make gold-backed finance simple, transparent, and accessible for the local community.",
    aboutP2: "Every customer who walks in is treated with respect and clarity \u2014 from evaluation to disbursement. Our team is on hand to guide you through the process and answer any questions along the way.",
    aboutList1: "Transparent, easy-to-understand process",
    aboutList2: "Secure handling of pledged gold",
    aboutList3: "Professional, courteous assistance",
    aboutList4: "Conveniently located near Chatram Bus Stand",

    servicesEyebrow: "Our Services",
    servicesHeading: "Gold Loan Services",
    servicesSub: "Straightforward gold-backed finance assistance, from first enquiry to disbursement.",
    service1Title: "Gold Loan Against Jewellery",
    service1Desc: "Enquire about finance against your eligible gold jewellery.",
    service2Title: "Quick Loan Assistance",
    service2Desc: "A simple enquiry and assistance process for customers seeking gold-backed finance.",
    service3Title: "Secure Gold Handling",
    service3Desc: "Pledged jewellery is handled and stored with professional care.",
    service4Title: "Customer Support",
    service4Desc: "Guidance on the process, required documents, and repayment-related information.",

    whyEyebrow: "Why Choose Us",
    whyHeading: "Service you can rely on",
    why1Title: "Trusted Customer Service",
    why1Desc: "A team that takes time to explain every step clearly.",
    why2Title: "Convenient Location",
    why2Desc: "Easy to reach near Chatram Bus Stand in the heart of Trichy.",
    why3Title: "Transparent Process",
    why3Desc: "No hidden surprises \u2014 clarity from start to finish.",
    why4Title: "Secure Gold Handling",
    why4Desc: "Your jewellery's safety is treated as a top priority.",
    why5Title: "Professional Assistance",
    why5Desc: "Experienced staff ready to guide you through every enquiry.",
    why6Title: "Customer-Focused Approach",
    why6Desc: "Every visit is handled with patience and genuine care.",

    howEyebrow: "The Process",
    howHeading: "How It Works",
    how1Title: "Visit Us",
    how1Desc: "Come to our branch at Chithra Complex with your gold jewellery.",
    how2Title: "Gold Evaluation",
    how2Desc: "Our team evaluates your gold carefully and transparently.",
    how3Title: "Loan Processing",
    how3Desc: "We guide you through the documentation and process.",
    how4Title: "Disbursement",
    how4Desc: "Receive your funds once processing is complete.",

    locEyebrow: "Visit Us",
    locHeading: "Visit Thangamagal",
    locName: "Thangamagal Gold Loan",
    locAddrLine1: "Chithra Complex, Chatram Bus Stand,",
    locAddrLine2: "Tiruchirappalli, Tamil Nadu",
    ctaDirections: "Get Directions",

    contactEyebrow: "Get in Touch",
    contactHeading: "Contact Us",
    contactSub: "Reach out and our team will be happy to assist you.",
    callNow: "Call Now",
    callDesc: "Speak with our team directly",
    whatsappUs: "WhatsApp Us",
    whatsappDesc: "Send us a quick message",
    getDirections: "Get Directions",
    getDirectionsDesc: "Find us near Chatram Bus Stand",
    formNote: "This enquiry form is not yet connected to a live inbox. Please use Call or WhatsApp above for the fastest response.",
    formName: "Name",
    formPhone: "Phone Number",
    formMessage: "Message",
    sendEnquiry: "Send Enquiry",

    faqEyebrow: "Questions",
    faqHeading: "Frequently Asked Questions",
    faq1Q: "What is a gold loan?",
    faq1A: "A gold loan is finance obtained against gold jewellery pledged as security. The jewellery is evaluated and held securely until the loan is repaid.",
    faq2Q: "What documents are required?",
    faq2A: "Standard identity and address proof documents are typically required. Our team will guide you through the exact requirements when you visit.",
    faq3Q: "How is the gold evaluated?",
    faq3A: "Our team evaluates gold jewellery carefully and transparently at the branch, explaining the process as we go.",
    faq4Q: "How does repayment work?",
    faq4A: "Repayment details and terms are explained clearly by our team at the time of the loan, so you know exactly what to expect.",
    faq5Q: "Where is Thangamagal located?",
    faq5A: "We are located at Chithra Complex, Chatram Bus Stand, Tiruchirappalli, Tamil Nadu.",

    footerLinksHeading: "Quick Links",
    footerLegalHeading: "Legal",
    footerLangHeading: "Language",
    privacyLink: "Privacy Policy",
    termsLink: "Terms & Conditions",
    poweredBy: "Powered by",
    poweredByBrand: "Greenvill",
    copyright: "\u00A9 2026 Thangamagal Gold Loan. All Rights Reserved.",

    legalBack: "Back to Home",

    privacyTitle: "Privacy Policy | Thangamagal Gold Loan",
    privacyEyebrow: "Legal",
    privacyHeading: "Privacy Policy",
    privacyUpdated: "Last updated: August 2026",
    privacyBody: "\
      <h2>Information We Collect</h2>\
      <p>This website is a static informational site. It does not currently include a functioning enquiry form connected to a live inbox, so no personal information is collected through form submissions at this time.</p>\
      <h2>Contact &amp; Enquiry Information</h2>\
      <p>If you contact us directly by phone, WhatsApp, or in person at our branch, any information you choose to share (such as your name or phone number) is used solely to respond to your enquiry and assist you with your gold loan needs.</p>\
      <h2>Cookies &amp; Local Storage</h2>\
      <p>This website uses your browser's local storage only to remember your selected language (English or Tamil) so it persists as you navigate between pages. No tracking cookies are used.</p>\
      <h2>Analytics</h2>\
      <p>This website does not currently use any analytics or tracking scripts. If analytics tools are added in the future, this policy will be updated accordingly.</p>\
      <h2>Third-Party Services</h2>\
      <p>The location section of this website embeds a Google Maps view to help you find our branch. Google's own privacy policy governs any data handled by that embedded map.</p>\
      <h2>Data Usage</h2>\
      <p>We do not sell, rent, or share any information you share with us with third parties for marketing purposes.</p>\
      <h2>Data Retention</h2>\
      <p>Since this website does not collect data through automated forms, there is no automated data retention to describe. Any information shared directly with our branch is retained only as needed to assist you.</p>\
      <h2>Security</h2>\
      <p>We take reasonable steps to keep information you share with us secure and handled professionally.</p>\
      <h2>Your Rights</h2>\
      <p>You may contact us at any time to ask what information, if any, we hold about you, or to request that it be corrected or removed.</p>\
      <h2>Contact Information</h2>\
      <p>For any privacy-related questions, please reach out to us using the contact details on our Contact page.</p>\
      <h2>Policy Updates</h2>\
      <p>This policy may be updated from time to time as the website evolves. The date at the top of this page reflects the most recent update.</p>",

    termsTitle: "Terms & Conditions | Thangamagal Gold Loan",
    termsEyebrow: "Legal",
    termsHeading: "Terms & Conditions",
    termsUpdated: "Last updated: August 2026",
    termsBody: "\
      <h2>Website Usage</h2>\
      <p>This website is provided for general informational purposes about Thangamagal Gold Loan's services. By using this website, you agree to use it only for lawful purposes.</p>\
      <h2>Information Accuracy</h2>\
      <p>We aim to keep the information on this website accurate and up to date, but we do not guarantee that all content is free of errors or omissions at all times.</p>\
      <h2>Gold Loan Information Disclaimer</h2>\
      <p>Information about gold loan services on this website is general in nature. Specific terms, valuations, and offers are determined at our branch on a case-by-case basis.</p>\
      <h2>No Guarantee of Loan Approval</h2>\
      <p>Viewing this website or making an enquiry does not guarantee approval of any gold loan. All loans are subject to evaluation and our internal policies.</p>\
      <h2>Eligibility</h2>\
      <p>Eligibility for a gold loan is subject to applicable business policies and evaluation at the time of your visit.</p>\
      <h2>Interest &amp; Charges</h2>\
      <p>Interest rates, processing fees, and other charges are subject to applicable terms communicated to you directly at our branch, and are not published on this website.</p>\
      <h2>Website Content Ownership</h2>\
      <p>All text, images, and branding on this website, including the Thangamagal name and emblem, belong to Thangamagal Gold Loan and may not be reproduced without permission.</p>\
      <h2>External Links</h2>\
      <p>This website may link to third-party services such as Google Maps or WhatsApp. We are not responsible for the content or practices of those external services.</p>\
      <h2>Limitation of Liability</h2>\
      <p>We are not liable for any indirect or incidental loss arising from the use of this website. Please contact our branch directly for authoritative information about your gold loan.</p>\
      <h2>Policy Modifications</h2>\
      <p>These terms may be updated from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.</p>",
  },

  ta: {
    metaTitle: "தங்கமகள் தங்கக் கடன் | திருச்சியில் தங்கக் கடன்",
    metaDescription: "சித்ரா காம்ப்ளக்ஸ், சத்திரம் பேருந்து நிலையம், திருச்சிராப்பள்ளியில் அமைந்துள்ள தங்கமகள் தங்கக் கடன் \u2014 நம்பகமான, பாதுகாப்பான தங்கக் கடன் சேவை. Greenvill நிறுவனத்தால் இயக்கப்படுகிறது.",
    skipLink: "முதன்மை உள்ளடக்கத்திற்குச் செல்ல",
    navHome: "முகப்பு",
    navAbout: "எங்களைப் பற்றி",
    navGoldLoan: "தங்கக் கடன்",
    navWhyUs: "ஏன் எங்களை தேர்வு செய்ய வேண்டும்",
    navHow: "செயல்முறை",
    navFaq: "கேள்விகள்",
    navContact: "தொடர்பு",
    langCurrent: "தமிழ்",
    langOther: "English",

    heroEyebrow: "தங்கமகள் தங்கக் கடன்",
    heroName: "தங்கமகள்",
    brandName: "தங்கமகள்",
    heroSub: "தங்கக் கடன்",
    heroTagline: "நம்பிக்கை \u2022 பாதுகாப்பு \u2022 வளம்",
    heroLine: "திருச்சியில் நம்பகமான தங்கக் கடன் உதவி \u2014 எளிமையான செயல்முறை, பாதுகாப்பான கையாளுதல், மற்றும் ஒவ்வொரு வாடிக்கையாளரையும் மரியாதையுடன் நடத்தும் குழு.",
    ctaContact: "எங்களை தொடர்பு கொள்ளுங்கள்",
    ctaVisit: "எங்களை பார்வையிடுங்கள்",

    trustEyebrow: "வாடிக்கையாளர்கள் ஏன் நம்புகிறார்கள்",
    trust1Title: "நம்பகமான சேவை",
    trust1Desc: "நேர்மை மற்றும் வெளிப்படைத்தன்மையின் அடிப்படையிலான வாடிக்கையாளர் மைய அணுகுமுறை.",
    trust2Title: "விரைவான பண வழங்கல்",
    trust2Desc: "உங்கள் நேரத்தை மிச்சப்படுத்தும் எளிமையான செயல்முறை.",
    trust3Title: "உங்கள் தங்கத்திற்கு பாதுகாப்பு",
    trust3Desc: "உங்கள் நகைகள் கவனத்துடனும் தொழில்முறை பாதுகாப்புடனும் கையாளப்படுகின்றன.",
    trust4Title: "உங்கள் தங்கத்திற்கு அதிக மதிப்பு",
    trust4Desc: "உங்கள் தங்கத்திற்கு தகுந்த மதிப்பு கிடைக்க நியாயமான மதிப்பீடு.",

    aboutEyebrow: "தங்கமகள் பற்றி",
    aboutHeading: "நம்பிக்கையின் அடிப்படையில் அமைந்த தங்கக் கடன் சேவை",
    aboutP1: "தங்கமகள் தங்கக் கடன் என்பது சித்ரா காம்ப்ளக்ஸ், சத்திரம் பேருந்து நிலையம், திருச்சிராப்பள்ளியில் அமைந்துள்ள வாடிக்கையாளர் மைய தங்கக் கடன் நிதி சேவையாகும். உள்ளூர் சமூகத்திற்கு தங்க அடிப்படையிலான நிதியை எளிமையாகவும் வெளிப்படையாகவும் அணுகக்கூடியதாகவும் மாற்ற நாங்கள் பணியாற்றுகிறோம்.",
    aboutP2: "உள்ளே வரும் ஒவ்வொரு வாடிக்கையாளரும் மதிப்பீடு முதல் பண வழங்கல் வரை மரியாதையுடனும் தெளிவுடனும் நடத்தப்படுகிறார்கள். எங்கள் குழு செயல்முறை முழுவதும் உங்களுக்கு வழிகாட்டவும் கேள்விகளுக்கு பதிலளிக்கவும் தயாராக உள்ளது.",
    aboutList1: "வெளிப்படையான, எளிதில் புரிந்துகொள்ளக்கூடிய செயல்முறை",
    aboutList2: "அடகு வைக்கப்பட்ட தங்கத்தின் பாதுகாப்பான கையாளுதல்",
    aboutList3: "தொழில்முறை, மரியாதையான உதவி",
    aboutList4: "சத்திரம் பேருந்து நிலையம் அருகே வசதியான இடம்",

    servicesEyebrow: "எங்கள் சேவைகள்",
    servicesHeading: "தங்கக் கடன் சேவைகள்",
    servicesSub: "முதல் விசாரணை முதல் பண வழங்கல் வரை எளிமையான தங்க அடிப்படையிலான நிதி உதவி.",
    service1Title: "நகைகளுக்கு எதிரான தங்கக் கடன்",
    service1Desc: "உங்கள் தகுதியான தங்க நகைகளுக்கு எதிரான நிதி பற்றி விசாரிக்கவும்.",
    service2Title: "விரைவான கடன் உதவி",
    service2Desc: "தங்க அடிப்படையிலான நிதி தேடும் வாடிக்கையாளர்களுக்கான எளிமையான விசாரணை மற்றும் உதவி செயல்முறை.",
    service3Title: "பாதுகாப்பான தங்க கையாளுதல்",
    service3Desc: "அடகு வைக்கப்பட்ட நகைகள் தொழில்முறை கவனிப்புடன் கையாளப்பட்டு பாதுகாக்கப்படுகின்றன.",
    service4Title: "வாடிக்கையாளர் ஆதரவு",
    service4Desc: "செயல்முறை, தேவையான ஆவணங்கள் மற்றும் திருப்பிச் செலுத்துதல் தொடர்பான தகவல்கள் குறித்த வழிகாட்டுதல்.",

    whyEyebrow: "ஏன் எங்களை தேர்வு செய்ய வேண்டும்",
    whyHeading: "நம்பகமான சேவை",
    why1Title: "நம்பகமான வாடிக்கையாளர் சேவை",
    why1Desc: "ஒவ்வொரு படியையும் தெளிவாக விளக்க நேரம் எடுக்கும் குழு.",
    why2Title: "வசதியான இடம்",
    why2Desc: "திருச்சியின் மையத்தில் சத்திரம் பேருந்து நிலையம் அருகே எளிதில் அணுகக்கூடியது.",
    why3Title: "வெளிப்படையான செயல்முறை",
    why3Desc: "மறைமுக ஆச்சரியங்கள் இல்லை \u2014 தொடக்கம் முதல் முடிவு வரை தெளிவு.",
    why4Title: "பாதுகாப்பான தங்க கையாளுதல்",
    why4Desc: "உங்கள் நகைகளின் பாதுகாப்பு முதன்மையானதாக கருதப்படுகிறது.",
    why5Title: "தொழில்முறை உதவி",
    why5Desc: "ஒவ்வொரு விசாரணையிலும் உங்களுக்கு வழிகாட்ட அனுபவம் வாய்ந்த ஊழியர்கள்.",
    why6Title: "வாடிக்கையாளர் மைய அணுகுமுறை",
    why6Desc: "ஒவ்வொரு வருகையும் பொறுமையுடனும் உண்மையான அக்கறையுடனும் கையாளப்படுகிறது.",

    howEyebrow: "செயல்முறை",
    howHeading: "இது எப்படி வேலை செய்கிறது",
    how1Title: "எங்களை அணுகுங்கள்",
    how1Desc: "உங்கள் தங்க நகைகளுடன் சித்ரா காம்ப்ளக்ஸில் உள்ள எங்கள் கிளைக்கு வாருங்கள்.",
    how2Title: "தங்க மதிப்பீடு",
    how2Desc: "எங்கள் குழு உங்கள் தங்கத்தை கவனமாகவும் வெளிப்படையாகவும் மதிப்பீடு செய்கிறது.",
    how3Title: "கடன் செயல்முறை",
    how3Desc: "ஆவணப்படுத்தல் மற்றும் செயல்முறை முழுவதும் நாங்கள் உங்களுக்கு வழிகாட்டுகிறோம்.",
    how4Title: "பணம் வழங்கல்",
    how4Desc: "செயல்முறை முடிந்ததும் உங்கள் நிதியைப் பெறுங்கள்.",

    locEyebrow: "எங்களை பார்வையிடுங்கள்",
    locHeading: "தங்கமகளை பார்வையிடுங்கள்",
    locName: "தங்கமகள் தங்கக் கடன்",
    locAddrLine1: "சித்ரா காம்ப்ளக்ஸ், சத்திரம் பேருந்து நிலையம்,",
    locAddrLine2: "திருச்சிராப்பள்ளி, தமிழ்நாடு",
    ctaDirections: "வழி பெறுங்கள்",

    contactEyebrow: "தொடர்பு கொள்ளுங்கள்",
    contactHeading: "எங்களை தொடர்பு கொள்ளுங்கள்",
    contactSub: "தொடர்பு கொள்ளுங்கள், எங்கள் குழு உங்களுக்கு உதவ மகிழ்ச்சியடையும்.",
    callNow: "இப்போது அழைக்கவும்",
    callDesc: "எங்கள் குழுவுடன் நேரடியாக பேசுங்கள்",
    whatsappUs: "WhatsApp செய்யுங்கள்",
    whatsappDesc: "எங்களுக்கு ஒரு விரைவான செய்தி அனுப்புங்கள்",
    getDirections: "வழி பெறுங்கள்",
    getDirectionsDesc: "சத்திரம் பேருந்து நிலையம் அருகே எங்களை கண்டறியவும்",
    formNote: "இந்த விசாரணை படிவம் இன்னும் நேரடி இன்பாக்ஸுடன் இணைக்கப்படவில்லை. விரைவான பதிலுக்கு மேலே உள்ள அழைப்பு அல்லது WhatsApp-ஐ பயன்படுத்தவும்.",
    formName: "பெயர்",
    formPhone: "தொலைபேசி எண்",
    formMessage: "செய்தி",
    sendEnquiry: "விசாரணை அனுப்பு",

    faqEyebrow: "கேள்விகள்",
    faqHeading: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faq1Q: "தங்கக் கடன் என்றால் என்ன?",
    faq1A: "தங்கக் கடன் என்பது பாதுகாப்பாக அடகு வைக்கப்பட்ட தங்க நகைகளுக்கு எதிராக பெறப்படும் நிதியாகும். நகைகள் மதிப்பீடு செய்யப்பட்டு கடன் திருப்பிச் செலுத்தப்படும் வரை பாதுகாப்பாக வைக்கப்படும்.",
    faq2Q: "என்னென்ன ஆவணங்கள் தேவை?",
    faq2A: "பொதுவாக அடையாள மற்றும் முகவரி சான்று ஆவணங்கள் தேவைப்படும். நீங்கள் வருகை தரும்போது எங்கள் குழு சரியான தேவைகள் குறித்து வழிகாட்டும்.",
    faq3Q: "தங்கத்தின் மதிப்பு எவ்வாறு மதிப்பிடப்படுகிறது?",
    faq3A: "எங்கள் குழு கிளையில் தங்க நகைகளை கவனமாகவும் வெளிப்படையாகவும் மதிப்பீடு செய்கிறது, செயல்முறையை விளக்குகிறது.",
    faq4Q: "திருப்பிச் செலுத்தும் முறை எப்படி?",
    faq4A: "கடன் வழங்கும் நேரத்தில் திருப்பிச் செலுத்தும் விவரங்கள் மற்றும் விதிமுறைகள் எங்கள் குழுவால் தெளிவாக விளக்கப்படும்.",
    faq5Q: "தங்கமகள் எங்கு அமைந்துள்ளது?",
    faq5A: "நாங்கள் சித்ரா காம்ப்ளக்ஸ், சத்திரம் பேருந்து நிலையம், திருச்சிராப்பள்ளி, தமிழ்நாட்டில் அமைந்துள்ளோம்.",

    footerLinksHeading: "விரைவு இணைப்புகள்",
    footerLegalHeading: "சட்டப்பூர்வ",
    footerLangHeading: "மொழி",
    privacyLink: "தனியுரிமைக் கொள்கை",
    termsLink: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    poweredBy: "இயக்கம்",
    poweredByBrand: "Greenvill",
    copyright: "\u00A9 2026 தங்கமகள் தங்கக் கடன். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",

    legalBack: "முகப்புக்குத் திரும்பு",

    privacyTitle: "தனியுரிமைக் கொள்கை | தங்கமகள் தங்கக் கடன்",
    privacyEyebrow: "சட்டப்பூர்வ",
    privacyHeading: "தனியுரிமைக் கொள்கை",
    privacyUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது: ஆகஸ்ட் 2026",
    privacyBody: "\
      <h2>நாங்கள் சேகரிக்கும் தகவல்</h2>\
      <p>இந்த இணையதளம் ஒரு நிலையான தகவல் தளமாகும். தற்போது நேரடி இன்பாக்ஸுடன் இணைக்கப்பட்ட செயல்படும் விசாரணை படிவம் இல்லை என்பதால், படிவ சமர்ப்பிப்புகள் மூலம் தற்போது எந்த தனிப்பட்ட தகவலும் சேகரிக்கப்படவில்லை.</p>\
      <h2>தொடர்பு &amp; விசாரணை தகவல்</h2>\
      <p>நீங்கள் தொலைபேசி, WhatsApp அல்லது நேரடியாக எங்கள் கிளையில் எங்களை தொடர்பு கொண்டால், நீங்கள் பகிரும் எந்த தகவலும் (பெயர் அல்லது தொலைபேசி எண் போன்றவை) உங்கள் விசாரணைக்கு பதிலளிக்கவும் உங்கள் தங்கக் கடன் தேவைகளுக்கு உதவவும் மட்டுமே பயன்படுத்தப்படும்.</p>\
      <h2>குக்கீகள் &amp; லோக்கல் ஸ்டோரேஜ்</h2>\
      <p>இந்த இணையதளம் உங்கள் தேர்ந்தெடுக்கப்பட்ட மொழியை (ஆங்கிலம் அல்லது தமிழ்) நினைவில் வைக்க மட்டுமே உங்கள் பிரவுசரின் லோக்கல் ஸ்டோரேஜைப் பயன்படுத்துகிறது. எந்த கண்காணிப்பு குக்கீகளும் பயன்படுத்தப்படவில்லை.</p>\
      <h2>பகுப்பாய்வு</h2>\
      <p>இந்த இணையதளம் தற்போது எந்த பகுப்பாய்வு அல்லது கண்காணிப்பு ஸ்கிரிப்ட்களையும் பயன்படுத்தவில்லை. எதிர்காலத்தில் பகுப்பாய்வு கருவிகள் சேர்க்கப்பட்டால், இந்தக் கொள்கை அதற்கேற்ப புதுப்பிக்கப்படும்.</p>\
      <h2>மூன்றாம் தரப்பு சேவைகள்</h2>\
      <p>எங்கள் கிளையைக் கண்டறிய உதவும் வகையில் இந்த இணையதளத்தின் இருப்பிடப் பகுதியில் Google Maps பொதிக்கப்பட்டுள்ளது. அந்த பொதிக்கப்பட்ட வரைபடத்தால் கையாளப்படும் எந்த தரவும் Google-இன் சொந்த தனியுரிமைக் கொள்கையால் நிர்வகிக்கப்படும்.</p>\
      <h2>தரவு பயன்பாடு</h2>\
      <p>நீங்கள் எங்களுடன் பகிரும் எந்த தகவலையும் மார்க்கெட்டிங் நோக்கங்களுக்காக மூன்றாம் தரப்பினருக்கு நாங்கள் விற்கவோ, வாடகைக்கு விடவோ, பகிரவோ மாட்டோம்.</p>\
      <h2>தரவு தக்கவைப்பு</h2>\
      <p>இந்த இணையதளம் தானியங்கு படிவங்கள் மூலம் தரவு சேகரிக்காததால், விவரிக்க தானியங்கு தரவு தக்கவைப்பு எதுவும் இல்லை. எங்கள் கிளையுடன் நேரடியாக பகிரப்படும் எந்த தகவலும் உங்களுக்கு உதவத் தேவையான வரை மட்டுமே வைக்கப்படும்.</p>\
      <h2>பாதுகாப்பு</h2>\
      <p>நீங்கள் எங்களுடன் பகிரும் தகவலை பாதுகாப்பாகவும் தொழில்முறையாகவும் வைத்திருக்க நாங்கள் நியாயமான நடவடிக்கைகளை எடுக்கிறோம்.</p>\
      <h2>உங்கள் உரிமைகள்</h2>\
      <p>உங்களைப் பற்றி நாங்கள் என்ன தகவலை வைத்திருக்கிறோம் என்பதைக் கேட்கவோ, அதைத் திருத்தவோ அல்லது அகற்றவோ கோர எப்போது வேண்டுமானாலும் எங்களை தொடர்பு கொள்ளலாம்.</p>\
      <h2>தொடர்பு தகவல்</h2>\
      <p>தனியுரிமை தொடர்பான எந்த கேள்விகளுக்கும், எங்கள் தொடர்பு பக்கத்தில் உள்ள தொடர்பு விவரங்களைப் பயன்படுத்தி எங்களை அணுகவும்.</p>\
      <h2>கொள்கை புதுப்பிப்புகள்</h2>\
      <p>இணையதளம் வளரும்போது இந்தக் கொள்கை அவ்வப்போது புதுப்பிக்கப்படலாம். இந்தப் பக்கத்தின் மேலே உள்ள தேதி மிக சமீபத்திய புதுப்பிப்பைக் குறிக்கிறது.</p>",

    termsTitle: "விதிமுறைகள் மற்றும் நிபந்தனைகள் | தங்கமகள் தங்கக் கடன்",
    termsEyebrow: "சட்டப்பூர்வ",
    termsHeading: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    termsUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது: ஆகஸ்ட் 2026",
    termsBody: "\
      <h2>இணையதள பயன்பாடு</h2>\
      <p>இந்த இணையதளம் தங்கமகள் தங்கக் கடனின் சேவைகள் குறித்த பொதுவான தகவல் நோக்கங்களுக்காக வழங்கப்படுகிறது. இந்த இணையதளத்தைப் பயன்படுத்துவதன் மூலம், அதை சட்டபூர்வமான நோக்கங்களுக்காக மட்டுமே பயன்படுத்த ஒப்புக்கொள்கிறீர்கள்.</p>\
      <h2>தகவல் துல்லியம்</h2>\
      <p>இந்த இணையதளத்தில் உள்ள தகவலை துல்லியமாகவும் புதுப்பித்ததாகவும் வைத்திருக்க நாங்கள் முயற்சிக்கிறோம், ஆனால் அனைத்து உள்ளடக்கமும் எப்போதும் பிழைகள் அல்லது தவறுகள் இல்லாதது என்று உத்தரவாதம் அளிக்க முடியாது.</p>\
      <h2>தங்கக் கடன் தகவல் மறுப்பு</h2>\
      <p>இந்த இணையதளத்தில் உள்ள தங்கக் கடன் சேவைகள் பற்றிய தகவல் பொதுவான தன்மையுடையது. குறிப்பிட்ட விதிமுறைகள், மதிப்பீடுகள் மற்றும் சலுகைகள் எங்கள் கிளையில் ஒவ்வொரு வழக்கின் அடிப்படையிலும் தீர்மானிக்கப்படும்.</p>\
      <h2>கடன் ஒப்புதலுக்கு உத்தரவாதம் இல்லை</h2>\
      <p>இந்த இணையதளத்தைப் பார்ப்பது அல்லது விசாரணை செய்வது எந்த தங்கக் கடனையும் ஒப்புதல் அளிக்க உத்தரவாதம் அளிக்காது. அனைத்து கடன்களும் மதிப்பீடு மற்றும் எங்கள் உள் கொள்கைகளுக்கு உட்பட்டவை.</p>\
      <h2>தகுதி</h2>\
      <p>தங்கக் கடனுக்கான தகுதி பொருந்தக்கூடிய வணிகக் கொள்கைகள் மற்றும் உங்கள் வருகையின் போது மதிப்பீட்டிற்கு உட்பட்டது.</p>\
      <h2>வட்டி &amp; கட்டணங்கள்</h2>\
      <p>வட்டி விகிதங்கள், செயலாக்கக் கட்டணங்கள் மற்றும் பிற கட்டணங்கள் எங்கள் கிளையில் உங்களுக்கு நேரடியாக தெரிவிக்கப்படும் பொருந்தக்கூடிய விதிமுறைகளுக்கு உட்பட்டவை, இவை இந்த இணையதளத்தில் வெளியிடப்படவில்லை.</p>\
      <h2>இணையதள உள்ளடக்க உரிமை</h2>\
      <p>தங்கமகள் பெயர் மற்றும் சின்னம் உட்பட இந்த இணையதளத்தில் உள்ள அனைத்து உரை, படங்கள் மற்றும் பிராண்டிங் தங்கமகள் தங்கக் கடனுக்கு சொந்தமானது, அனுமதியின்றி மறுஉருவாக்கம் செய்யப்படக்கூடாது.</p>\
      <h2>வெளிப்புற இணைப்புகள்</h2>\
      <p>இந்த இணையதளம் Google Maps அல்லது WhatsApp போன்ற மூன்றாம் தரப்பு சேவைகளுக்கு இணைக்கப்படலாம். அந்த வெளிப்புற சேவைகளின் உள்ளடக்கம் அல்லது நடைமுறைகளுக்கு நாங்கள் பொறுப்பல்ல.</p>\
      <h2>பொறுப்பு வரம்பு</h2>\
      <p>இந்த இணையதளத்தின் பயன்பாட்டால் ஏற்படும் எந்த மறைமுக அல்லது தற்செயலான இழப்புக்கும் நாங்கள் பொறுப்பல்ல. உங்கள் தங்கக் கடன் குறித்த அதிகாரப்பூர்வ தகவலுக்கு எங்கள் கிளையை நேரடியாக தொடர்பு கொள்ளவும்.</p>\
      <h2>கொள்கை மாற்றங்கள்</h2>\
      <p>இந்த விதிமுறைகள் அவ்வப்போது புதுப்பிக்கப்படலாம். மாற்றங்கள் வெளியிடப்பட்ட பிறகு இணையதளத்தைத் தொடர்ந்து பயன்படுத்துவது புதுப்பிக்கப்பட்ட விதிமுறைகளை ஏற்றுக்கொள்வதைக் குறிக்கிறது.</p>",
  }
};

function getStoredLang() {
  try {
    return localStorage.getItem('tgm_lang') || 'en';
  } catch (e) {
    return 'en';
  }
}

function setStoredLang(lang) {
  try {
    localStorage.setItem('tgm_lang', lang);
  } catch (e) { /* ignore */ }
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.setAttribute('lang', lang);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    // format: data-i18n-attr="placeholder:formPhone|aria-label:someKey"
    const spec = el.getAttribute('data-i18n-attr');
    spec.split('|').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (attr && key && dict[key] !== undefined) {
        el.setAttribute(attr, dict[key]);
      }
    });
  });

  const titleEl = document.querySelector('title');
  const titleKey = document.body.getAttribute('data-page-title-key') || 'metaTitle';
  if (titleEl && dict[titleKey]) titleEl.textContent = dict[titleKey];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict.metaDescription) metaDesc.setAttribute('content', dict.metaDescription);

  document.querySelectorAll('.lang-current-label').forEach((el) => { el.textContent = dict.langCurrent; });
  document.querySelectorAll('.lang-other-label').forEach((el) => { el.textContent = dict.langOther; });

  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.textContent = lang === 'en' ? 'தமிழ்' : 'English';
  });

  // Toggle the hero logo asset between English / Tamil branding versions
  document.querySelectorAll('[data-logo-en][data-logo-ta]').forEach((img) => {
    img.src = lang === 'ta' ? img.getAttribute('data-logo-ta') : img.getAttribute('data-logo-en');
  });

  document.dispatchEvent(new CustomEvent('tgm:langchange', { detail: { lang } }));
}

function initLanguage() {
  const lang = getStoredLang();
  applyTranslations(lang);

  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newLang = btn.getAttribute('data-set-lang');
      setStoredLang(newLang);
      applyTranslations(newLang);
      document.querySelectorAll('.lang-menu.open').forEach((m) => m.classList.remove('open'));
      document.querySelectorAll('.lang-btn[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false'));
    });
  });

  // Simple single-button toggle (used in mobile / footer contexts)
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = getStoredLang();
      const next = current === 'en' ? 'ta' : 'en';
      setStoredLang(next);
      applyTranslations(next);
    });
  });
}

document.addEventListener('DOMContentLoaded', initLanguage);
