enum Paths {
  // Login
  LOGIN = '/login',
  SIGN_IN = '/sign-in',
  RESET_PASSWORD = '/reset-password',
  ADD_USER = '/add-user',
  JOIN = '/join',

  // Admin Dashboard
  ADMIN_DASHBOARD = '/admin-dashboard',
  ADMIN_DASHBOARD_LA_MANAGE = '/admin-dashboard/la-manage',
  ADMIN_DASHBOARD_LA_VIEW = '/admin-dashboard/la-view',
  ADMIN_DASHBOARD_REQUESTS = '/admin-dashboard/requests',
  ADMIN_DASHBOARD_REQUESTS_SCHOOL = '/admin-dashboard/requests-school',
  ADMIN_DASHBOARD_REQUESTS_CHARITY = '/admin-dashboard/requests-charity',
  ADMIN_DASHBOARD_MANAGE_SCHOOLS = '/admin-dashboard/manage-schools',
  ADMIN_DASHBOARD_MANAGE_CHARITIES = '/admin-dashboard/manage-charities',
  ADMIN_DASHBOARD_SIGN_UP = '/admin-dashboard/la-sign-up',
  ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION = '/admin-dashboard/la-sign-up-confirmation',
  DELETE_CONFIRMATION = '/admin-dashboard/requests/delete',

  // Local Authority Dashboard
  LOCAL_AUTHORITY_DASHBOARD = '/local-authority-dashboard',
  LOCAL_AUTHORITY_DASHBOARD_SCHOOLS = '/local-authority-dashboard/schools',
  LOCAL_AUTHORITY_DASHBOARD_CHARITIES = '/local-authority-dashboard/charities',

  // Admin School
  SCHOOLS_CREATE_EDIT_PROFILE = '/schools-create-edit-profile',
  SCHOOL_EDIT = '/school-edit',

  // Admin Charity
  CHARITIES_CREATE_EDIT_PROFILE = '/charities-create-edit-profile',

  // Public School
  SCHOOLS_DASHBOARD = '/school/dashboard',
  SCHOOLS_DASHBOARD_ITEMS = '/school/dashboard/items',
  SCHOOLS_DASHBOARD_ITEMS_CONFIRMATION = '/school/dashboard/items/confirmation',
  REQUEST_SCHOOL_PRODUCTS = '/request-school-products',
  SIGN_UP_SCHOOL = '/sign-up-school',

  // Public Charity
  CHARITY_DASHBOARD = '/charity/dashboard',
  CHARITY_DASHBOARD_ITEMS = '/charity/dashboard/items',
  CHARITY_DASHBOARD_ITEMS_CONFIRMATION = '/charity/dashboard/items/confirmation',
  REQUEST_CHARITY_PRODUCTS = '/request-charity-products',
  SIGN_UP_CHARITY = '/sign-up-charity',

  // Local Area
  FIND_YOUR_COMMUNITY = '/find-your-community',
  YOUR_LOCAL_AREA = '/your-local-area',
  LOCAL_SCHOOLS = '/your-local-area/schools',
  LOCAL_CHARITIES = '/your-local-area/charities',
  LOCAL_DONATE = '/your-local-area/donate',

  // Misc
  ALL = '*',
  PRIVACY_POLICY = '/privacy-policy',
  TERMS_AND_CONDITIONS = '/terms-and-conditions',
  ACCESSABILITY_STATEMENT = '/accessibility-statement',
  ABOUT = '/about-us',
  HOW_IT_WORKS = '/how-it-works',
  CONTACT = '/contact',
  HOME = '/',
  LOCAL_AUTHORITY_JOIN_INFO = '/local-authority-join-info',
  COOKIE_POLICY = '/cookie-policy',

  // Links, telephone numbers and email addresses
  WE_HAVE_THE_POWER = 'https://wehavethepower.org/',
  EQUALITY_SERVICES = 'https://www.equalityadvisoryservice.com/',
  EMAIL = 'mailto: team@donatetoeducate.org.uk',
  PHONE = 'tel: 0134 271 8679',
  PTA = 'https://www.pta.co.uk/',
  FUNDED = 'https://www.funded.org.uk',
  INVENT = 'https://www.capgemini.com/about-us/who-we-are/our-brands/capgemini-invent/',
}

export default Paths;
