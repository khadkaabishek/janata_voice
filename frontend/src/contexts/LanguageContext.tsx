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
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.help': 'Help',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // App Info
    'app.title': 'Janata Voice',
    'app.subtitle': 'Kathmandu Metropolitan City',
    'app.description': 'Empowering citizens through technology',
    'app.slogan': 'Your Voice, Our Community',
    
    // Common Words
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
    
    // Buttons
    'button.reportIssue': 'Report an Issue',
    'button.viewIssues': 'View Issues',
    'button.signOut': 'Sign Out',
    'button.createAccount': 'Create an Account',
    'button.learnMore': 'Learn More',
    'button.contactUs': 'Contact Us',
    'button.getStarted': 'Get Started',
    'button.readMore': 'Read More',
    'button.downloadApp': 'Download App',
    'button.shareIssue': 'Share Issue',
    'button.upvote': 'Upvote',
    'button.follow': 'Follow',
    'button.report': 'Report',
    'button.comment': 'Comment',
    
    // Homepage
    'home.hero.title': 'Your Voice Matters in Kathmandu',
    'home.hero.subtitle': 'Empowering citizens through technology to report issues, track progress, and build a better community together.',
    'home.stats.totalIssues': 'Total Issues',
    'home.stats.resolved': 'Resolved',
    'home.stats.pending': 'Pending',
    'home.stats.inProgress': 'In Progress',
    'home.stats.topWard': 'Top Ward',
    'home.stats.lastUpdated': 'Last Updated',
    'home.stats.activeUsers': 'Active Users',
    'home.stats.resolutionRate': 'Resolution Rate',
    'home.stats.acrossAllWards': 'Across all wards',
    'home.stats.issuesSuccessfullyAddressed': 'Issues successfully addressed',
    'home.stats.dataRefreshesHourly': 'Data refreshes hourly',
    'home.stats.wardNumber': 'Ward',
    'home.stats.resolutionRatePercent': 'resolution rate',
    'home.howItWorks.title': 'How Janata Voice Works',
    'home.howItWorks.subtitle': 'Our platform simplifies the process of reporting issues to your municipality and tracking their resolution.',
    'home.features.title': 'Platform Features',
    'home.features.subtitle': 'Everything you need to make your voice heard',
    'home.testimonials.title': 'What Citizens Say',
    'home.testimonials.subtitle': 'Real stories from real people',
    'home.cta.title': 'Ready to make a difference in your community?',
    'home.cta.subtitle': 'Join thousands of citizens who are working together to improve Kathmandu Metropolitan City.',
    
    // How It Works Steps
    'home.steps.report.title': '1. Report',
    'home.steps.report.description': 'Submit your issue with details and photos. Specify the location and category for faster processing.',
    'home.steps.track.title': '2. Track',
    'home.steps.track.description': 'Follow the status of your report through our dashboard. Get notifications as progress is made.',
    'home.steps.resolve.title': '3. Resolve',
    'home.steps.resolve.description': 'Municipal authorities address the issue and mark it as resolved once completed.',
    
    // Issues
    'issues.all': 'All Issues',
    'issues.ward': 'Ward Issues',
    'issues.critical': 'Critical Issues',
    'issues.myReports': 'My Reports',
    'issues.mapView': 'Map View',
    'issues.listView': 'List View',
    'issues.discussion': 'Discussion',
    'issues.analytics': 'Analytics',
    'issues.trending': 'Trending Issues',
    'issues.recent': 'Recent Issues',
    'issues.resolved': 'Resolved Issues',
    'issues.filter.search': 'Search issues...',
    'issues.filter.category': 'Category',
    'issues.filter.status': 'Status',
    'issues.filter.ward': 'Ward',
    'issues.filter.sortBy': 'Sort By',
    'issues.filter.dateRange': 'Date Range',
    'issues.filter.priority': 'Priority',
    
    // Categories
    'category.infrastructure': 'Infrastructure',
    'category.sanitation': 'Sanitation',
    'category.roads': 'Roads',
    'category.water': 'Water Supply',
    'category.electricity': 'Electricity',
    'category.traffic': 'Traffic',
    'category.environment': 'Environment',
    'category.health': 'Health',
    'category.education': 'Education',
    'category.security': 'Security',
    'category.other': 'Other',
    
    // Status
    'status.pending': 'Pending',
    'status.underReview': 'Under Review',
    'status.inProgress': 'In Progress',
    'status.resolved': 'Resolved',
    'status.rejected': 'Rejected',
    'status.duplicate': 'Duplicate',
    
    // Priority
    'priority.low': 'Low',
    'priority.medium': 'Medium',
    'priority.high': 'High',
    'priority.critical': 'Critical',
    'priority.emergency': 'Emergency',
    
    // Time
    'time.now': 'Now',
    'time.minutes': 'minutes ago',
    'time.hours': 'hours ago',
    'time.days': 'days ago',
    'time.weeks': 'weeks ago',
    'time.months': 'months ago',
    'time.years': 'years ago',
    'time.today': 'Today',
    'time.yesterday': 'Yesterday',
    'time.thisWeek': 'This Week',
    'time.lastWeek': 'Last Week',
    'time.thisMonth': 'This Month',
    'time.lastMonth': 'Last Month',
    
    // Footer
    'footer.about.title': 'About Janata Voice',
    'footer.about.description': 'Empowering citizens to report issues and collaborate with municipal authorities for better communities.',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.address': 'Kathmandu Metropolitan City',
    'footer.office': 'City Hall, Bagdarbar',
    'footer.city': 'Kathmandu, Nepal',
    'footer.rights': '© 2025 Janata Voice. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.support': 'Support',
    'footer.socialMedia': 'Follow Us',
    
    // Authentication
    'auth.login.title': 'Sign in to your account',
    'auth.login.subtitle': 'Access your dashboard to report and track issues in your community',
    'auth.register.title': 'Create your account',
    'auth.register.subtitle': 'Join the community and start reporting issues in your ward',
    'auth.verification.title': 'Verify as Local Resident',
    'auth.verification.subtitle': 'Complete your verification to get full access to local features',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.rememberMe': 'Remember Me',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    
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
    'form.phoneNumber': 'Phone Number',
    'form.dateOfBirth': 'Date of Birth',
    'form.gender': 'Gender',
    'form.occupation': 'Occupation',
    'form.issueTitle': 'Issue Title',
    'form.issueDescription': 'Issue Description',
    'form.location': 'Location',
    'form.attachments': 'Attachments',
    'form.category': 'Category',
    'form.priority': 'Priority',
    
    // Validation Messages
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email address',
    'validation.password': 'Password must be at least 8 characters',
    'validation.confirmPassword': 'Passwords do not match',
    'validation.ward': 'Please select a valid ward number',
    'validation.phone': 'Please enter a valid phone number',
    'validation.citizenship': 'Please enter a valid citizenship number',
    
    // Success Messages
    'success.login': 'Successfully logged in',
    'success.register': 'Account created successfully',
    'success.issueReported': 'Issue reported successfully',
    'success.profileUpdated': 'Profile updated successfully',
    'success.passwordChanged': 'Password changed successfully',
    
    // Error Messages
    'error.login': 'Invalid email or password',
    'error.register': 'Registration failed. Please try again.',
    'error.network': 'Network error. Please check your connection.',
    'error.serverError': 'Server error. Please try again later.',
    'error.unauthorized': 'You are not authorized to perform this action',
    'error.notFound': 'Page not found',
    'error.fileUpload': 'File upload failed',
    'error.fileSizeLimit': 'File size exceeds the limit',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Overview',
    'dashboard.myIssues': 'My Issues',
    'dashboard.statistics': 'Statistics',
    'dashboard.notifications': 'Notifications',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.quickActions': 'Quick Actions',

  //Issue Page Translations
  'issues.dashboard': 'Issues Dashboard',
  'issues.noIssuesFound': 'No issues found',
  'issues.tryAdjustingFilters': 'Try adjusting your filters or search criteria.',
  'issues.mapView.description': 'Interactive map showing issue locations would be displayed here. Each marker would represent an issue, colored by status.',
  'button.hideFilters': 'Hide Filters',
  'button.showFilters': 'Show Filters',
  'button.listView': 'List View',
  'button.mapView': 'Map View',
  'button.gridView': 'Grid View',

  // Form Placeholders for login
  'form.emailPlaceholder': 'your.email@example.com',
  'form.passwordPlaceholder': '••••••••',
  'button.hidePassword': 'Hide password',
  'button.showPassword': 'Show password',
  'button.signIn': 'Sign in',
  'button.registerNow': 'Register now',

  // Register Form Placeholders
  'form.fullNamePlaceholder': 'Your Name',
  'form.addressPlaceholder': 'Your full address',
  'form.passwordRequirement': 'Password must be at least 8 characters long',
  'auth.agreeToTerms.prefix': 'I agree to the',
  'auth.agreeToTerms.and': 'and'
  },
  
  np: {
    // Navigation
    'nav.home': 'गृह',
    'nav.issues': 'समस्याहरू',
    'nav.discussion': 'छलफल',
    'nav.analytics': 'विश्लेषण',
    'nav.login': 'लगइन',
    'nav.register': 'दर्ता',
    'nav.dashboard': 'ड्यासबोर्ड',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिङहरू',
    'nav.help': 'सहायता',
    'nav.about': 'बारेमा',
    'nav.contact': 'सम्पर्क',
    
    // App Info
    'app.title': 'जनता आवाज',
    'app.subtitle': 'काठमाडौं महानगरपालिका',
    'app.description': 'प्रविधि मार्फत नागरिकहरूलाई सशक्तिकरण',
    'app.slogan': 'तपाईंको आवाज, हाम्रो समुदाय',
    
    // Common Words
    'common.yes': 'हो',
    'common.no': 'होइन',
    'common.ok': 'ठिक छ',
    'common.cancel': 'रद्द गर्नुहोस्',
    'common.save': 'सेभ गर्नुहोस्',
    'common.delete': 'मेटाउनुहोस्',
    'common.edit': 'सम्पादन गर्नुहोस्',
    'common.view': 'हेर्नुहोस्',
    'common.close': 'बन्द गर्नुहोस्',
    'common.back': 'पछाडि',
    'common.next': 'अगाडि',
    'common.previous': 'पहिले',
    'common.submit': 'पेश गर्नुहोस्',
    'common.search': 'खोज्नुहोस्',
    'common.filter': 'फिल्टर',
    'common.loading': 'लोड हुँदै...',
    'common.error': 'त्रुटि',
    'common.success': 'सफल',
    'common.warning': 'चेतावनी',
    'common.info': 'जानकारी',
    
    // Buttons
    'button.reportIssue': 'समस्या दर्ता गर्नुहोस्',
    'button.viewIssues': 'समस्याहरू हेर्नुहोस्',
    'button.signOut': 'साइन आउट',
    'button.createAccount': 'खाता खोल्नुहोस्',
    'button.learnMore': 'थप जान्नुहोस्',
    'button.contactUs': 'सम्पर्क गर्नुहोस्',
    'button.getStarted': 'सुरु गर्नुहोस्',
    'button.readMore': 'थप पढ्नुहोस्',
    'button.downloadApp': 'एप डाउनलोड गर्नुहोस्',
    'button.shareIssue': 'समस्या साझा गर्नुहोस्',
    'button.upvote': 'अपभोट',
    'button.follow': 'फलो गर्नुहोस्',
    'button.report': 'रिपोर्ट गर्नुहोस्',
    'button.comment': 'टिप्पणी',
    
    // Homepage
    'home.hero.title': 'काठमाडौंमा तपाईंको आवाज महत्वपूर्ण छ',
    'home.hero.subtitle': 'नागरिकहरूलाई प्रविधि मार्फत समस्या रिपोर्ट गर्न, प्रगति ट्र्याक गर्न र राम्रो समुदाय निर्माण गर्न सशक्त बनाउँदै।',
    'home.stats.totalIssues': 'कुल समस्याहरू',
    'home.stats.resolved': 'समाधान भएका',
    'home.stats.pending': 'पेन्डिङ',
    'home.stats.inProgress': 'प्रगतिमा',
    'home.stats.topWard': 'उत्कृष्ट वडा',
    'home.stats.lastUpdated': 'अन्तिम अपडेट',
    'home.stats.activeUsers': 'सक्रिय प्रयोगकर्ताहरू',
    'home.stats.resolutionRate': 'समाधान दर',
    'home.stats.acrossAllWards': 'सबै वडाहरूमा',
    'home.stats.issuesSuccessfullyAddressed': 'सफलतापूर्वक समाधान भएका समस्याहरू',
    'home.stats.dataRefreshesHourly': 'डेटा प्रत्येक घण्टा रिफ्रेस हुन्छ',
    'home.stats.wardNumber': 'वडा',
    'home.stats.resolutionRatePercent': 'समाधान दर',
    'home.howItWorks.title': 'जनता आवाज कसरी काम गर्छ',
    'home.howItWorks.subtitle': 'हाम्रो प्लेटफर्मले नगरपालिकामा समस्याहरू रिपोर्ट गर्ने र समाधानको ट्र्याक गर्ने प्रक्रियालाई सरल बनाउँछ।',
    'home.features.title': 'प्लेटफर्म सुविधाहरू',
    'home.features.subtitle': 'तपाईंको आवाज सुनाउन आवश्यक सबै कुरा',
    'home.testimonials.title': 'नागरिकहरूले के भन्छन्',
    'home.testimonials.subtitle': 'वास्तविक मानिसहरूका वास्तविक कथाहरू',
    'home.cta.title': 'तपाईंको समुदायमा परिवर्तन ल्याउन तयार हुनुहुन्छ?',
    'home.cta.subtitle': 'काठमाडौं महानगरपालिकालाई सुधार गर्न हजारौं नागरिकहरूसँग सामेल हुनुहोस्।',
    
    // How It Works Steps
    'home.steps.report.title': '१. रिपोर्ट गर्नुहोस्',
    'home.steps.report.description': 'विवरण र तस्बिरहरूसहित आफ्नो समस्या पेश गर्नुहोस्। छिटो प्रक्रियाका लागि स्थान र वर्ग निर्दिष्ट गर्नुहोस्।',
    'home.steps.track.title': '२. ट्र्याक गर्नुहोस्',
    'home.steps.track.description': 'हाम्रो ड्यासबोर्ड मार्फत आफ्नो रिपोर्टको स्थिति फलो गर्नुहोस्। प्रगति भएपछि सूचनाहरू प्राप्त गर्नुहोस्।',
    'home.steps.resolve.title': '३. समाधान गर्नुहोस्',
    'home.steps.resolve.description': 'नगरपालिका अधिकारीहरूले समस्यालाई सम्बोधन गर्छन् र पूरा भएपछि समाधान भएको रूपमा चिन्ह लगाउँछन्।',
    
    // Issues
    'issues.all': 'सबै समस्याहरू',
    'issues.ward': 'वडा समस्याहरू',
    'issues.critical': 'महत्वपूर्ण समस्याहरू',
    'issues.myReports': 'मेरा रिपोर्टहरू',
    'issues.mapView': 'नक्सा दृश्य',
    'issues.listView': 'सूची दृश्य',
    'issues.discussion': 'छलफल',
    'issues.analytics': 'विश्लेषण',
    'issues.trending': 'ट्रेन्डिङ समस्याहरू',
    'issues.recent': 'हालका समस्याहरू',
    'issues.resolved': 'समाधान भएका समस्याहरू',
    'issues.filter.search': 'समस्याहरू खोज्नुहोस्...',
    'issues.filter.category': 'वर्ग',
    'issues.filter.status': 'स्थिति',
    'issues.filter.ward': 'वडा',
    'issues.filter.sortBy': 'क्रमबद्ध गर्नुहोस्',
    'issues.filter.dateRange': 'मिति दायरा',
    'issues.filter.priority': 'प्राथमिकता',
    
    // Categories
    'category.infrastructure': 'पूर्वाधार',
    'category.sanitation': 'सरसफाई',
    'category.roads': 'सडकहरू',
    'category.water': 'पानी आपूर्ति',
    'category.electricity': 'बिजुली',
    'category.traffic': 'यातायात',
    'category.environment': 'वातावरण',
    'category.health': 'स्वास्थ्य',
    'category.education': 'शिक्षा',
    'category.security': 'सुरक्षा',
    'category.other': 'अन्य',
    
    // Status
    'status.pending': 'पेन्डिङ',
    'status.underReview': 'समीक्षामा',
    'status.inProgress': 'प्रगतिमा',
    'status.resolved': 'समाधान भएको',
    'status.rejected': 'अस्वीकृत',
    'status.duplicate': 'डुप्लिकेट',
    
    // Priority
    'priority.low': 'कम',
    'priority.medium': 'मध्यम',
    'priority.high': 'उच्च',
    'priority.critical': 'महत्वपूर्ण',
    'priority.emergency': 'आपतकालीन',
    
    // Time
    'time.now': 'अहिले',
    'time.minutes': 'मिनेट अघि',
    'time.hours': 'घण्टा अघि',
    'time.days': 'दिन अघि',
    'time.weeks': 'हप्ता अघि',
    'time.months': 'महिना अघि',
    'time.years': 'वर्ष अघि',
    'time.today': 'आज',
    'time.yesterday': 'हिजो',
    'time.thisWeek': 'यो हप्ता',
    'time.lastWeek': 'गत हप्ता',
    'time.thisMonth': 'यो महिना',
    'time.lastMonth': 'गत महिना',
    
    // Footer
    'footer.about.title': 'जनता आवाज बारे',
    'footer.about.description': 'राम्रो समुदायका लागि नागरिकहरूलाई समस्या रिपोर्ट गर्न र नगरपालिका अधिकारीहरूसँग सहकार्य गर्न सशक्त बनाउँदै।',
    'footer.quickLinks': 'द्रुत लिंकहरू',
    'footer.contact': 'सम्पर्क',
    'footer.address': 'काठमाडौं महानगरपालिका',
    'footer.office': 'सिटी हल, बागदरबार',
    'footer.city': 'काठमाडौं, नेपाल',
    'footer.rights': '© २०२५ जनता आवाज। सर्वाधिकार सुरक्षित।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवाका सर्तहरू',
    'footer.support': 'सहायता',
    'footer.socialMedia': 'हामीलाई फलो गर्नुहोस्',
    
    // Authentication
    'auth.login.title': 'आफ्नो खातामा साइन इन गर्नुहोस्',
    'auth.login.subtitle': 'आफ्नो समुदायमा समस्याहरू रिपोर्ट र ट्र्याक गर्न ड्यासबोर्डमा पहुँच प्राप्त गर्नुहोस्',
    'auth.register.title': 'आफ्नो खाता सिर्जना गर्नुहोस्',
    'auth.register.subtitle': 'समुदायमा सामेल हुनुहोस् र आफ्नो वडामा समस्याहरू रिपोर्ट गर्न सुरु गर्नुहोस्',
    'auth.verification.title': 'स्थानीय निवासीको रूपमा प्रमाणित गर्नुहोस्',
    'auth.verification.subtitle': 'स्थानीय सुविधाहरूमा पूर्ण पहुँच प्राप्त गर्न आफ्नो प्रमाणीकरण पूरा गर्नुहोस्',
    'auth.forgotPassword': 'पासवर्ड बिर्सनुभयो?',
    'auth.rememberMe': 'मलाई सम्झनुहोस्',
    'auth.alreadyHaveAccount': 'पहिले देखि नै खाता छ?',
    'auth.dontHaveAccount': 'खाता छैन?',
    
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
    'form.phoneNumber': 'फोन नम्बर',
    'form.dateOfBirth': 'जन्म मिति',
    'form.gender': 'लिङ्ग',
    'form.occupation': 'पेशा',
    'form.issueTitle': 'समस्याको शीर्षक',
    'form.issueDescription': 'समस्याको विवरण',
    'form.location': 'स्थान',
    'form.attachments': 'संलग्नकहरू',
    'form.category': 'वर्ग',
    'form.priority': 'प्राथमिकता',
    
    // Validation Messages
    'validation.required': 'यो फिल्ड आवश्यक छ',
    'validation.email': 'कृपया मान्य इमेल ठेगाना प्रविष्ट गर्नुहोस्',
    'validation.password': 'पासवर्ड कम्तीमा ८ अक्षरको हुनुपर्छ',
    'validation.confirmPassword': 'पासवर्डहरू मेल खाँदैनन्',
    'validation.ward': 'कृपया मान्य वडा नम्बर छान्नुहोस्',
    'validation.phone': 'कृपया मान्य फोन नम्बर प्रविष्ट गर्नुहोस्',
    'validation.citizenship': 'कृपया मान्य नागरिकता नम्बर प्रविष्ट गर्नुहोस्',
    
    // Success Messages
    'success.login': 'सफलतापूर्वक लगइन भयो',
    'success.register': 'खाता सफलतापूर्वक सिर्जना भयो',
    'success.issueReported': 'समस्या सफलतापूर्वक रिपोर्ट भयो',
    'success.profileUpdated': 'प्रोफाइल सफलतापूर्वक अपडेट भयो',
    'success.passwordChanged': 'पासवर्ड सफलतापूर्वक परिवर्तन भयो',
    
    // Error Messages
    'error.login': 'गलत इमेल वा पासवर्ड',
    'error.register': 'दर्ता असफल। कृपया पुनः प्रयास गर्नुहोस्।',
    'error.network': 'नेटवर्क त्रुटि। कृपया आफ्नो जडान जाँच गर्नुहोस्।',
    'error.serverError': 'सर्भर त्रुटि। कृपया पछि पुनः प्रयास गर्नुहोस्।',
    'error.unauthorized': 'तपाईंलाई यो कार्य गर्न अधिकार छैन',
    'error.notFound': 'पृष्ठ फेला परेन',
    'error.fileUpload': 'फाइल अपलोड असफल',
    'error.fileSizeLimit': 'फाइलको साइज सीमा भन्दा बढी छ',
    
    // Dashboard
    'dashboard.welcome': 'फिर्ता स्वागत छ',
    'dashboard.overview': 'सिंहावलोकन',
    'dashboard.myIssues': 'मेरा समस्याहरू',
    'dashboard.statistics': 'तथ्याङ्कहरू',
    'dashboard.notifications': 'सूचनाहरू',
    'dashboard.recentActivity': 'हालैका गतिविधिहरू',
    'dashboard.quickActions': 'द्रुत कार्यहरू',

    //Issue Page Translations
    'issues.dashboard': 'समस्या ड्यासबोर्ड',
    'issues.noIssuesFound': 'कुनै समस्या फेला परेन',
    'issues.tryAdjustingFilters': 'आफ्नो फिल्टर वा खोज मापदण्ड समायोजन गर्ने प्रयास गर्नुहोस्।',
    'issues.mapView.description': 'समस्या स्थानहरू देखाउने अन्तरक्रियात्मक नक्सा यहाँ प्रदर्शित हुनेछ। प्रत्येक मार्करले एक समस्यालाई प्रतिनिधित्व गर्नेछ, स्थितिद्वारा रंगीन।',
    'button.hideFilters': 'फिल्टरहरू लुकाउनुहोस्',
    'button.showFilters': 'फिल्टरहरू देखाउनुहोस्',
    'button.listView': 'सूची दृश्य',
    'button.mapView': 'नक्सा दृश्य',
    'button.gridView': 'ग्रिड दृश्य',

    // Form Placeholders for login
    'form.emailPlaceholder': 'तपाईंको.इमेल@उदाहरण.com',
    'form.passwordPlaceholder': '••••••••',
    'button.hidePassword': 'पासवर्ड लुकाउनुहोस्',
    'button.showPassword': 'पासवर्ड देखाउनुहोस्',
    'button.signIn': 'साइन इन गर्नुहोस्',
    'button.registerNow': 'दर्ता गर्नुहोस्',

    // Register Form Placeholders
    'form.fullNamePlaceholder': 'तपाईंको नाम',
    'form.addressPlaceholder': 'तपाईंको पूरा ठेगाना',
    'form.passwordRequirement': 'पासवर्ड कम्तीमा ८ अक्षरको हुनुपर्छ',
    'auth.agreeToTerms.prefix': 'म सहमत छु',
    'auth.agreeToTerms.and': 'र',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
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
