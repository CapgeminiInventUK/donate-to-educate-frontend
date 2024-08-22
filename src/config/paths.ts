enum Paths {
  // Login
  LOGIN = '/login',
  SIGN_IN = '/sign-in',
  RESET_PASSWORD = '/reset-password',
  ADD_USER = '/add-user',
  JOIN = '/join',

  // Admin Dashboard
  ADMIN_DASHBOARD = '/admin',
  ADMIN_DASHBOARD_LA_MANAGE = '/admin/manage-local-authority',
  ADMIN_DASHBOARD_LA_VIEW = '/admin/view-local-authority',
  ADMIN_DASHBOARD_LA_VIEW_USERS = '/admin/view-local-authority-users',
  ADMIN_DASHBOARD_REQUESTS = '/admin/requests',
  ADMIN_DASHBOARD_REQUESTS_SCHOOL = '/admin/school-requests',
  ADMIN_DASHBOARD_REQUESTS_CHARITY = '/admin/charity-requests',
  ADMIN_DASHBOARD_MANAGE_SCHOOLS = '/admin/manage-schools',
  ADMIN_DASHBOARD_MANAGE_CHARITIES = '/admin/manage-charities',
  ADMIN_DASHBOARD_SIGN_UP = '/admin/local-authority-sign-up',
  ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION = '/admin/local-authority-confirmation',
  DELETE_CONFIRMATION = '/admin/requests/deleted',

  // Local Authority Dashboard
  LOCAL_AUTHORITY_DASHBOARD = '/local-authority',
  LOCAL_AUTHORITY_DASHBOARD_SCHOOLS = '/local-authority/schools',
  LOCAL_AUTHORITY_DASHBOARD_CHARITIES = '/local-authority/charities',

  // Admin School
  SCHOOLS_CREATE_EDIT_PROFILE = '/school-admin-create-profile',
  SCHOOL_EDIT = '/school-admin-edit',
  SCHOOL_VIEW = '/school-admin-view',

  // Admin Charity
  CHARITIES_CREATE_EDIT_PROFILE = '/charity-admin-create-profile',
  CHARITIES_EDIT = '/charities-admin-edit',
  CHARITIES_VIEW = '/charities-admin-view',

  // Public School
  SCHOOLS_DASHBOARD = '/school',
  SCHOOLS_DASHBOARD_ITEMS = '/school/items',
  SCHOOLS_DASHBOARD_ITEMS_CONFIRMATION = '/school/items/confirmation',
  REQUEST_SCHOOL_PRODUCTS = '/request-school-products',
  SIGN_UP_SCHOOL = '/school-sign-up',

  // Public Charity
  CHARITY_DASHBOARD = '/charity',
  CHARITY_DASHBOARD_ITEMS = '/charity/items',
  CHARITY_DASHBOARD_ITEMS_CONFIRMATION = '/charity/items/confirmation',
  REQUEST_CHARITY_PRODUCTS = '/request-charity-products',
  SIGN_UP_CHARITY = '/charity-sign-up',

  // Local Area
  FIND_YOUR_COMMUNITY = '/find-your-community',
  YOUR_LOCAL_AREA = '/your-local-area',
  LOCAL_SCHOOLS = '/your-local-area/schools',
  LOCAL_CHARITIES = '/your-local-area/charities',
  LOCAL_DONATE = '/your-local-area/donate',
  LOCAL_EXCESS = '/your-local-area/excess-stock',

  // Misc
  ALL = '*',
  PRIVACY_POLICY = '/privacy-policy',
  TERMS_AND_CONDITIONS = '/terms-conditions',
  ACCESSIBILITY_STATEMENT = '/accessibility',
  ABOUT = '/about',
  HOW_IT_WORKS = '/how-it-works',
  CONTACT = '/contact',
  HOME = '/',
  LOCAL_AUTHORITY_JOIN_INFO = '/local-authority-joining-information',
  COOKIE_POLICY = '/cookie-policy',
  SETTINGS = '/settings',

  // Links, telephone numbers and email addresses
  WE_HAVE_THE_POWER = 'https://wehavethepower.org/',
  EQUALITY_SERVICES = 'https://www.equalityadvisoryservice.com/',
  EMAIL = 'mailto: team@donatetoeducate.org.uk',
  COMMUNITY_EMAIL = 'mailto: info@communityinspired.co.uk',
  PHONE = 'tel: 0134 271 8679',
  PTA = 'https://www.pta.co.uk/',
  FUNDED = 'https://www.funded.org.uk',
  INVENT = 'https://www.capgemini.com/about-us/who-we-are/our-brands/capgemini-invent/',
}

export default Paths;
