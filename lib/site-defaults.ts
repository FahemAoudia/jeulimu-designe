import type { SiteContent } from "@/types/site-content";
import {
  defaultPricing,
  defaultSectionVisibilityV2,
  defaultTheme,
  defaultV2SiteContent,
} from "@/lib/v2-content-defaults";

const L = (en: string, fr: string) => ({ en, fr });

export const defaultSiteContent: SiteContent = {
  reservationBanner: L(
    "Open by reservation only — book online in advance. Walk-ins are not available.",
    "Ouvert sur réservation seulement — réservez en ligne à l’avance. Sans rendez-vous : non disponible.",
  ),
  hero: {
    titleStep: L("Step Into", "Entrez dans"),
    titleGame: L("The Game", "le jeu"),
    subtitle: L(
      "Interactive LED Game Floor Experience",
      "Expérience de plancher lumineux LED interactif",
    ),
    backgroundImage: "/hero-background.svg",
    backgroundVideo: "",
    badges: [
      L("Physical Activity", "Activité physique"),
      L("Group Entertainment", "Divertissement de groupe"),
      L("Private Sessions", "Séances privées"),
      L("LaSalle, QC", "LaSalle, QC"),
    ],
    badgeVisible: [true, true, true, true],
    showBookCta: true,
    showWatchVideoCta: true,
    googleMapsSummary: {
      visible: true,
      scoreText: "5.0/5",
      mapsLabel: L("on Google Maps", "sur Google Maps"),
      locationLine: L("LaSalle, Quebec", "LaSalle (Québec)"),
      avatars: [
        { id: "gmap-avatar-jl", initials: "JL", displayName: "Jingya Liu" },
        { id: "gmap-avatar-jp", initials: "JP", displayName: "Jonathan Pepin" },
        { id: "gmap-avatar-ap", initials: "AP", displayName: "Anna Phan" },
      ],
    },
  },
  intro: {
    sparkle: L("✨ jeuLumi Experience ✨", "✨ Expérience jeuLumi ✨"),
    headline: L(
      "STEP INTO A WORLD WHERE PHYSICAL ACTIVITY AND DIGITAL ENTERTAINMENT COLLIDE!",
      "PLONGEZ DANS UN UNIVERS OÙ L’ACTIVITÉ PHYSIQUE ET LE DIVERTISSEMENT NUMÉRIQUE SE RENCONTRENT !",
    ),
    paragraphs: [
      L(
        "Welcome to jeuLumi, an interactive LED game floor that reacts to your every step.",
        "Bienvenue chez jeuLumi : un plancher de jeu LED interactif qui réagit à chacun de vos pas.",
      ),
      L(
        "Move, react, and play together on a grid that lights up in dynamic patterns, challenging speed, coordination, and strategy.",
        "Bougez, réagissez et jouez ensemble sur une grille qui s’illumine de motifs dynamiques — vitesse, coordination et stratégie mises au défi.",
      ),
      L(
        "Perfect for families, friends, and competitive crews—an exciting, high-energy activity for kids, adults, and everyone in between.",
        "Parfait pour les familles, les amis et les esprits compétitifs : une activité riche en énergie pour enfants, adultes et tout le monde entre les deux.",
      ),
    ],
  },
  gallery: [
    {
      image: "/images/lumivs.svg",
      alt: L(
        "Group playing LumiVS LED-floor game at JeuLumi — interactive group activity and friendly competition.",
        "Groupe jouant à LumiVS sur le plancher LED JeuLumi — activité de groupe et compétition amicale.",
      ),
      caption: L("LumiVS — friendly competition", "LumiVS — compétition amicale"),
    },
    {
      image: "/images/lumivs.svg",
      alt: L(
        "Group playing LumiQuest LED-floor game at JeuLumi LaSalle — teamwork, strategy, and fun.",
        "Groupe jouant à LumiQuest chez JeuLumi LaSalle — équipe, stratégie et plaisir.",
      ),
      caption: L("LumiQuest — teamwork", "LumiQuest — travail d’équipe"),
    },
    {
      image: "/images/lumilogik.svg",
      alt: L(
        "Group playing LumiLogik LED-floor challenge at JeuLumi LaSalle — memory, reflex, and brain training as active fun.",
        "Défi LumiLogik sur plancher LED à JeuLumi LaSalle — mémoire, réflexes et stimulation cognitive en mouvement.",
      ),
      caption: L("LumiLogik — memory & logic", "LumiLogik — mémoire et logique"),
    },
  ],
  howItWorks: {
    title: L("How the Game Works", "Comment fonctionne le jeu"),
    intro: L(
      "Step onto the illuminated grid and let the floor guide you. Each game uses colors, movement, and timing to create fast, interactive challenges.",
      "Montez sur la grille illuminée et laissez le plancher vous guider. Chaque jeu utilise les couleurs, le mouvement et le rythme pour créer des défis rapides et interactifs.",
    ),
    bullets: [
      L(
        "Move across the floor as tiles light up around you.",
        "Déplacez-vous sur le plancher pendant que les cases s’illuminent autour de vous.",
      ),
      L(
        "Follow color-based rules to score points, stay safe, or avoid danger.",
        "Suivez les règles de couleur pour marquer des points, rester en sécurité ou éviter le danger.",
      ),
      L(
        "React quickly as patterns change and difficulty increases.",
        "Réagissez vite lorsque les motifs changent et que la difficulté augmente.",
      ),
      L(
        "Adapt your strategy based on the game mode you’re playing.",
        "Adaptez votre stratégie selon le mode de jeu choisi.",
      ),
    ],
    closing: L(
      "Every session flows through levels or rounds, keeping the experience dynamic, social, and replayable.",
      "Chaque séance enchaîne niveaux ou manches pour une expérience dynamique, sociale et rejouable.",
    ),
  },
  gameModesIntro: {
    sparkle: L("✨ Game modes ✨", "✨ Modes de jeu ✨"),
    title: L(
      "Spend your time running, jumping, and strategizing in cooperative quests or facing off in competitive challenges, turning the floor into your dynamic playground.",
      "Courez, sautez et strategisez en quêtes coopératives ou affrontez-vous en défis compétitifs — le plancher devient votre terrain de jeu vivant.",
    ),
  },
  gameModes: [
    {
      id: "lumiquest",
      name: L("LumiQuest", "LumiQuest"),
      tagline: L(
        "Cooperative & level-based progression",
        "Progression coopérative par niveaux",
      ),
      lead: L(
        "Teamwork is the key to leveling up.",
        "Le travail d’équipe est la clé pour monter de niveau.",
      ),
      description: L(
        "Work together to clear the floor and advance through levels. Every step counts — coordination and communication matter.",
        "Travaillez ensemble pour dégager le plancher et avancer. Chaque pas compte — coordination et communication essentielles.",
      ),
      image: "/images/lumiquest.svg",
    },
    {
      id: "lumivs",
      name: L("LumiVS", "LumiVS"),
      tagline: L(
        "Competitive & score-based rounds",
        "Manches compétitives axées sur le score",
      ),
      lead: L(
        "Fast feet. High scores. Friendly rivalry.",
        "Pas rapides. Scores élevés. Rivalité amicale.",
      ),
      description: L(
        "Go head-to-head in energetic face-offs where speed and accuracy win. Rounds get intense — but rankings are revealed at the end.",
        "Affrontez-vous dans des duels énergiques où vitesse et précision paient. Les manches intensifient — les classements arrivent à la fin.",
      ),
      image: "/images/lumivs.svg",
    },
    {
      id: "lumilogik",
      name: L("LumiLogik", "LumiLogik"),
      tagline: L("Memory & logic games", "Jeux de mémoire et de logique"),
      lead: L(
        "Think fast. Remember better. Move smart.",
        "Pensez vite. Mémorisez mieux. Bougez intelligemment.",
      ),
      description: L(
        "LumiLogik blends movement with brainpower. Memorize patterns, solve visual challenges, and step with intention.",
        "LumiLogik marie mouvement et réflexion. Mémorisez des motifs, relevez des défis visuels et avancez avec intention.",
      ),
      image: "/images/lumilogik.svg",
    },
  ],
  pricing: {
    sparkle: L("✨ Pricing ✨", "✨ Tarification ✨"),
    title: L("Choose Your Group", "Choisissez votre groupe"),
  },
  pricingTiers: [
    {
      id: "small",
      title: L("Small Group", "Petit groupe"),
      players: L("2–3 Players", "2–3 joueurs"),
      price: "$27.99",
      priceNote: L("/player + taxes", "/personne + taxes"),
      extras: [
        L("60 Minutes", "60 minutes"),
        L("Staff-guided session", "Séance encadrée par l’équipe"),
      ],
      cta: L("Book Now", "Réserver"),
      featured: false,
    },
    {
      id: "medium",
      title: L("Group Experience", "Expérience groupe"),
      players: L("4–15 Players", "4–15 joueurs"),
      price: "$24.99",
      priceNote: L("/player + taxes", "/personne + taxes"),
      extras: [
        L("60 Minutes", "60 minutes"),
        L("Staff-guided session", "Séance encadrée par l’équipe"),
      ],
      cta: L("Book Now", "Réserver"),
      featured: true,
      badge: L("⭐ Fan favourite", "⭐ Coup de cœur"),
    },
    {
      id: "large",
      title: L("Large Group", "Grand groupe"),
      players: L("16–30 Players", "16–30 joueurs"),
      price: "$20.99",
      priceNote: L("/player + taxes", "/personne + taxes"),
      extras: [
        L("75 Minutes", "75 minutes"),
        L("Staff-guided session", "Séance encadrée par l’équipe"),
      ],
      cta: L("Contact us", "Contactez-nous"),
      featured: false,
    },
  ],
  eventsParty: {
    sparkle: L("✨ Events ✨", "✨ Événements ✨"),
    title: L(
      "Extend the Fun After Your Activity",
      "Prolongez le plaisir après votre activité",
    ),
    priceLine: L(
      "For $60 + taxes, enjoy an additional hour in our private party room after your activity. Standard group pricing for gameplay applies as outlined in our pricing section.",
      "Pour 60 $ + taxes, profitez d’une heure supplémentaire dans notre salle de fête privée après votre activité. Les tarifs de jeu standards du groupe s’appliquent comme indiqué à la tarification.",
    ),
    idealTitle: L("Ideal for:", "Idéal pour :"),
    idealFor: [
      L("Birthday Parties", "Fêtes d’anniversaire"),
      L("Team-Building Events", "Activités de consolidation d’équipe"),
      L("Friends & Family Gatherings", "Rencontres entre amis et famille"),
      L("Social Gatherings", "Événements sociaux"),
    ],
    spaceTitle: L("Space Details:", "Détails de l’espace :"),
    spaceDetails: [
      {
        icon: "chair",
        title: L("Private Party Room (60 min)", "Salle de fête privée (60 min)"),
        body: L(
          "A dedicated space for your group to gather after your activity, complete with tables and chairs, and the freedom to decorate and make it your own.",
          "Un espace dédié pour se retrouver après l’activité, avec tables et chaises, et la liberté de décorer à votre goût.",
        ),
      },
      {
        icon: "food",
        title: L("Bring Your Own Refreshments", "Apportez vos rafraîchissements"),
        body: L(
          "You’re welcome to bring your own food, cake, snacks, and beverages to enjoy during your celebration.",
          "Vous pouvez apporter nourriture, gâteau, collations et boissons pour votre célébration.",
        ),
      },
      {
        icon: "calendar",
        title: L("Booking Times", "Créneaux de réservation"),
        body: L(
          "Celebrations are hosted during select timeslots based on our activity schedule — please check our booking calendar to view available times. Don’t see your preferred slot? Contact us and we’ll be happy to explore alternative options.",
          "Les célébrations ont lieu sur des créneaux sélectionnés selon notre horaire — consultez le calendrier de réservation. Créneau idéal indisponible ? Écrivez-nous pour explorer d’autres options.",
        ),
      },
    ],
    bookingNote: L(
      "Don’t see your preferred slot? Contact us and we’ll be happy to explore alternative options.",
      "Créneau idéal indisponible ? Contactez-nous pour d’autres options.",
    ),
    bookingContact: L("Contact us", "Contactez-nous"),
    cta: L("Book Your Event", "Réservez votre événement"),
  },
  eventsList: [],
  contact: {
    sparkle: L("✨ Contact Us ✨", "✨ Contactez-nous ✨"),
    title: L("We’d love to hear from you", "Au plaisir de vous lire"),
    phone: "514 795-5023",
    email: "contact@jeuLumi.ca",
    address: L(
      "7427 Newman Blvd, LaSalle, Quebec H8N 1X3",
      "7427 boul. Newman, LaSalle (Québec) H8N 1X3",
    ),
    hoursTitle: L("Opening hours", "Heures d’ouverture"),
    hoursReservation: L(
      "By reservation only",
      "Sur réservation seulement",
    ),
    hoursExplainer: L(
      "The hours below represent our bookable times, not walk-in hours. All sessions must be booked online in advance.",
      "Les heures ci-dessous sont nos créneaux réservables, pas des heures sans rendez-vous. Toutes les séances se réservent en ligne à l’avance.",
    ),
    mapLabel: L("Map", "Carte"),
    mapEmbedUrl:
      "https://maps.google.com/maps?q=7427+Newman+Blvd,+LaSalle,+QC+H8N+1X3&hl=en&z=16&output=embed",
    schedule: [
      {
        days: L("Monday to Thursday", "Lundi au jeudi"),
        hours: L("10am to 8pm", "10 h à 20 h"),
      },
      {
        days: L("Friday to Saturday", "Vendredi et samedi"),
        hours: L("10am to 10:30pm", "10 h à 22 h 30"),
      },
      {
        days: L("Sunday", "Dimanche"),
        hours: L("10am to 6:30pm", "10 h à 18 h 30"),
      },
    ],
  },
  footerTagline: L(
    "Interactive LED game floor — movement, teamwork, and spectacle in LaSalle.",
    "Plancher de jeu LED interactif — mouvement, équipe et spectacle à LaSalle.",
  ),
  siteBranding: {
    logoImage: "/logo.png",
    logoAlt: L("jeuLumi — interactive LED game floor", "jeuLumi — plancher de jeu LED interactif"),
    logoSize: "md",
    showTagline: false,
  },
  testimonialReviews: [
    {
      id: "rev-jingya",
      name: L("Jingya Liu", "Jingya Liu"),
      meta: L("Local Guide · 65 reviews", "Guide Local · 65 avis"),
      when: L("2 weeks ago", "il y a 2 semaines"),
      quote: L(
        "I had a great time at JeuLumi. The host was really nice and relaxed. I recommend this group activity without hesitation.",
        "J'ai passé un super moment à JeuLumi. L'hôte était vraiment sympa et détendu. Je recommande sans hésiter cette activité de groupe.",
      ),
    },
    {
      id: "rev-jonathan",
      name: L("Jonathan Pepin", "Jonathan Pepin"),
      meta: L("Local Guide · 18 reviews", "Guide Local · 18 avis"),
      when: L("3 weeks ago", "il y a 3 semaines"),
      quote: L(
        "We came for a 4-person session and it was nothing but fun! Especially thanks to the facilitator (owner) who was great! I definitely recommend it.",
        "Nous sommes venus pour une session à 4 personnes, et ce n'était que du plaisir ! Surtout grâce à l'animateur (propriétaire) qui était super! Je recommande définitivement",
      ),
    },
    {
      id: "rev-anna",
      name: L("Anna Phan", "Anna Phan"),
      meta: L("2 reviews", "2 avis"),
      when: L("1 month ago", "il y a un mois"),
      quote: L(
        "I booked a session for my boyfriend and me—we had a fantastic time and we'll be back without hesitation!!!",
        "J'ai réservé une séance pour mon copain et moi, nous avons passé un moment fantastique et nous reviendrons sans hésiter !!!",
      ),
    },
  ],
  sectionVisibility: {
    reservationBar: true,
    hero: true,
    experienceAndHow: true,
    gameModes: true,
    pricing: true,
    testimonials: true,
    events: true,
    contact: true,
    bookBand: true,
  },
  eventsPromoImage: "",
  faqItems: [
    {
      id: "faq-wear",
      question: L("What should we wear?", "Comment dois-je m’habiller ?"),
      answer: L(
        "Comfortable athletic clothes and clean indoor shoes or socks — our team will guide you at check-in.",
        "Vêtements sport confortables et chaussures intérieures propres ou chaussettes — l’équipe vous guide à l’arrivée.",
      ),
    },
    {
      id: "faq-book",
      question: L("Do I need to book in advance?", "Faut-il réserver à l’avance ?"),
      answer: L(
        "Yes. jeuLumi is open by reservation only — please book online before you arrive.",
        "Oui. jeuLumi est ouvert sur réservation seulement — réservez en ligne avant votre venue.",
      ),
    },
    {
      id: "faq-parties",
      question: L(
        "Is it good for birthdays or teams?",
        "Est-ce adapté aux anniversaires ou aux équipes ?",
      ),
      answer: L(
        "Absolutely. We host parties and team-building groups, with optional private party room add-ons after play.",
        "Oui. Nous accueillons fêtes et activités de team building, avec option de salle privée après le jeu.",
      ),
    },
  ],
  v2: structuredClone(defaultV2SiteContent),
  pricingV2: structuredClone(defaultPricing),
  theme: structuredClone(defaultTheme),
  sectionVisibilityV2: structuredClone(defaultSectionVisibilityV2),
  schemaVersion: 5,
};
