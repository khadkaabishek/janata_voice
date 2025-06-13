import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'np';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.issues': 'Issues',
    'nav.discussion': 'Discussion',
    'nav.analytics': 'Analytics',
    'nav.login': 'Login',
    'nav.register': 'Register',
    
    // App Info
    'app.title': 'Janata Voice',
    'app.subtitle': 'Kathmandu Metropolitan City',
    
    // Buttons
    'button.reportIssue': 'Report an Issue',
    'button.viewIssues': 'View Issues',
    'button.signOut': 'Sign Out',
    'button.createAccount': 'Create an Account',
    'button.learnMore': 'Learn More',
    'button.contactUs': 'Contact Us',
    
    // Homepage
    'home.hero.title': 'Your Voice Matters in Kathmandu',
    'home.hero.subtitle': 'Empowering citizens through technology to report issues, track progress, and build a better community together.',
    'home.stats.totalIssues': 'Total Issues',
    'home.stats.resolved': 'Resolved',
    'home.stats.topWard': 'Top Ward',
    'home.stats.lastUpdated': 'Last Updated',
    'home.howItWorks.title': 'How Janata Voice Works',
    'home.howItWorks.subtitle': 'Our platform simplifies the process of reporting issues to your municipality and tracking their resolution.',
    'home.cta.title': 'Ready to make a difference in your community?',
    'home.cta.subtitle': 'Join thousands of citizens who are working together to improve Kathmandu Metropolitan City.',
    
    // Footer
    'footer.about.title': 'About Janata Voice',
    'footer.about.description': 'Empowering citizens to report issues and collaborate with municipal authorities for better communities.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.address': 'Kathmandu Metropolitan City',
    'footer.office': 'City Hall, Bagdarbar',
    'footer.city': 'Kathmandu, Nepal',
    'footer.rights': '© 2025 Janata Voice. All rights reserved.',
    
    // Authentication
    'auth.login.title': 'Sign in to your account',
    'auth.login.subtitle': 'Access your dashboard to report and track issues in your community',
    'auth.register.title': 'Create your account',
    'auth.register.subtitle': 'Join the community and start reporting issues in your ward',
    'auth.verification.title': 'Verify as Local Resident',
    'auth.verification.subtitle': 'Complete your verification to get full access to local features',
    
    // Form Fields
    'form.fullName': 'Full Name',
    'form.email': 'Email Address',
    'form.password': 'Password',
    'form.confirmPassword': 'Confirm Password',
    'form.ward': 'Ward Number',
    'form.address': 'Address',
    'form.citizenshipNo': 'Citizenship Number',
    'form.fatherName': "Father's Name",
    'form.motherName': "Mother's Name",
    'form.spouseName': "Spouse's Name",
    'form.tole': 'Tole',
    'form.houseNumber': 'House Number',
    
    // Issues
    'issues.all': 'All Issues',
    'issues.ward': 'Ward Issues',
    'issues.critical': 'Critical Issues',
    'issues.myReports': 'My Reports',
    'issues.mapView': 'Map View',
    'issues.discussion': 'Discussion',
    'issues.analytics': 'Analytics',
    'issues.filter.search': 'Search issues...',
    'issues.filter.category': 'Category',
    'issues.filter.status': 'Status',
    'issues.filter.ward': 'Ward',
    'issues.filter.sortBy': 'Sort By'
  },
  np: {
    // Navigation
    'nav.home': 'गृह',
    'nav.issues': 'समस्याहरू',
    'nav.discussion': 'छलफल',
    'nav.analytics': 'विश्लेषण',
    'nav.login': 'लग - इन',
    'nav.register': 'दर्ता',
    
    // App Info
    'app.title': 'जनता आवाज',
    'app.subtitle': 'काठमाडौं महानगरपालिका',
    
    // Buttons
    'button.reportIssue': 'समस्या दर्ता गर्नुहोस्',
    'button.viewIssues': 'समस्याहरू हेर्नुहोस्',
    'button.signOut': 'साइन आउट',
    'button.createAccount': 'खाता खोल्नुहोस्',
    'button.learnMore': 'थप जान्नुहोस्',
    'button.contactUs': 'सम्पर्क गर्नुहोस्',
    
    // Homepage
    'home.hero.title': 'काठमाडौंमा तपाईंको आवाज महत्वपूर्ण छ',
    'home.hero.subtitle': 'नागरिकहरूलाई प्रविधि मार्फत समस्या रिपोर्ट गर्न, प्रगति ट्र्याक गर्न र राम्रो समुदाय निर्माण गर्न सशक्त बनाउँदै।',
    'home.stats.totalIssues': 'कुल समस्याहरू',
    'home.stats.resolved': 'समाधान भएका',
    'home.stats.topWard': 'उत्कृष्ट वडा',
    'home.stats.lastUpdated': 'अन्तिम अपडेट',
    'home.howItWorks.title': 'जनता आवाज कसरी काम गर्छ',
    'home.howItWorks.subtitle': 'हाम्रो प्लेटफर्मले नगरपालिकामा समस्याहरू रिपोर्ट गर्ने र समाधानको ट्र्याक गर्ने प्रक्रियालाई सरल बनाउँछ।',
    'home.cta.title': 'तपाईंको समुदायमा परिवर्तन ल्याउन तयार हुनुहुन्छ?',
    'home.cta.subtitle': 'काठमाडौं महानगरपालिकालाई सुधार गर्न हजारौं नागरिकहरूसँग सामेल हुनुहोस्।',
    
    // Footer
    'footer.about.title': 'जनता आवाज बारे',
    'footer.about.description': 'नागरिकहरूलाई समस्या रिपोर्ट गर्न र नगरपालिका अधिकारीहरूसँग सहकार्य गर्न सशक्त बनाउँदै।',
    'footer.quickLinks': 'द्रुत लिंकहरू',
    'footer.contact': 'सम्पर्क',
    'footer.address': 'काठमाडौं महानगरपालिका',
    'footer.office': 'सिटी हल, बागदरबार',
    'footer.city': 'काठमाडौं, नेपाल',
    'footer.rights': '© २०२५ जनता आवाज। सर्वाधिकार सुरक्षित।',
    
    // Authentication
    'auth.login.title': 'आफ्नो खातामा साइन इन गर्नुहोस्',
    'auth.login.subtitle': 'आफ्नो समुदायमा समस्याहरू रिपोर्ट र ट्र्याक गर्न ड्यासबोर्डमा पहुँच प्राप्त गर्नुहोस्',
    'auth.register.title': 'आफ्नो खाता सिर्जना गर्नुहोस्',
    'auth.register.subtitle': 'समुदायमा सामेल हुनुहोस् र आफ्नो वडामा समस्याहरू रिपोर्ट गर्न सुरु गर्नुहोस्',
    'auth.verification.title': 'स्थानीय निवासीको रूपमा प्रमाणित गर्नुहोस्',
    'auth.verification.subtitle': 'स्थानीय सुविधाहरूमा पूर्ण पहुँच प्राप्त गर्न आफ्नो प्रमाणीकरण पूरा गर्नुहोस्',
    
    // Form Fields
    'form.fullName': 'पूरा नाम',
    'form.email': 'इमेल ठेगाना',
    'form.password': 'पासवर्ड',
    'form.confirmPassword': 'पासवर्ड पुष्टि गर्नुहोस्',
    'form.ward': 'वडा नम्बर',
    'form.address': 'ठेगाना',
    'form.citizenshipNo': 'नागरिकता नम्बर',
    'form.fatherName': 'बुवाको नाम',
    'form.motherName': 'आमाको नाम',
    'form.spouseName': 'श्रीमान/श्रीमतीको नाम',
    'form.tole': 'टोल',
    'form.houseNumber': 'घर नम्बर',
    
    // Issues
    'issues.all': 'सबै समस्याहरू',
    'issues.ward': 'वडा समस्याहरू',
    'issues.critical': 'महत्वपूर्ण समस्याहरू',
    'issues.myReports': 'मेरो रिपोर्टहरू',
    'issues.mapView': 'नक्सा दृश्य',
    'issues.discussion': 'छलफल',
    'issues.analytics': 'विश्लेषण',
    'issues.filter.search': 'समस्याहरू खोज्नुहोस्...',
    'issues.filter.category': 'वर्ग',
    'issues.filter.status': 'स्थिति',
    'issues.filter.ward': 'वडा',
    'issues.filter.sortBy': 'क्रमबद्ध गर्नुहोस्'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage, default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};