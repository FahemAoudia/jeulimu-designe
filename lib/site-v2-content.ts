import type { Locale } from "@/providers/AppProviders";

export type L10n = { en: string; fr: string };

export function t(obj: L10n, locale: Locale): string {
  return obj[locale];
}

const L = (en: string, fr: string): L10n => ({ en, fr });

export const v2Nav = {
  birthdays: L("Birthdays", "Anniversaires"),
  groupsPricing: L("Groups & Pricing", "Groupes & tarifs"),
  mobileEvents: L("Mobile Events", "Événements mobiles"),
  faq: L("FAQ", "FAQ"),
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
    ctaGroups: L("View Groups & Pricing", "Voir groupes & tarifs"),
  },
  glance: [
    { icon: "grid", title: L("16 × 24 ft Floor", "Plancher 16 × 24 pi"), sub: L("Interactive LED", "LED interactif") },
    { icon: "users", title: L("Up To 24", "Jusqu’à 24"), sub: L("Participants", "Participants") },
    { icon: "gamepad", title: L("Interactive", "Interactif"), sub: L("Gameplay", "Jeu") },
    { icon: "trophy", title: L("3 Categories", "3 catégories"), sub: L("Game modes", "Modes de jeu") },
    { icon: "lock", title: L("Private", "Privé"), sub: L("Sessions", "Séances") },
    { icon: "guide", title: L("Staff", "Équipe"), sub: L("Guided", "Encadré") },
    { icon: "target", title: L("Ages 7+", "7 ans et +"), sub: L("Recommended", "Recommandé") },
  ],
  whatIs: {
    title: L("Your Own Interactive Playground", "Votre terrain de jeu interactif"),
    body: L(
      "JeuLumi combines physical activity, teamwork, strategy, and technology to create engaging experiences that get people moving, thinking, and having fun together. Our game hosts guide participants through cooperative, competitive, and strategy-based challenges.",
      "JeuLumi combine activité physique, travail d’équipe, stratégie et technologie pour des expériences engageantes. Nos animateurs guident les participants dans des défis coopératifs, compétitifs et stratégiques.",
    ),
    features: [
      { icon: "run", title: L("Active Play", "Jeu actif"), sub: L("Fast-paced movement challenges.", "Défis de mouvement rapides.") },
      { icon: "coop", title: L("Cooperative", "Coopération"), sub: L("Work together to complete objectives.", "Objectifs en équipe.") },
      { icon: "vs", title: L("Competitive", "Compétition"), sub: L("Race, react, and compete.", "Courez, réagissez, rivalisez.") },
      { icon: "brain", title: L("Memory & Strategy", "Mémoire & stratégie"), sub: L("Recall, decide, adapt.", "Observer, décider, s’adapter.") },
      { icon: "social", title: L("Social Fun", "Plaisir social"), sub: L("Designed to bring people together.", "Pour jouer ensemble.") },
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
      "Whether you’re celebrating a birthday, planning a group outing, or bringing a team together — JeuLumi gets everyone moving, thinking, and having fun.",
      "Anniversaire, sortie de groupe ou activité d’équipe — JeuLumi fait bouger, réfléchir et s’amuser.",
    ),
    birthday: {
      title: L("Birthday Parties That Get Kids Moving", "Des fêtes qui font bouger les enfants"),
      sub: L("Celebrate with an interactive experience everyone joins.", "Une fête interactive pour tous."),
      cta: L("Explore Birthday Parties", "Explorer les anniversaires"),
    },
    groups: {
      title: L("Groups & Events", "Groupes & événements"),
      perfectFor: [
        L("Families & Friends", "Familles & amis"),
        L("Schools & Day Camps", "Écoles & camps de jour"),
        L("Sports Teams", "Équipes sportives"),
        L("Team Building", "Team building"),
        L("Community Groups", "Groupes communautaires"),
      ],
      pricing: [
        L("2–24 Participants", "2–24 participants"),
        L("Starting at $20.99 / player", "Dès 20,99 $ / participant"),
        L("60–75 minute sessions", "Séances 60–75 min"),
      ],
      cta: L("View Groups & Pricing", "Voir groupes & tarifs"),
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
      { icon: "guide", title: L("Staff Guided", "Encadré"), sub: L("Hosts keep the fun going.", "Animateurs présents.") },
      { icon: "coop", title: L("Teamwork & Competition", "Équipe & compétition"), sub: L("Cooperative and competitive fun.", "Coopération et compétition.") },
      { icon: "lock", title: L("Private Experience", "Expérience privée"), sub: L("Your group only.", "Votre groupe seul.") },
    ],
  },
  package: {
    title: L("Birthday Package", "Forfait anniversaire"),
    price: "$249.99",
    tax: L("+ tax", "+ taxes"),
    includes: [
      L("Min 8 participants", "Min. 8 participants"),
      L("75 minutes gameplay", "75 min de jeu"),
      L("60 min celebration space", "60 min espace fête"),
      L("Staff-guided activities", "Activités encadrées"),
      L("Digital & printable invitations", "Invitations numériques & imprimables"),
      L("Tables and chairs provided", "Tables et chaises fournies"),
    ],
    extra: L("$20.99 + tax per additional participant", "20,99 $ + taxes par participant additionnel"),
    capacity: L("Up to 24 participants", "Jusqu’à 24 participants"),
  },
  gameplay: {
    title: L("What's Included During Gameplay", "Pendant le jeu"),
    items: [
      { icon: "coop", title: L("Cooperative Challenges", "Défis coopératifs"), sub: L("Complete objectives together.", "Objectifs en équipe.") },
      { icon: "trophy", title: L("Competitive Games", "Jeux compétitifs"), sub: L("Race and react.", "Courez et réagissez.") },
      { icon: "brain", title: L("Memory & Strategy", "Mémoire & stratégie"), sub: L("Patterns evolve fast.", "Motifs évolutifs.") },
      { icon: "bolt", title: L("Fast Reactions", "Réactions rapides"), sub: L("Colours and rules change.", "Couleurs et règles changeantes.") },
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
    { q: L("How many participants?", "Combien de participants ?"), a: L("Package includes 8; up to 24 total.", "8 inclus ; max. 24.") },
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
      "Family outings, school trips, sports teams, team building, or community gatherings — interactive challenges that get people moving and having fun.",
      "Sorties familiales, écoles, équipes sportives, team building ou groupes — défis interactifs et plaisir.",
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
      players: L("16–24 Participants", "16–24 participants"),
      duration: L("75 Minutes", "75 minutes"),
      price: "$20.99",
      unit: L("/ participant", "/ participant"),
      cta: L("Contact Us", "Contactez-nous"),
      href: "mailto:contact@jeulumi.ca",
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
        { q: L("How many people can play?", "Combien de joueurs ?"), a: L("Up to 24 participants; package includes 8.", "Jusqu’à 24 ; forfait 8 inclus.") },
      ],
    },
    {
      id: "groups",
      label: L("Groups", "Groupes"),
      items: [
        { q: L("What group sizes do you accommodate?", "Tailles de groupe ?"), a: L("From 2 to 24 participants with flexible pricing tiers.", "De 2 à 24 participants, tarifs flexibles.") },
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
