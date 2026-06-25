import type { Locale } from "@/providers/AppProviders";

export type L10n = { en: string; fr: string };

export function t(obj: L10n, locale: Locale): string {
  return obj[locale];
}

const L = (en: string, fr: string): L10n => ({ en, fr });

export const v2Nav = {
  birthdays: L("Birthdays", "Anniversaires"),
  groupsPricing: L("Groups & Events", "Groupes & événements"),
  mobileEvents: L("Mobile Events", "Événements mobiles"),
  faq: L("F.A.Q.", "F.A.Q."),
  contactUs: L("Contact Us", "Contactez-nous"),
  events: L("Events", "Événements"),
  bookNow: L("Book Now", "Réserver"),
};

export const v2Home = {
  hero: {
    headline: L("STEP IN. BECOME THE GAME.", "ENTREZ. DEVENEZ LE JEU."),
    sub: L(
      "An interactive LED floor experience where movement, teamwork, technology, and play come together.",
      "Une expérience de plancher LED interactif où mouvement, équipe, technologie et jeu se rencontrent.",
    ),
    support: L(
      "Run, jump, react, compete, and play together on our giant interactive LED floor.",
      "Courez, sautez, réagissez, rivalisez et jouez ensemble sur notre plancher LED interactif géant.",
    ),
    pills: [
      L("Physical Activity", "Activité physique"),
      L("Group Entertainment", "Divertissement de groupe"),
      L("Private Sessions", "Séances privées"),
      L("LaSalle, QC", "LaSalle, QC"),
    ],
    ctaBirthdays: L("Explore Birthday Parties", "Explorer les fêtes d’anniversaire"),
    ctaGroups: L("View Groups & Events", "Voir groupes & événements"),
  },
  glance: [
    { icon: "users", title: L("30", "30"), sub: L("Max players", "Joueurs max") },
    { icon: "trophy", title: L("3", "3"), sub: L("Game categories", "Catégories de jeu") },
    { icon: "lock", title: L("Private", "Privé"), sub: L("Sessions", "Séances") },
    { icon: "gamepad", title: L("🎮", "🎮"), sub: L("Interactive gameplay", "Jeu interactif") },
    { icon: "guide", title: L("🧑‍🏫", "🧑‍🏫"), sub: L("Staff guided", "Encadré") },
    { icon: "target", title: L("Ages 7+", "7 ans et +"), sub: L("Recommended", "Recommandé") },
  ],
  whatIs: {
    title: L("Your Own Interactive Playground", "Votre terrain de jeu interactif"),
    body: L(
      "JeuLumi combines physical activity, teamwork, strategy, and technology to create engaging experiences that get people moving, thinking, and having fun together. Our game hosts guide participants through cooperative, competitive, and strategy-based challenges.",
      "JeuLumi combine activité physique, travail d’équipe, stratégie et technologie pour des expériences engageantes. Nos animateurs guident les participants dans des défis coopératifs, compétitifs et stratégiques.",
    ),
    features: [
      { icon: "run", title: L("🏃 Active Play", "🏃 Jeu actif"), sub: L("Stay moving through fast-paced challenges.", "Défis rapides qui vous font bouger.") },
      { icon: "coop", title: L("🤝 Cooperative Challenges", "🤝 Défis coopératifs"), sub: L("Work together to complete objectives and progress through levels.", "Objectifs en équipe pour progresser.") },
      { icon: "vs", title: L("🏆 Competitive Games", "🏆 Jeux compétitifs"), sub: L("Race, react, and compete against each other.", "Courez, réagissez et rivalisez.") },
      { icon: "brain", title: L("🧠 Memory & Strategy", "🧠 Mémoire & stratégie"), sub: L("Test observation, recall, decision-making, and adaptability.", "Observation, mémoire et adaptation.") },
      { icon: "social", title: L("👨‍👩‍👧‍👦 Social Fun", "👨‍👩‍👧‍👦 Plaisir social"), sub: L("Designed to bring people together through play.", "Pour jouer ensemble.") },
      { icon: "gamepad", title: L("🎮 Interactive Gameplay", "🎮 Jeu interactif"), sub: L("Lights, movement, and reactive challenges on the LED floor.", "Lumières, mouvement et défis réactifs sur le plancher LED.") },
      { icon: "guide", title: L("🧑‍🏫 Staff Guided", "🧑‍🏫 Encadré"), sub: L("Our hosts guide every session and keep the fun going.", "Nos animateurs guident chaque séance et maintiennent l'énergie.") },
    ],
    cta: L("Learn More", "En savoir plus"),
  },
  howWorks: {
    title: L("Simple To Learn. Fun To Master.", "Simple à apprendre. Amusant à maîtriser."),
    body: L(
      "Step onto the illuminated grid and let the game guide you. Every challenge uses movement, colours, and timing.",
      "Entrez sur la grille illuminée. Chaque défi utilise mouvement, couleurs et timing.",
    ),
    steps: [
      { color: "cyan", icon: "move", title: L("Move", "Bouger"), sub: L("Cross the floor as tiles light up.", "Les dalles s’illuminent sous vos pas.") },
      { color: "blue", icon: "rules", title: L("Follow The Rules", "Suivre les règles"), sub: L("Colours guide scoring and safety.", "Les couleurs guident le score.") },
      { color: "yellow", icon: "bolt", title: L("React", "Réagir"), sub: L("Patterns change — stay sharp.", "Les motifs changent — restez alertes.") },
      { color: "purple", icon: "brain", title: L("Adapt", "S’adapter"), sub: L("Adjust strategy per game mode.", "Stratégie selon le mode.") },
      { color: "pink", icon: "trophy", title: L("Progress", "Progresser"), sub: L("Levels keep it dynamic.", "Niveaux dynamiques.") },
    ],
    cta: L("See Game Modes", "Voir les modes"),
  },
  gameModes: {
    title: L("Game Modes", "Modes de jeu"),
    modes: [
      {
        id: "quest",
        name: L("LumiQuest", "LumiQuest"),
        tag: L("Cooperative Adventure", "Aventure coopérative"),
        desc: L("Teamwork carries you to the next level.", "L’équipe vous mène au niveau suivant."),
        icon: "coop",
      },
      {
        id: "vs",
        name: L("LumiVS", "LumiVS"),
        tag: L("Competitive Challenges", "Défis compétitifs"),
        desc: L("Fast-paced competitive challenges.", "Compétition rapide et intense."),
        icon: "trophy",
      },
      {
        id: "logik",
        name: L("LumiLogik", "LumiLogik"),
        tag: L("Memory & Strategy", "Mémoire & stratégie"),
        desc: L("Memory, reaction, and strategy games.", "Mémoire, réaction et stratégie."),
        icon: "brain",
      },
    ],
    cta: L("Learn More", "En savoir plus"),
  },
  experiences: {
    title: L("Experiences For Every Group", "Expériences pour tous les groupes"),
    body: L(
      "Whether you're celebrating a birthday, planning a group outing, or bringing the team together — we are ready for your event.",
      "Anniversaire, sortie de groupe ou activité d'équipe — nous sommes prêts pour votre événement.",
    ),
    birthday: {
      title: L("Birthday Parties That Get Kids Moving", "Des fêtes qui font bouger les enfants"),
      sub: L("Celebrate with an interactive experience everyone joins.", "Une fête interactive pour tous."),
      cta: L("Explore Birthday Parties", "Explorer les anniversaires"),
    },
    groups: {
      title: L("Groups & Events", "Groupes & événements"),
      perfectFor: [
        L(
          "Perfect for families, schools, sports teams, camps, corporate teams, and community organizations.",
          "Parfait pour familles, écoles, équipes sportives, camps, entreprises et groupes communautaires.",
        ),
        L("Flexible pricing based on group size", "Tarifs flexibles selon la taille du groupe"),
        L("Starting at $21 per participant", "Dès 21 $ par participant"),
      ],
      pricing: [
        L("2–30 participants", "2–30 participants"),
        L("Private sessions available", "Séances privées disponibles"),
        L("60–75 minute sessions", "Séances 60–75 min"),
      ],
      cta: L("View Groups & Events →", "Voir groupes & événements →"),
    },
    mobile: {
      title: L("Bringing the Game to You", "Le jeu vient à vous"),
      sub: L("Schools, camps, community centres, festivals, private events.", "Écoles, camps, centres communautaires, festivals."),
      badge: L("Coming Soon", "Bientôt"),
      ctaLearn: L("Learn More", "En savoir plus"),
      ctaWaitlist: L("Join Waitlist", "Liste d’attente"),
    },
  },
  reviews: {
    title: L("What Players Say", "Ce que disent les joueurs"),
    cta: L("Read Reviews", "Lire les avis"),
  },
  finalCta: {
    title: L("Ready To Play?", "Prêt à jouer ?"),
    sub: L("Book your private session today.", "Réservez votre séance privée aujourd’hui."),
    cta: L("Book Now", "Réserver"),
  },
};

export const v2Birthdays = {
  hero: {
    title: L("Birthday Parties That Get Kids Moving", "Des fêtes qui font bouger les enfants"),
    sub: L("Private. Active. Memorable.", "Privé. Actif. Mémorable."),
    body: L(
      "Run, jump, react, and play together on our giant interactive LED floor. Staff-guided games, exciting challenges, and a dedicated celebration space.",
      "Courez, sautez et jouez sur notre plancher LED. Jeux encadrés, défis et espace de fête dédié.",
    ),
    ctaPlan: L("Plan a Birthday Party", "Planifier une fête"),
    ctaBook: L("Book Now", "Réserver"),
    ctaCheck: L("Check Availability", "Vérifier disponibilité"),
  },
  why: {
    title: L("Why Choose jeuLumi?", "Pourquoi jeuLumi ?"),
    items: [
      { icon: "gamepad", title: L("Interactive Games", "Jeux interactifs"), sub: L("Lights, movement, teamwork.", "Lumières, mouvement, équipe.") },
      { icon: "run", title: L("Active Play", "Jeu actif"), sub: L("Kids stay engaged and moving.", "Les enfants bougent.") },
      { icon: "party", title: L("Celebrate Together", "Fête ensemble"), sub: L("Time for cake and gifts.", "Gâteau et cadeaux.") },
      { icon: "guide", title: L("🧑‍🏫 Staff Guided", "🧑‍🏫 Encadré"), sub: L("Hosts keep the fun going.", "Animateurs présents.") },
      { icon: "coop", title: L("Teamwork & Competition", "Équipe & compétition"), sub: L("Cooperative and competitive fun.", "Coopération et compétition.") },
      { icon: "lock", title: L("Private Experience", "Expérience privée"), sub: L("Your group only.", "Votre groupe seul.") },
    ],
  },
  package: {
    title: L("Birthday Package", "Forfait anniversaire"),
    price: L("$249", "249 $"),
    tax: L("+ tax", "+ taxes"),
    includes: [
      L("2-hour access to the party room; host has 15 extra minutes before guests arrive", "2 h d'accès à la salle; 15 min supplémentaires pour l'organisateur avant les invités"),
      L("Customize your party — bring your own food and décor", "Personnalisez votre fête — apportez nourriture et décorations"),
      L("Essential decorations: tablecloth in red, orange, pink, blue, green, or white", "Décorations essentielles : nappe rouge, orange, rose, bleue, verte ou blanche"),
      L("Downloadable digital invitation", "Invitation numérique téléchargeable"),
      L("Event cleanup handled by our staff", "Nettoyage géré par notre équipe"),
      L("75 minutes interactive gameplay on the LED floor", "75 min de jeu interactif sur le plancher LED"),
    ],
    extra: L("$20.99 + tax per additional participant", "20,99 $ + taxes par participant additionnel"),
    capacity: L("Up to 30 participants", "Jusqu'à 30 participants"),
  },
  gameplay: {
    title: L("What's Included", "Ce qui est inclus"),
    items: [
      { icon: "gamepad", title: L("Dynamic Games", "Jeux dynamiques"), sub: L("Different interactive group challenges.", "Défis de groupe interactifs variés.") },
      { icon: "music", title: L("Atmosphere", "Ambiance"), sub: L("Create your vibe during gameplay — send us your curated Spotify playlist.", "Créez l'ambiance — envoyez votre playlist Spotify.") },
      { icon: "party", title: L("Party Zone", "Zone fête"), sub: L("Private room for celebrating. Bring your own food and decorations.", "Salle privée pour célébrer. Apportez nourriture et décorations.") },
    ],
  },
  bring: {
    title: L("What To Bring", "À apporter"),
    items: [
      L("Grip socks", "Chaussettes antidérapantes"),
      L("Comfortable clothing", "Vêtements confortables"),
      L("Water bottle", "Bouteille d’eau"),
      L("Cake & snacks (optional)", "Gâteau & collations (optionnel)"),
      L("Decorations (optional)", "Décorations (optionnel)"),
    ],
  },
  partyRoom: {
    title: L("Party Room", "Salle de fête"),
    items: [
      L("Tables & chairs included", "Tables et chaises incluses"),
      L("Bring your own food", "Apportez votre nourriture"),
      L("Bring your own decorations", "Apportez vos décorations"),
      L("Available after gameplay", "Après le jeu"),
    ],
  },
  faq: [
    { q: L("What ages are recommended?", "Quel âge est recommandé ?"), a: L("Ages 7 and up.", "7 ans et plus.") },
    { q: L("Can adults participate?", "Les adultes peuvent jouer ?"), a: L("Absolutely — parents and guests welcome.", "Oui — parents et invités accueillis.") },
    { q: L("Can I bring cake and snacks?", "Gâteau et collations ?"), a: L("Yes, for the celebration space.", "Oui, pour l’espace fête.") },
    { q: L("How many participants?", "Combien de participants ?"), a: L("Package includes 8; up to 30 total.", "8 inclus ; max. 30.") },
    { q: L("Grip socks required?", "Chaussettes antidérapantes ?"), a: L("Yes, for all participants.", "Oui, pour tous.") },
  ],
  final: {
    title: L("Ready To Celebrate?", "Prêt à fêter ?"),
    sub: L("Give them a birthday they'll remember.", "Une fête mémorable."),
    cta: L("Book a Birthday Party", "Réserver une fête"),
  },
};

export const v2Groups = {
  hero: {
    title: L("Groups & Events", "Groupes & événements"),
    sub: L("Active experiences for groups of all sizes.", "Expériences actives pour tous les groupes."),
    body: L(
      "Perfect for families, schools, sports teams, camps, corporate teams, and community organizations.",
      "Familles, écoles, équipes sportives, camps, entreprises et groupes communautaires.",
    ),
  },
  audiences: [
    { icon: "family", title: L("Families & Friends", "Familles & amis"), desc: L("Memorable active play and friendly competition.", "Jeu actif et compétition amicale.") },
    { icon: "school", title: L("Schools & Day Camps", "Écoles & camps"), desc: L("Physical activity, teamwork, and fun.", "Activité, équipe et plaisir.") },
    { icon: "sports", title: L("Sports Teams", "Équipes sportives"), desc: L("Communication and team chemistry.", "Communication et chimie d’équipe.") },
    { icon: "team", title: L("Team Building", "Team building"), desc: L("Collaboration through play.", "Collaboration par le jeu.") },
    { icon: "community", title: L("Community Groups", "Groupes communautaires"), desc: L("Inclusive for all ages.", "Pour tous les âges.") },
    { icon: "seniors", title: L("Seniors Programs", "Programmes seniors"), desc: L("Engaging group activities.", "Activités de groupe engageantes.") },
  ],
  expect: {
    title: L("Every Group Booking Includes", "Chaque réservation inclut"),
    items: [
      L("Interactive LED floor games", "Jeux plancher LED"),
      L("Staff-guided activities", "Activités encadrées"),
      L("Active gameplay", "Jeu actif"),
      L("Cooperative challenges", "Défis coopératifs"),
      L("Competitive games", "Jeux compétitifs"),
      L("Memory & strategy challenges", "Mémoire & stratégie"),
      L("Flexible group rotations", "Rotations flexibles"),
    ],
  },
  bring: {
    title: L("What To Bring", "À apporter"),
    items: [L("Grip socks", "Chaussettes antidérapantes"), L("Comfortable clothing", "Vêtements confortables"), L("Water bottle", "Bouteille d’eau")],
  },
  pricing: [
    {
      id: "small",
      title: L("Small Group", "Petit groupe"),
      players: L("2–3 Participants", "2–3 participants"),
      duration: L("60 Minutes", "60 minutes"),
      price: "$27.99",
      unit: L("/ participant", "/ participant"),
      cta: L("Book Now", "Réserver"),
      href: "/booking",
    },
    {
      id: "group",
      title: L("Group Experience", "Expérience groupe"),
      players: L("4–15 Participants", "4–15 participants"),
      duration: L("60 Minutes", "60 minutes"),
      price: "$24.99",
      unit: L("/ participant", "/ participant"),
      cta: L("Book Now", "Réserver"),
      href: "/booking",
      featured: true,
    },
    {
      id: "large",
      title: L("Large Group", "Grand groupe"),
      players: L("16–30 Participants", "16–30 participants"),
      duration: L("75 Minutes", "75 minutes"),
      price: "$20.99",
      unit: L("/ participant", "/ participant"),
      cta: L("Contact Us", "Contactez-nous"),
      href: "/contact",
    },
  ],
  addon: {
    title: L("Party Room Add-On", "Salle de fête"),
    price: "$60",
    tax: L("+ tax", "+ taxes"),
    duration: L("60 Minutes", "60 minutes"),
    cta: L("Learn More", "En savoir plus"),
    href: "/birthdays",
  },
  contact: {
    title: L("Planning Something Special?", "Un projet spécial ?"),
    sub: L("Larger bookings or recurring visits.", "Réservations importantes ou récurrentes."),
    cta: L("Contact Us", "Contactez-nous"),
  },
  customQuote: {
    title: L("Schools, Camps & Corporate", "Écoles, camps & entreprises"),
    body: L(
      "Need a custom quote for schools, day camps, corporate teams, or recurring visits? Contact us — we'll tailor pricing to your group.",
      "Devis sur mesure pour écoles, camps, entreprises ou visites récurrentes ? Contactez-nous.",
    ),
    cta: L("Request a Custom Quote", "Demander un devis"),
  },
  faq: [
    { q: L("What group sizes do you accommodate?", "Quelles tailles de groupe ?"), a: L("From 2 to 30 participants depending on the experience.", "De 2 à 30 participants selon l'expérience.") },
    { q: L("Do you offer private sessions?", "Séances privées ?"), a: L("Yes — your group enjoys the floor without sharing with others.", "Oui — votre groupe seul sur le plancher.") },
    { q: L("Can schools book field trips?", "Sorties scolaires ?"), a: L("Yes — contact us for custom school and camp pricing.", "Oui — contactez-nous pour tarifs écoles et camps.") },
  ],
};

export const v2Mobile = {
  hero: {
    title: L("jeuLumi On Wheels", "jeuLumi mobile"),
    sub: L("Bringing interactive play directly to you.", "Le jeu interactif vient à vous."),
    badge: L("Coming Soon", "Bientôt"),
  },
  overview: L(
    "We're building a mobile experience to bring JeuLumi's interactive LED gameplay to schools, camps, community centres, festivals, and private events.",
    "Nous développons une expérience mobile pour apporter le jeu LED JeuLumi aux écoles, camps, centres communautaires, festivals et événements privés.",
  ),
  whoFor: [
    L("Schools", "Écoles"),
    L("Day camps", "Camps de jour"),
    L("Community centres", "Centres communautaires"),
    L("Festivals", "Festivals"),
    L("Private events", "Événements privés"),
  ],
  how: [
    { step: "1", title: L("We arrive", "Nous arrivons"), sub: L("Mobile setup at your location.", "Installation sur site.") },
    { step: "2", title: L("We guide", "Nous animons"), sub: L("Staff-led interactive sessions.", "Séances encadrées.") },
    { step: "3", title: L("You play", "Vous jouez"), sub: L("Same JeuLumi energy, on the go.", "La même énergie JeuLumi.") },
  ],
  waitlist: {
    title: L("Join the Waitlist", "Liste d’attente"),
    sub: L("Be first to know when we launch.", "Soyez les premiers informés."),
    name: L("Name", "Nom"),
    email: L("Email", "Courriel"),
    org: L("Organization (optional)", "Organisation (optionnel)"),
    submit: L("Join Waitlist", "S’inscrire"),
    success: L("Thanks! We'll be in touch.", "Merci ! Nous vous contacterons."),
  },
};

export const v2Faq = {
  title: L("Frequently Asked Questions", "Questions fréquentes"),
  groups: [
    {
      id: "general",
      label: L("General", "Général"),
      items: [
        { q: L("How old do players need to be?", "Quel âge minimum ?"), a: L("Recommended for ages 7 and up.", "Recommandé 7 ans et plus.") },
        { q: L("Is the experience private?", "L’expérience est privée ?"), a: L("Yes — your group enjoys a private session during your reserved time.", "Oui — votre groupe seul pendant votre créneau.") },
        { q: L("Can adults play?", "Les adultes peuvent jouer ?"), a: L("Absolutely. Parents and guests are welcome.", "Oui, parents et invités accueillis.") },
        { q: L("Do I need grip socks?", "Chaussettes antidérapantes ?"), a: L("Yes, grip socks are required for all participants.", "Oui, obligatoires pour tous.") },
      ],
    },
    {
      id: "birthdays",
      label: L("Birthdays", "Anniversaires"),
      items: [
        { q: L("Can I bring food and cake?", "Nourriture et gâteau ?"), a: L("Yes — bring your own cake, snacks, and refreshments for the celebration space.", "Oui — pour l’espace fête.") },
        { q: L("Can I decorate?", "Décorations ?"), a: L("Yes, decorations are welcome in the party room.", "Oui, dans la salle de fête.") },
        { q: L("How many people can play?", "Combien de joueurs ?"), a: L("Up to 30 participants; package includes 8.", "Jusqu'à 30 ; forfait 8 inclus.") },
      ],
    },
    {
      id: "groups",
      label: L("Groups", "Groupes"),
      items: [
        { q: L("What group sizes do you accommodate?", "Tailles de groupe ?"), a: L("From 2 to 30 participants with flexible pricing tiers.", "De 2 à 30 participants, tarifs flexibles.") },
        { q: L("Do you host schools and camps?", "Écoles et camps ?"), a: L("Yes — ideal for school outings and day camp trips.", "Oui — sorties scolaires et camps.") },
      ],
    },
    {
      id: "pricing",
      label: L("Pricing", "Tarifs"),
      items: [
        { q: L("What's included in the price?", "Qu’est-ce qui est inclus ?"), a: L("Staff-guided gameplay on the LED floor for your group size and session length.", "Jeu encadré sur le plancher LED selon groupe et durée.") },
        { q: L("Party room cost?", "Prix salle de fête ?"), a: L("$60 + tax for 60 minutes after gameplay.", "60 $ + taxes pour 60 min après le jeu.") },
      ],
    },
    {
      id: "policies",
      label: L("Policies", "Politiques"),
      items: [
        { q: L("What if I need to cancel?", "Annulation ?"), a: L("Contact us — we'll explain cancellation options for your booking.", "Contactez-nous pour les options d’annulation.") },
        { q: L("Walk-ins available?", "Sans rendez-vous ?"), a: L("No — open by reservation only. Book online in advance.", "Non — sur réservation seulement.") },
      ],
    },
  ],
};

export const v2Footer = {
  quickLinks: L("Quick Links", "Liens rapides"),
  contact: L("Contact", "Contact"),
  hours: L("Hours", "Heures"),
  follow: L("Follow Us", "Suivez-nous"),
  directions: L("Get Directions", "Itinéraire"),
  call: L("Call Now", "Appeler"),
  email: L("Email Us", "Courriel"),
  newsletter: L("Newsletter", "Infolettre"),
  newsletterPlaceholder: L("Your email", "Votre courriel"),
  newsletterCta: L("Subscribe", "S’abonner"),
};
