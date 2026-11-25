const searchInput = document.querySelector('#destination-search');
const categoryFilter = document.querySelector('#category-filter');
const municipalityFilter = document.querySelector('#municipality-filter');
const sortFilter = document.querySelector('#sort-filter');
const clearFilters = document.querySelector('#clear-filters');
const searchForm = document.querySelector('#search-form');
const filterToggle = document.querySelector('.filter-toggle');
const filterPanel = document.querySelector('#filter-panel');
const destinationCards = [...document.querySelectorAll('.destination-card')];
const destinationGrid = document.querySelector('#destinations-track');
const destinationCarouselPrevious = document.querySelector('#destinations-scroll-prev');
const destinationCarouselNext = document.querySelector('#destinations-scroll-next');
const originalCardOrder = [...destinationCards];
const resultsMessage = document.querySelector('#results-message');
const categoryCards = document.querySelectorAll('.category-card');
const navigationPage = document.querySelector('#navigation-page');
const navigationOpenButton = document.querySelector('.navigation-menu-toggle');
const navigationBackButton = document.querySelector('.navigation-back');
const pageColumn = document.querySelector('.page-column');
const profileMenuWrap = document.querySelector('.profile-menu-wrap');
const profileMenuButton = document.querySelector('#profile-menu-button');
const navigationProfileWrap = document.querySelector('.navigation-profile-wrap');
const navigationProfileButton = document.querySelector('#navigation-profile-button');
const profilePanel = document.querySelector('#profile-panel');
let activeProfileButton = profileMenuButton;
const themeToggle = document.querySelector('#theme-toggle');
const contrastToggle = document.querySelector('#contrast-toggle');
const fontSizeStatus = document.querySelector('#font-size-status');
const profileFavoritesCount = document.querySelector('#profile-favorites-count');
const favoritesGrid = document.querySelector('#favorites-grid');
const favoritesCount = document.querySelector('#favorites-count');
const favoritesEmpty = document.querySelector('#favorites-empty');
const favoritesCarousel = document.querySelector('#favorites-carousel');
const favoritesViewport = document.querySelector('#favorites-viewport');
const favoritesPrevious = document.querySelector('#favorites-previous');
const favoritesNext = document.querySelector('#favorites-next');
const favoritesPagination = document.querySelector('#favorites-pagination');
const favoriteDialogButton = document.querySelector('#detail-favorite');
const destinationDialog = document.querySelector('#destination-dialog');
const mapDestinationList = document.querySelector('#map-destination-list');
const tourismMap = document.querySelector('#tourism-map');
const mapSelection = document.querySelector('#map-selection');
const routePlannerCard = document.querySelector('.planning-route');
const nearbyCard = document.querySelector('.planning-nearby');
const preparationCard = document.querySelector('.planning-before');
const routePlannerDialog = document.querySelector('#route-planner-dialog');
const routePlannerStops = document.querySelector('#route-planner-stops');
const routePlannerAvailable = document.querySelector('#route-planner-available');
const routePlannerCount = document.querySelector('#route-planner-count');
const routePlannerEmpty = document.querySelector('#route-planner-empty');
const routePlannerStatus = document.querySelector('#route-planner-status');
const openRoutePlannerMap = document.querySelector('#open-route-planner-map');
const preparationDialog = document.querySelector('#preparation-dialog');
const preparationChecklist = document.querySelector('#preparation-checklist');
const preparationStatus = document.querySelector('#preparation-status');
const favoriteStorageKey = 'descubra-ro-favorites';
const itineraryStorageKey = 'descubra-ro-itinerary';
const preparationStorageKey = 'descubra-ro-preparation';
const storyStorageKey = 'descubra-ro-viewed-stories';

const eventCalendarToday = new Date();
let eventCalendarMonth = new Date(eventCalendarToday.getFullYear(), eventCalendarToday.getMonth(), 1);
let selectedEventDate = [
  eventCalendarToday.getFullYear(),
  String(eventCalendarToday.getMonth() + 1).padStart(2, '0'),
  String(eventCalendarToday.getDate()).padStart(2, '0')
].join('-');

function eventDateKey(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

const eventMonth = eventCalendarToday.getMonth();
const eventYear = eventCalendarToday.getFullYear();
const eventLastDay = new Date(eventYear, eventMonth + 1, 0).getDate();
const eventsCatalog = [
  {
    id: 'exemplo-1',
    title: 'Encontro cultural — demonstração',
    date: eventDateKey(eventYear, eventMonth, Math.min(8, eventLastDay)),
    time: 'Exemplo: 10h',
    place: 'Local a confirmar',
    municipality: 'Porto Velho',
    category: 'Cultura',
    description: 'Atividade demonstrativa criada para apresentar o calendário. Os dados deste evento são fictícios e podem ser substituídos por uma agenda real.',
    registrationLink: ''
  },
  {
    id: 'exemplo-2',
    title: 'Passeio guiado — demonstração',
    date: eventDateKey(eventYear, eventMonth, Math.min(18, eventLastDay)),
    time: 'Exemplo: 14h',
    place: 'Ponto de encontro a confirmar',
    municipality: 'Porto Velho',
    category: 'Natureza',
    description: 'Registro demonstrativo de um passeio. Horário, local e programação ainda não foram confirmados.',
    registrationLink: ''
  },
  {
    id: 'exemplo-3',
    title: 'Mostra de artesanato — demonstração',
    date: eventDateKey(eventYear, eventMonth, Math.min(18, eventLastDay)),
    time: 'Exemplo: 16h',
    place: 'Espaço cultural a confirmar',
    municipality: 'Porto Velho',
    category: 'Artesanato',
    description: 'Segundo exemplo para validar a exibição de vários eventos na mesma data. Este registro não corresponde a uma atividade oficial.',
    registrationLink: ''
  },
  {
    id: 'exemplo-4',
    title: 'Roda de conversa — demonstração',
    date: eventDateKey(eventYear, eventMonth, Math.min(24, eventLastDay)),
    time: 'Exemplo: 19h',
    place: 'Local a confirmar',
    municipality: 'Guajará-Mirim',
    category: 'História',
    description: 'Evento demonstrativo preparado para integração do calendário. Substitua esta entrada por um evento confirmado quando houver informações oficiais.',
    registrationLink: ''
  }
];

const eventsCalendarGrid = document.querySelector('#events-calendar-grid');
const eventsMonthLabel = document.querySelector('#events-month-label');
const eventsPrevMonth = document.querySelector('#events-prev-month');
const eventsNextMonth = document.querySelector('#events-next-month');
const eventsViewAll = document.querySelector('#events-view-all');
const eventsCalendarOpen = document.querySelector('#events-calendar-open');
const calendarDialog = document.querySelector('#calendar-dialog');
const eventsDialog = document.querySelector('#events-dialog');
const eventsDialogList = document.querySelector('#events-dialog-list');
const eventsDialogDetail = document.querySelector('#events-dialog-detail');

function eventsForDate(dateKey) {
  return eventsCatalog.filter((eventItem) => eventItem.date === dateKey);
}

function formatEventDate(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function renderEventsCalendar() {
  if (!eventsCalendarGrid || !eventsMonthLabel) return;
  const year = eventCalendarMonth.getFullYear();
  const month = eventCalendarMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  eventsMonthLabel.textContent = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
    year: 'numeric'
  }).format(eventCalendarMonth);

  eventsCalendarGrid.replaceChildren();
  for (let index = 0; index < firstWeekday; index += 1) {
    const empty = document.createElement('span');
    empty.className = 'events-day-empty';
    empty.setAttribute('aria-hidden', 'true');
    eventsCalendarGrid.append(empty);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = eventDateKey(year, month, day);
    const dayEvents = eventsForDate(dateKey);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'events-day';
    button.textContent = String(day);
    button.setAttribute('role', 'gridcell');
    button.setAttribute('aria-label', `${formatEventDate(dateKey)}${dayEvents.length ? `, ${dayEvents.length} evento${dayEvents.length > 1 ? 's' : ''}` : ', sem eventos'}`);
    button.setAttribute('aria-selected', String(dateKey === selectedEventDate));
    if (dayEvents.length) button.classList.add('has-event');
    if (dateKey === selectedEventDate) button.classList.add('is-selected');
    button.addEventListener('click', () => {
      selectedEventDate = dateKey;
      renderEventsCalendar();
    });
    eventsCalendarGrid.append(button);
  }
}

function openEventsDialog(selectedEventId = null) {
  if (!eventsDialog || !eventsDialogList || !eventsDialogDetail) return;
  const sortedEvents = [...eventsCatalog].sort((a, b) => a.date.localeCompare(b.date));
  eventsDialogList.replaceChildren();

  sortedEvents.forEach((eventItem) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'event-list-button';
    button.dataset.eventId = eventItem.id;

    const title = document.createElement('strong');
    title.textContent = eventItem.title;
    const dateTime = document.createElement('small');
    dateTime.textContent = `${formatEventDate(eventItem.date)}${eventItem.time ? ` · ${eventItem.time}` : ''}`;
    const place = document.createElement('small');
    place.textContent = [eventItem.place, eventItem.municipality].filter(Boolean).join(' · ');
    button.append(title, dateTime, place);
    button.addEventListener('click', () => showEventDetail(eventItem.id));
    eventsDialogList.append(button);
  });

  showEventDetail(selectedEventId || sortedEvents[0]?.id);
  if (!eventsDialog.open) eventsDialog.showModal();
}

function showEventDetail(eventId) {
  if (!eventsDialogDetail) return;
  const eventItem = eventsCatalog.find((item) => item.id === eventId);
  if (!eventItem) {
    eventsDialogDetail.textContent = 'Selecione um evento na lista.';
    return;
  }

  eventsDialogList?.querySelectorAll('.event-list-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.eventId === eventId);
  });

  eventsDialogDetail.replaceChildren();
  const title = document.createElement('h3');
  title.textContent = eventItem.title;
  eventsDialogDetail.append(title);

  const fields = [
    ['Data', formatEventDate(eventItem.date)],
    ['Horário', eventItem.time],
    ['Local', eventItem.place],
    ['Município', eventItem.municipality],
    ['Categoria', eventItem.category]
  ];
  fields.forEach(([label, value]) => {
    if (!value) return;
    const row = document.createElement('p');
    const labelNode = document.createElement('strong');
    labelNode.textContent = `${label}: `;
    row.append(labelNode, document.createTextNode(value));
    eventsDialogDetail.append(row);
  });
  if (eventItem.description) {
    const description = document.createElement('p');
    description.textContent = eventItem.description;
    eventsDialogDetail.append(description);
  }
  if (eventItem.registrationLink) {
    const link = document.createElement('a');
    link.className = 'event-inscription';
    link.href = eventItem.registrationLink;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Acessar inscrição';
    eventsDialogDetail.append(link);
  }
}

eventsPrevMonth?.addEventListener('click', () => {
  eventCalendarMonth = new Date(eventCalendarMonth.getFullYear(), eventCalendarMonth.getMonth() - 1, 1);
  renderEventsCalendar();
});

eventsNextMonth?.addEventListener('click', () => {
  eventCalendarMonth = new Date(eventCalendarMonth.getFullYear(), eventCalendarMonth.getMonth() + 1, 1);
  renderEventsCalendar();
});

eventsViewAll?.addEventListener('click', () => openEventsDialog());
eventsCalendarOpen?.addEventListener('click', () => {
  if (calendarDialog && !calendarDialog.open) calendarDialog.showModal();
});
calendarDialog?.addEventListener('click', (event) => {
  if (event.target === calendarDialog) calendarDialog.close();
});
eventsDialog?.addEventListener('click', (event) => {
  if (event.target === eventsDialog) eventsDialog.close();
});

renderEventsCalendar();
const verifiedParkSources = [
  { label: 'SEMA · dados, área e localização', href: 'https://sema.portovelho.ro.gov.br/pagina/parque-natural-raimundo-paraguassu-de-oliveira' },
  { label: 'SEMA · trilhas, atrativos e visitação', href: 'https://sema.portovelho.ro.gov.br/noticias/turismo-ecologico-parque-natural-de-porto-velho-um-refugio-verde-para-curtir-o-fim-de-semana-com-tranquilidade' },
  { label: 'Prefeitura · horários e lazer (26/06/2026)', href: 'https://agencia.portovelho.ro.gov.br/noticias/57386' },
  { label: 'Prefeitura · nova trilha na floresta (19/02/2026)', href: 'https://sema.portovelho.ro.gov.br/noticias/meio-ambiente-trilha-dentro-da-floresta-e-a-nova-atracao-do-parque-natural' }
];
const storyStories = [
  {
    id: 'efmm',
    title: 'Estrada de Ferro Madeira-Mamoré',
    category: 'Patrimônio ferroviário',
    image: 'assets/images/destinos/estrada de ferro.jpg',
    description: 'Construída entre 1907 e 1912, a ferrovia foi planejada para superar trechos de cachoeiras que interrompiam a navegação. O percurso entre Porto Velho e Guajará-Mirim tinha 366 quilômetros.'
  },
  {
    id: 'memorial',
    title: 'Memorial Rondon',
    category: 'Memória e cultura',
    image: 'assets/images/destinos/Memorial Rondon.jpg',
    description: 'O Memorial integra o circuito histórico da região do Madeira-Mamoré, em Porto Velho. O complexo reúne referências à trajetória de Marechal Cândido Rondon e à história regional.'
  },
  {
    id: 'morro',
    title: 'Morro Chico Mendes',
    category: 'Natureza e aventura',
    image: 'assets/images/destinos/Morro Chico Mendes.jpg',
    description: 'Atrativo de Ouro Preto do Oeste citado no roteiro turístico estadual Rota das Águas. O roteiro situa a área a cerca de cinco quilômetros do centro da cidade.'
  },
  {
    id: 'rios-mamore-pacaas',
    title: 'Encontro dos Rios Mamoré e Pacaás',
    category: 'Rios e paisagens',
    image: 'assets/images/destinos/encontro das águas.jpg',
    description: 'Na zona rural de Guajará-Mirim, o rio Mamoré recebe as águas do rio Pacaás Novos. As diferenças de cor e fluxo tornam visível o encontro dos rios.'
  },
  {
    id: 'vale',
    title: 'Vale das Cachoeiras',
    category: 'Natureza e lazer',
    image: 'assets/images/destinos/vale das cachoeiras.jpg',
    description: 'Em Nova União, o atrativo reúne cachoeiras, trilhas e piscinas de água corrente.'
  },
  {
    id: 'mercado',
    title: 'Mercado Cultural',
    category: 'Cultura e patrimônio',
    image: 'assets/images/banner/mercado cultural.jpg',
    description: 'No centro histórico de Porto Velho, o Mercado Cultural integra o circuito turístico da capital. O espaço reúne atividades culturais, artísticas e gastronômicas.'
  },
  {
    id: 'tanks',
    title: 'Três Caixas d’Água',
    category: 'Patrimônio histórico',
    image: "assets/images/banner/3 caixas d'água.jpg",
    description: 'Segundo a SETUR, o sistema foi instalado entre 1910 e 1912 e abasteceu Porto Velho até 1957.'
  },
  {
    id: 'parque-natural',
    title: 'Parque Natural de Porto Velho',
    category: 'Natureza e conservação',
    image: 'assets/images/destinos/parque natural.jpg',
    description: 'O Parque Natural Raimundo Paraguassu de Oliveira protege uma área de floresta amazônica em Porto Velho. Entre os atrativos estão trilhas, uma passarela suspensa na mata, áreas de piquenique e um museu biológico.'
  }
];
const storyViewer = document.querySelector('#story-viewer');
const storyProgress = document.querySelector('#story-progress');
const storyImage = document.querySelector('#story-viewer-image');
const storyTitle = document.querySelector('#story-viewer-title');
const storyCategory = document.querySelector('#story-viewer-category');
const storyText = document.querySelector('#story-viewer-text');
const storiesStrip = document.querySelector('#stories-strip');
let currentStoryIndex = 0;
let storyTimer = 0;
let storyTouchStartX = null;
let viewedStories = new Set();
try {
  const savedStories = JSON.parse(localStorage.getItem(storyStorageKey) || '[]');
  if (Array.isArray(savedStories)) viewedStories = new Set(savedStories);
} catch { viewedStories = new Set(); }
let selectedDestinationId = null;
const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroPaginationButtons = [...document.querySelectorAll('.pagination-button')];
const heroPreviousButton = document.querySelector('.hero-arrow-previous');
const heroNextButton = document.querySelector('.hero-arrow-next');
const hero = document.querySelector('.hero');
let currentHeroSlide = 0;
let heroRotationTimer = 0;
let heroTouchStartX = null;

function showHeroSlide(index) {
  if (!heroSlides.length || heroSlides.length !== heroPaginationButtons.length) return;
  heroSlides[currentHeroSlide].classList.remove('is-active');
  heroPaginationButtons[currentHeroSlide].classList.remove('is-active');
  heroPaginationButtons[currentHeroSlide].setAttribute('aria-pressed', 'false');
  currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides[currentHeroSlide].classList.add('is-active');
  heroPaginationButtons[currentHeroSlide].classList.add('is-active');
  heroPaginationButtons[currentHeroSlide].setAttribute('aria-pressed', 'true');
}

function scheduleHeroRotation() {
  window.clearTimeout(heroRotationTimer);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || hero.matches(':hover') || hero.contains(document.activeElement)) return;
  heroRotationTimer = window.setTimeout(() => {
    showHeroSlide(currentHeroSlide + 1);
    scheduleHeroRotation();
  }, 6500);
}

if (heroSlides.length && heroSlides.length === heroPaginationButtons.length) {
  heroPaginationButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      showHeroSlide(index);
      scheduleHeroRotation();
    });
  });

  heroPreviousButton.addEventListener('click', () => {
    showHeroSlide(currentHeroSlide - 1);
    scheduleHeroRotation();
  });
  heroNextButton.addEventListener('click', () => {
    showHeroSlide(currentHeroSlide + 1);
    scheduleHeroRotation();
  });
  hero.addEventListener('pointerenter', () => window.clearTimeout(heroRotationTimer));
  hero.addEventListener('pointerleave', scheduleHeroRotation);
  hero.addEventListener('focusin', () => window.clearTimeout(heroRotationTimer));
  hero.addEventListener('focusout', scheduleHeroRotation);
  hero.addEventListener('touchstart', (event) => {
    heroTouchStartX = event.changedTouches[0].clientX;
    window.clearTimeout(heroRotationTimer);
  }, { passive: true });
  hero.addEventListener('touchend', (event) => {
    if (heroTouchStartX === null) return;
    const delta = event.changedTouches[0].clientX - heroTouchStartX;
    if (Math.abs(delta) > 48) showHeroSlide(currentHeroSlide + (delta < 0 ? 1 : -1));
    heroTouchStartX = null;
    scheduleHeroRotation();
  }, { passive: true });
  scheduleHeroRotation();
}

function getDestinationId(card) {
  return card.querySelector('h3').textContent
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

destinationCards.forEach((card) => {
  card.dataset.destinationId = getDestinationId(card);
  const favoriteButton = document.createElement('button');
  favoriteButton.className = 'favorite-toggle';
  favoriteButton.type = 'button';
  favoriteButton.setAttribute('aria-pressed', 'false');
  favoriteButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z"/></svg>';
  card.append(favoriteButton);
});

let favorites = new Set();
let favoritesPage = 0;
let favoritesPerPage = 1;
const availableDestinationIds = new Set(destinationCards.map((card) => card.dataset.destinationId));
try {
  const savedFavorites = JSON.parse(localStorage.getItem(favoriteStorageKey) || '[]');
  if (Array.isArray(savedFavorites)) favorites = new Set(savedFavorites.filter((id) => availableDestinationIds.has(id)));
} catch {
  favorites = new Set();
}

let itinerary = [];
try {
  const savedItinerary = JSON.parse(localStorage.getItem(itineraryStorageKey) || '[]');
  if (Array.isArray(savedItinerary)) {
    itinerary = [...new Set(savedItinerary.filter((id) => availableDestinationIds.has(id)))];
  }
} catch {
  itinerary = [];
}

let preparationChecks = new Set();
try {
  const savedPreparation = JSON.parse(localStorage.getItem(preparationStorageKey) || '[]');
  if (Array.isArray(savedPreparation)) preparationChecks = new Set(savedPreparation);
} catch {
  preparationChecks = new Set();
}

function saveFavorites() {
  try {
    localStorage.setItem(favoriteStorageKey, JSON.stringify([...favorites]));
  } catch {
    favoritesEmpty.textContent = 'Não foi possível salvar favoritos neste navegador.';
  }
}

function getFavoritesPageCount() {
  return Math.max(1, Math.ceil(favoritesGrid.children.length / favoritesPerPage));
}

function setFavoritesPage(page) {
  const pageCount = getFavoritesPageCount();
  favoritesPage = Math.max(0, Math.min(page, pageCount - 1));
  favoritesPrevious.disabled = favoritesPage === 0;
  favoritesNext.disabled = favoritesPage >= pageCount - 1;
  [...favoritesPagination.children].forEach((button, index) => {
    if (index === favoritesPage) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
}

function scrollFavoritesToPage(page, behavior = 'smooth') {
  const pageCount = getFavoritesPageCount();
  favoritesPage = Math.max(0, Math.min(page, pageCount - 1));
  const maxScroll = Math.max(0, favoritesViewport.scrollWidth - favoritesViewport.clientWidth);
  const left = Math.min(favoritesPage * favoritesViewport.clientWidth, maxScroll);
  const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : behavior;
  favoritesViewport.scrollTo({ left, behavior: scrollBehavior });
  setFavoritesPage(favoritesPage);
}

function syncFavoritesCarousel() {
  if (!favoritesGrid.children.length) return;
  const pageWidth = Math.max(1, favoritesViewport.clientWidth);
  setFavoritesPage(Math.round(favoritesViewport.scrollLeft / pageWidth));
}

function updateFavoritesCarousel() {
  const firstCard = favoritesGrid.firstElementChild;
  if (!firstCard) {
    favoritesPage = 0;
    favoritesPerPage = 1;
    favoritesPagination.replaceChildren();
    return;
  }

  const gap = Number.parseFloat(getComputedStyle(favoritesGrid).gap) || 0;
  const cardWidth = firstCard.getBoundingClientRect().width;
  favoritesPerPage = Math.max(1, Math.floor((favoritesViewport.clientWidth + gap) / (cardWidth + gap)));
  const pageCount = getFavoritesPageCount();
  favoritesPage = Math.min(favoritesPage, pageCount - 1);
  favoritesPagination.replaceChildren(...Array.from({ length: pageCount }, (_, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Exibir página ${index + 1} de ${pageCount}`);
    button.addEventListener('click', () => scrollFavoritesToPage(index));
    return button;
  }));
  scrollFavoritesToPage(favoritesPage, 'auto');
}

function renderFavorites() {
  const favoriteCards = destinationCards.filter((card) => favorites.has(card.dataset.destinationId));
  destinationCards.forEach((card) => {
    const isFavorite = favorites.has(card.dataset.destinationId);
    const button = card.querySelector('.favorite-toggle');
    button.setAttribute('aria-pressed', String(isFavorite));
    button.setAttribute('aria-label', isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
  });
  favoritesGrid.replaceChildren(...favoriteCards.map((card) => {
    const copy = card.cloneNode(true);
    copy.hidden = false;
    return copy;
  }));
  favoritesCarousel.hidden = favoriteCards.length === 0;
  updateFavoritesCarousel();
  favoritesCount.textContent = `(${favoriteCards.length})`;
  profileFavoritesCount.textContent = String(favoriteCards.length);
  favoritesEmpty.hidden = favoriteCards.length > 0;
  favoriteDialogButton.setAttribute('aria-pressed', String(selectedDestinationId && favorites.has(selectedDestinationId)));
  if (selectedDestinationId) {
    favoriteDialogButton.textContent = favorites.has(selectedDestinationId) ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
  }
}

const preferenceStorage = {
  theme: 'descubra-ro-theme',
  fontSize: 'descubra-ro-font-size',
  contrast: 'descubra-ro-high-contrast'
};

function readPreference(key, fallback = '') {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}

function savePreference(key, value) {
  try { localStorage.setItem(key, value); } catch { /* Mantém a preferência durante a sessão atual. */ }
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  if (isDark) document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  themeToggle.setAttribute('aria-checked', String(isDark));
  document.querySelector('meta[name="theme-color"]').content = isDark ? '#101916' : '#0c3f3d';
}

function applyFontSize(size) {
  if (size === 'small' || size === 'large') document.documentElement.dataset.fontSize = size;
  else delete document.documentElement.dataset.fontSize;
  document.querySelectorAll('[data-font-size]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.fontSize === size));
  });
  fontSizeStatus.textContent = size === 'small' ? 'Pequena' : size === 'large' ? 'Ampliada' : 'Padrão';
}

function applyContrast(enabled) {
  if (enabled) document.documentElement.dataset.highContrast = 'true';
  else delete document.documentElement.dataset.highContrast;
  contrastToggle.setAttribute('aria-checked', String(enabled));
}

applyTheme(readPreference(preferenceStorage.theme));
applyFontSize(readPreference(preferenceStorage.fontSize, 'normal'));
applyContrast(readPreference(preferenceStorage.contrast) === 'true');

function closeProfilePanel({ restoreFocus = false } = {}) {
  if (profilePanel.hidden) return;
  profilePanel.hidden = true;
  profileMenuButton.setAttribute('aria-expanded', 'false');
  navigationProfileButton.setAttribute('aria-expanded', 'false');
  const returnFocusTo = activeProfileButton;
  if (activeProfileButton === navigationProfileButton) profileMenuWrap.append(profilePanel);
  activeProfileButton = profileMenuButton;
  if (restoreFocus) returnFocusTo.focus();
}

function toggleProfilePanel(trigger) {
  if (!profilePanel.hidden && activeProfileButton === trigger) {
    closeProfilePanel();
    return;
  }
  if (!profilePanel.hidden) closeProfilePanel();
  if (trigger === navigationProfileButton) navigationProfileWrap.append(profilePanel);
  activeProfileButton = trigger;
  profilePanel.hidden = false;
  profileMenuButton.setAttribute('aria-expanded', String(trigger === profileMenuButton));
  navigationProfileButton.setAttribute('aria-expanded', String(trigger === navigationProfileButton));
}

profileMenuButton.addEventListener('click', () => {
  toggleProfilePanel(profileMenuButton);
});
navigationProfileButton.addEventListener('click', () => toggleProfilePanel(navigationProfileButton));

themeToggle.addEventListener('click', () => {
  const nextTheme = themeToggle.getAttribute('aria-checked') === 'true' ? 'light' : 'dark';
  applyTheme(nextTheme);
  savePreference(preferenceStorage.theme, nextTheme);
});

contrastToggle.addEventListener('click', () => {
  const enabled = contrastToggle.getAttribute('aria-checked') !== 'true';
  applyContrast(enabled);
  savePreference(preferenceStorage.contrast, String(enabled));
});

document.querySelectorAll('[data-font-size]').forEach((button) => {
  button.addEventListener('click', () => {
    applyFontSize(button.dataset.fontSize);
    savePreference(preferenceStorage.fontSize, button.dataset.fontSize);
  });
});

document.addEventListener('click', (event) => {
  const activeWrap = activeProfileButton === navigationProfileButton ? navigationProfileWrap : profileMenuWrap;
  if (!profilePanel.hidden && !activeWrap.contains(event.target)) closeProfilePanel();
});

document.querySelector('#profile-favorites-link').addEventListener('click', () => {
  const navigationWasOpen = !navigationPage.hidden;
  closeProfilePanel();
  if (navigationWasOpen) closeNavigationPage({ restoreScroll: false, restoreFocus: false });
});

function toggleFavorite(destinationId) {
  if (favorites.has(destinationId)) favorites.delete(destinationId);
  else favorites.add(destinationId);
  saveFavorites();
  renderFavorites();
}

function openDestinationDetails(card) {
  const title = card.querySelector('h3').textContent;
  const image = card.querySelector('.destination-image-link img');
  const municipality = card.querySelector('.destination-location').textContent.replace(/,\s*RO$/, '');
  selectedDestinationId = card.dataset.destinationId;
  document.querySelector('#detail-title').textContent = title;
  document.querySelector('#detail-category').textContent = card.dataset.category === 'natureza' ? 'NATUREZA' : 'CULTURA E HISTÓRIA';
  document.querySelector('#detail-location').textContent = municipality;
  document.querySelector('#detail-access').textContent = card.dataset.access || 'Informação não cadastrada.';
  document.querySelector('#detail-hours').textContent = card.dataset.hours || 'Não há horário confirmado cadastrado.';
  document.querySelector('#detail-gallery').textContent = card.dataset.gallery || 'Não há outras imagens cadastradas.';
  document.querySelector('#detail-description').textContent = card.dataset.description || 'Descrição detalhada ainda não cadastrada.';
  const detailHighlight = document.querySelector('#detail-highlight');
  detailHighlight.textContent = card.dataset.highlight || '';
  detailHighlight.hidden = !card.dataset.highlight;
  const detailImage = document.querySelector('#detail-image');
  detailImage.src = image.src;
  detailImage.alt = image.alt;
  document.querySelector('#detail-route').href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title}, ${municipality}, Rondônia`)}`;
  renderFavorites();
  const mapQuery = card.dataset.mapQuery;
  if (mapQuery) {
    document.querySelector('#detail-route').href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  }
  const detailSourceList = document.querySelector('#detail-source-links');
  const detailSources = card.dataset.destinationId === 'parque-natural-de-porto-velho' ? verifiedParkSources : [];
  detailSourceList.replaceChildren(...detailSources.map(({ label, href }) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    item.append(link);
    return item;
  }));
  document.querySelector('#detail-sources').hidden = detailSources.length === 0;
  destinationDialog.showModal();
}

function renderStory() {
  const story = storyStories[currentStoryIndex];
  storyTitle.textContent = story.title;
  storyCategory.textContent = story.category;
  storyText.textContent = story.description;
  storyImage.src = story.image;
  storyImage.alt = story.title;
  storyProgress.replaceChildren(...storyStories.map((_, index) => {
    const track = document.createElement('span');
    track.className = 'story-progress-track';
    const fill = document.createElement('span');
    fill.className = 'story-progress-fill';
    if (index < currentStoryIndex) fill.classList.add('is-complete');
    if (index === currentStoryIndex) fill.classList.add('is-current');
    track.append(fill);
    return track;
  }));
  document.querySelectorAll('.story-card').forEach((card) => {
    card.classList.toggle('is-viewed', viewedStories.has(card.dataset.storyId));
  });
  window.clearTimeout(storyTimer);
  storyTimer = window.setTimeout(advanceStory, 6500);
}

function openStory(storyId) {
  currentStoryIndex = Math.max(0, storyStories.findIndex((story) => story.id === storyId));
  if (!storyViewer.open) storyViewer.showModal();
  renderStory();
}

function advanceStory() {
  const story = storyStories[currentStoryIndex];
  viewedStories.add(story.id);
  try { localStorage.setItem(storyStorageKey, JSON.stringify([...viewedStories])); } catch { /* stories remain usable without storage */ }
  currentStoryIndex = (currentStoryIndex + 1) % storyStories.length;
  renderStory();
}

function goToPreviousStory() {
  currentStoryIndex = (currentStoryIndex - 1 + storyStories.length) % storyStories.length;
  renderStory();
}

document.querySelectorAll('.story-card').forEach((card) => card.addEventListener('click', () => openStory(card.dataset.storyId)));
document.querySelector('#story-next').addEventListener('click', advanceStory);
document.querySelector('#story-previous').addEventListener('click', goToPreviousStory);
document.querySelector('#story-close').addEventListener('click', () => storyViewer.close());
storyViewer.addEventListener('close', () => window.clearTimeout(storyTimer));
storyViewer.addEventListener('click', (event) => { if (event.target === storyViewer) storyViewer.close(); });
storyViewer.addEventListener('touchstart', (event) => { storyTouchStartX = event.changedTouches[0].clientX; }, { passive: true });
storyViewer.addEventListener('touchend', (event) => {
  if (storyTouchStartX === null) return;
  const distance = event.changedTouches[0].clientX - storyTouchStartX;
  if (Math.abs(distance) > 45) distance < 0 ? advanceStory() : goToPreviousStory();
  storyTouchStartX = null;
}, { passive: true });
document.addEventListener('keydown', (event) => {
  if (!storyViewer.open) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); advanceStory(); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); goToPreviousStory(); }
});

function selectMapDestination(card, zoom = 12) {
  const title = card.querySelector('h3').textContent;
  const municipality = card.querySelector('.destination-location').textContent.replace(/,\s*RO$/, '');
  const search = `${title}, ${municipality}, Rondônia`;
  const coordinates = card.dataset.mapCoordinates;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(search)}`;
  tourismMap.src = `https://maps.google.com/maps?q=${encodeURIComponent(coordinates || search)}&z=${zoom}&output=embed`;
  mapSelection.replaceChildren();
  const image = document.createElement('img');
  image.src = card.querySelector('.destination-image-link img').src;
  image.alt = `Foto de ${title}`;
  const copy = document.createElement('div');
  copy.className = 'map-selection-copy';
  const name = document.createElement('strong');
  name.textContent = title;
  const city = document.createElement('span');
  city.textContent = municipality;
  copy.append(name, city);
  const detailButton = document.createElement('button');
  detailButton.className = 'map-detail-button';
  detailButton.type = 'button';
  detailButton.dataset.destinationId = card.dataset.destinationId;
  detailButton.textContent = 'Detalhes';
  const link = document.createElement('a');
  link.href = mapsUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Ver rota';
  mapSelection.append(image, copy, detailButton, link);
  mapDestinationList.querySelectorAll('.map-destination-button').forEach((button) => {
    const isCurrent = button.dataset.destinationId === card.dataset.destinationId;
    button.classList.toggle('is-selected', isCurrent);
    button.setAttribute('aria-pressed', String(isCurrent));
  });
}

destinationCards.forEach((card) => {
  const mapButton = document.createElement('button');
  mapButton.className = 'map-destination-button';
  mapButton.type = 'button';
  mapButton.dataset.destinationId = card.dataset.destinationId;
  mapButton.textContent = `${card.querySelector('h3').textContent} · ${card.querySelector('.destination-location').textContent.replace(/,\s*RO$/, '')}`;
  mapDestinationList.append(mapButton);
});

function persistItinerary() {
  try {
    localStorage.setItem(itineraryStorageKey, JSON.stringify(itinerary));
    routePlannerStatus.textContent = 'Roteiro salvo neste navegador.';
    return true;
  } catch {
    routePlannerStatus.textContent = 'Não foi possível salvar o roteiro neste navegador.';
    return false;
  }
}

function createPlannerButton(label, action, destinationId, disabled = false) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'planner-stop-control';
  button.dataset.itineraryAction = action;
  button.dataset.destinationId = destinationId;
  button.disabled = disabled;
  button.setAttribute('aria-label', label);
  button.textContent = action === 'remove' ? '×' : action === 'up' ? '↑' : '↓';
  return button;
}

function getRouteUrl(cards) {
  const placeName = (card) => `${card.querySelector('h3').textContent}, ${card.querySelector('.destination-location').textContent.replace(', RO', '')}, Rondônia`;
  const params = new URLSearchParams({ api: '1', origin: placeName(cards[0]), destination: placeName(cards[cards.length - 1]) });
  if (cards.length > 2) params.set('waypoints', cards.slice(1, -1).map(placeName).join('|'));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function renderItinerary() {
  const selectedCards = itinerary.map((id) => destinationCards.find((card) => card.dataset.destinationId === id)).filter(Boolean);
  routePlannerCount.textContent = `(${selectedCards.length})`;
  routePlannerEmpty.hidden = selectedCards.length >= 2;
  routePlannerEmpty.textContent = selectedCards.length < 2
    ? 'Adicione pelo menos dois destinos para montar uma rota.'
    : '';
  routePlannerStops.replaceChildren(...selectedCards.map((card, index) => {
    const item = document.createElement('li');
    item.className = 'planner-stop';
    const number = document.createElement('span');
    number.className = 'planner-stop-number';
    number.textContent = String(index + 1);
    const copy = document.createElement('span');
    copy.className = 'planner-stop-copy';
    const title = document.createElement('strong');
    title.textContent = card.querySelector('h3').textContent;
    const municipality = document.createElement('small');
    municipality.textContent = card.querySelector('.destination-location').textContent.replace(', RO', '');
    copy.append(title, municipality);
    const controls = document.createElement('span');
    controls.className = 'planner-stop-controls';
    controls.append(
      createPlannerButton(`Mover ${title.textContent} para cima`, 'up', card.dataset.destinationId, index === 0),
      createPlannerButton(`Mover ${title.textContent} para baixo`, 'down', card.dataset.destinationId, index === selectedCards.length - 1),
      createPlannerButton(`Remover ${title.textContent} do roteiro`, 'remove', card.dataset.destinationId)
    );
    item.append(number, copy, controls);
    return item;
  }));
  routePlannerAvailable.replaceChildren(...destinationCards
    .filter((card) => !itinerary.includes(card.dataset.destinationId))
    .map((card) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'planner-available-item';
      button.dataset.destinationId = card.dataset.destinationId;
      const title = document.createElement('strong');
      title.textContent = card.querySelector('h3').textContent;
      const municipality = document.createElement('small');
      municipality.textContent = card.querySelector('.destination-location').textContent.replace(', RO', '');
      const action = document.createElement('span');
      action.textContent = 'Adicionar +';
      button.append(title, municipality, action);
      return button;
    }));
  const canOpenRoute = selectedCards.length >= 2;
  openRoutePlannerMap.href = canOpenRoute ? getRouteUrl(selectedCards) : '#mapa-touristico';
  openRoutePlannerMap.setAttribute('aria-disabled', String(!canOpenRoute));
  openRoutePlannerMap.classList.toggle('is-disabled', !canOpenRoute);
}

function renderPreparationChecklist() {
  preparationChecklist.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = preparationChecks.has(checkbox.value);
  });
}

function savePreparationChecklist() {
  try {
    localStorage.setItem(preparationStorageKey, JSON.stringify([...preparationChecks]));
    preparationStatus.textContent = 'Lista atualizada neste navegador.';
  } catch {
    preparationStatus.textContent = 'Não foi possível salvar a lista neste navegador.';
  }
}

routePlannerCard.addEventListener('click', (event) => {
  event.preventDefault();
  renderItinerary();
  routePlannerDialog.showModal();
});

routePlannerAvailable.addEventListener('click', (event) => {
  const button = event.target.closest('.planner-available-item');
  if (!button || itinerary.includes(button.dataset.destinationId)) return;
  itinerary.push(button.dataset.destinationId);
  persistItinerary();
  renderItinerary();
});

routePlannerStops.addEventListener('click', (event) => {
  const button = event.target.closest('[data-itinerary-action]');
  if (!button) return;
  const index = itinerary.indexOf(button.dataset.destinationId);
  if (index < 0) return;
  const action = button.dataset.itineraryAction;
  if (action === 'remove') itinerary.splice(index, 1);
  if (action === 'up' && index > 0) [itinerary[index - 1], itinerary[index]] = [itinerary[index], itinerary[index - 1]];
  if (action === 'down' && index < itinerary.length - 1) [itinerary[index + 1], itinerary[index]] = [itinerary[index], itinerary[index + 1]];
  persistItinerary();
  renderItinerary();
});

document.querySelector('#save-route-planner').addEventListener('click', persistItinerary);
document.querySelector('#clear-route-planner').addEventListener('click', () => {
  itinerary = [];
  persistItinerary();
  renderItinerary();
});

openRoutePlannerMap.addEventListener('click', (event) => {
  if (openRoutePlannerMap.getAttribute('aria-disabled') === 'true') event.preventDefault();
});

nearbyCard.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  filterPanel.hidden = false;
  filterToggle.setAttribute('aria-expanded', 'true');
  document.querySelector('#search-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
  municipalityFilter.focus({ preventScroll: true });
});

preparationCard.addEventListener('click', (event) => {
  event.preventDefault();
  renderPreparationChecklist();
  preparationDialog.showModal();
});

preparationChecklist.addEventListener('change', (event) => {
  const checkbox = event.target.closest('input[type="checkbox"]');
  if (!checkbox) return;
  if (checkbox.checked) preparationChecks.add(checkbox.value);
  else preparationChecks.delete(checkbox.value);
  savePreparationChecklist();
});

document.querySelector('#reset-preparation').addEventListener('click', () => {
  preparationChecks.clear();
  savePreparationChecklist();
  renderPreparationChecklist();
});
document.querySelector('#preparation-map-link').addEventListener('click', () => preparationDialog.close());

document.addEventListener('click', (event) => {
  const favoriteButton = event.target.closest('.favorite-toggle');
  if (favoriteButton) {
    toggleFavorite(favoriteButton.closest('.destination-card').dataset.destinationId);
    return;
  }

  const imageLink = event.target.closest('.destination-image-link');
  if (imageLink) {
    event.preventDefault();
    openDestinationDetails(imageLink.closest('.destination-card'));
    return;
  }

  const mapButton = event.target.closest('.map-destination-button');
  if (mapButton) {
    const destination = destinationCards.find((card) => card.dataset.destinationId === mapButton.dataset.destinationId);
    if (destination) selectMapDestination(destination);
    return;
  }

  const mapDetailButton = event.target.closest('.map-detail-button');
  if (mapDetailButton) {
    const destination = destinationCards.find((card) => card.dataset.destinationId === mapDetailButton.dataset.destinationId);
    if (destination) openDestinationDetails(destination);
  }
});

favoriteDialogButton.addEventListener('click', () => toggleFavorite(selectedDestinationId));
document.querySelector('#clear-favorites').addEventListener('click', () => {
  favorites.clear();
  saveFavorites();
  renderFavorites();
});

favoritesPrevious.addEventListener('click', () => scrollFavoritesToPage(favoritesPage - 1));
favoritesNext.addEventListener('click', () => scrollFavoritesToPage(favoritesPage + 1));
favoritesViewport.addEventListener('scroll', syncFavoritesCarousel, { passive: true });
window.addEventListener('resize', updateFavoritesCarousel);

renderFavorites();
if (destinationCards.length) selectMapDestination(destinationCards[0], 7);

function updateDestinationCarouselControls() {
  const maxScroll = destinationGrid.scrollWidth - destinationGrid.clientWidth;
  const hasScrollableCards = maxScroll > 1 && destinationCards.some((card) => !card.hidden);
  destinationCarouselPrevious.disabled = !hasScrollableCards || destinationGrid.scrollLeft <= 1;
  destinationCarouselNext.disabled = !hasScrollableCards || maxScroll - destinationGrid.scrollLeft <= 1;
}

function updateDestinationCarouselLayout() {
  const trackWidth = destinationGrid.clientWidth;
  if (!trackWidth) return;

  const gap = Number.parseFloat(getComputedStyle(destinationGrid).gap) || 0;
  const minimumCardWidth = 230;
  const visibleCount = Math.max(1, Math.min(4, Math.floor((trackWidth + gap) / (minimumCardWidth + gap))));
  const cardWidth = (trackWidth - gap * (visibleCount - 1)) / visibleCount;

  destinationGrid.dataset.visibleCount = String(visibleCount);
  destinationGrid.style.setProperty('--destination-card-width', `${cardWidth}px`);
}

function scrollDestinationCarousel(direction) {
  const cards = [...destinationGrid.querySelectorAll('.destination-card:not([hidden])')];
  if (!cards.length) return;

  const gap = Number.parseFloat(getComputedStyle(destinationGrid).gap) || 0;
  const visibleCount = Number.parseInt(destinationGrid.dataset.visibleCount, 10) || 1;
  const stride = cards[0].getBoundingClientRect().width + gap;
  const lastStartIndex = Math.max(0, cards.length - visibleCount);
  const currentStartIndex = Math.min(lastStartIndex, Math.round(destinationGrid.scrollLeft / stride));
  const targetIndex = Math.max(0, Math.min(lastStartIndex, currentStartIndex + direction * visibleCount));
  if (targetIndex === currentStartIndex) return;

  const trackLeft = destinationGrid.getBoundingClientRect().left;
  const targetLeft = destinationGrid.scrollLeft + cards[targetIndex].getBoundingClientRect().left - trackLeft;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  destinationGrid.scrollTo({ left: targetLeft, behavior: reduceMotion ? 'auto' : 'smooth' });
}

destinationCarouselPrevious.addEventListener('click', () => scrollDestinationCarousel(-1));
destinationCarouselNext.addEventListener('click', () => scrollDestinationCarousel(1));
destinationGrid.addEventListener('scroll', updateDestinationCarouselControls, { passive: true });
updateDestinationCarouselLayout();
updateDestinationCarouselControls();

if ('ResizeObserver' in window) {
  const destinationCarouselObserver = new ResizeObserver(() => {
    updateDestinationCarouselLayout();
    updateDestinationCarouselControls();
  });
  destinationCarouselObserver.observe(destinationGrid);
}

function filterDestinations() {
  const normalize = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
  const query = normalize(searchInput.value.trim());
  const category = categoryFilter.value;
  const municipality = municipalityFilter.value;
  let visibleCount = 0;

  destinationCards.forEach((card) => {
    const city = normalize(card.querySelector('.destination-location').textContent);
    const cityKey = city.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const matchesText = normalize(`${card.dataset.search} ${city}`).includes(query);
    const matchesCategory = category === 'todos' || card.dataset.category === category;
    const matchesMunicipality = municipality === 'todos' || cityKey.includes(municipality);
    const isVisible = matchesText && matchesCategory && matchesMunicipality;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  const sortedCards = [...originalCardOrder];
  if (sortFilter.value === 'alphabetical') {
    sortedCards.sort((first, second) => first.querySelector('h3').textContent.localeCompare(second.querySelector('h3').textContent, 'pt-BR'));
  }
  sortedCards.forEach((card) => destinationGrid.append(card));
  destinationGrid.scrollTo({ left: 0, behavior: 'auto' });
  updateDestinationCarouselControls();

  resultsMessage.textContent = visibleCount === 0
    ? 'Nenhum destino encontrado. Tente outro termo ou categoria.'
    : query || category !== 'todos' || municipality !== 'todos' || sortFilter.value !== 'original'
      ? `${visibleCount} ${visibleCount === 1 ? 'destino encontrado' : 'destinos encontrados'}.`
      : '';
}

searchInput.addEventListener('input', filterDestinations);
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  filterDestinations();
  destinationGrid.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
categoryFilter.addEventListener('change', filterDestinations);
municipalityFilter.addEventListener('change', filterDestinations);
sortFilter.addEventListener('change', filterDestinations);

clearFilters.addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = 'todos';
  municipalityFilter.value = 'todos';
  sortFilter.value = 'original';
  filterDestinations();
  searchInput.focus();
});

categoryCards.forEach((card) => {
  card.addEventListener('click', () => {
    categoryFilter.value = card.dataset.searchCategory;
    filterDestinations();
  });
});

filterToggle.addEventListener('click', () => {
  const isExpanded = filterToggle.getAttribute('aria-expanded') === 'true';
  filterToggle.setAttribute('aria-expanded', String(!isExpanded));
  filterPanel.hidden = isExpanded;
  if (!isExpanded) categoryFilter.focus();
});

let navigationPreviousScrollY = 0;
let navigationPreviousFocus = null;
let pageOverflowBeforeNavigation = '';

function openNavigationPage() {
  if (!navigationPage.hidden) return;
  navigationPreviousScrollY = window.scrollY;
  navigationPreviousFocus = document.activeElement;
  pageOverflowBeforeNavigation = document.documentElement.style.overflow;
  navigationPage.hidden = false;
  navigationPage.setAttribute('aria-hidden', 'false');
  pageColumn.inert = true;
  pageColumn.setAttribute('aria-hidden', 'true');
  document.documentElement.style.overflow = 'hidden';
  navigationOpenButton.setAttribute('aria-expanded', 'true');
  navigationOpenButton.setAttribute('aria-label', 'Fechar navegação');
  navigationBackButton.focus();
}

function closeNavigationPage({ restoreScroll = true, restoreFocus = true } = {}) {
  if (navigationPage.hidden) return;
  navigationPage.hidden = true;
  navigationPage.setAttribute('aria-hidden', 'true');
  pageColumn.inert = false;
  pageColumn.removeAttribute('aria-hidden');
  document.documentElement.style.overflow = pageOverflowBeforeNavigation;
  navigationOpenButton.setAttribute('aria-expanded', 'false');
  navigationOpenButton.setAttribute('aria-label', 'Abrir navegação');
  if (restoreFocus) {
    requestAnimationFrame(() => {
      navigationPreviousFocus?.focus({ preventScroll: true });
      if (restoreScroll) document.scrollingElement.scrollTop = navigationPreviousScrollY;
    });
  } else if (restoreScroll) {
    document.scrollingElement.scrollTop = navigationPreviousScrollY;
  }
}

navigationOpenButton.addEventListener('click', openNavigationPage);
navigationBackButton.addEventListener('click', () => closeNavigationPage());

navigationPage.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetHash = link.getAttribute('href');
    const targetSection = document.querySelector(targetHash);
    const navigationCategory = link.dataset.navigationCategory;
    closeNavigationPage({ restoreScroll: false, restoreFocus: false });

    if (navigationCategory === 'eventos') {
      categoryFilter.value = 'cultura';
      filterDestinations();
    }

    if (!targetSection) return;
    if (window.location.hash !== targetHash) history.pushState(null, '', targetHash);
    requestAnimationFrame(() => {
      targetSection.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    });
  });
});

document.addEventListener('click', (event) => {
  if (!filterPanel.hidden && !event.target.closest('.search-form')) {
    filterPanel.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
  }

});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !profilePanel.hidden) {
    closeProfilePanel({ restoreFocus: true });
    return;
  }

  if (event.key === 'Escape' && !filterPanel.hidden) {
    filterPanel.hidden = true;
    filterToggle.setAttribute('aria-expanded', 'false');
    filterToggle.focus();
  }

  if (event.key === 'Escape' && !navigationPage.hidden) {
    closeNavigationPage();
  }
});

window.addEventListener('resize', () => {
  updateDestinationCarouselLayout();
  updateDestinationCarouselControls();
});
