import type { Locale } from "@/providers/AppProviders";

export const UI = {
  en: {
    skip: "Skip to content",
    nav: {
      home: "Home",
      experience: "Experience",
      gameModes: "Game modes",
      pricing: "Pricing",
      events: "Events",
      contact: "Contact",
    },
    bookNow: "Book now",
    bookExperience: "Book your experience",
    watchVideo: "Watch video",
    exploreModes: "Explore all modes",
    adminEntry: "Team login",
    reviewsTitle: "Recent reviews",
    reviewsMeta: "5.0 stars · Google reviews",
    reviewsSource: "Google Maps",
    form: {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      date: "Date",
      players: "Total number of players",
      kids: 'How many are kids (ages 12 & under)',
      message: "Message",
      submit: "Submit",
      required: "Required",
      datePlaceholder: "dd/mm/yyyy",
    },
    events: {
      upcoming: "Upcoming events",
      noneTitle: "No upcoming events right now",
      noneBody:
        "We’re quiet on the calendar at the moment. Follow us for announcements—or host your own private event.",
    },
    bestGroup: "Best played as a group for the ultimate experience.",
    reservationRibbon: "By reservation only",
    mapOpen: "Open map in Google Maps",
    theme: {
      label: "Appearance",
      light: "Light",
      dark: "Dark",
      ariaToggle: "Switch between light and dark theme",
    },
    chat: {
      openLabel: "Open FAQ assistant",
      title: "jeuLumi FAQ",
      subtitle: "Quick answers",
      welcome:
        "Hi! Tap a question below — I’ll answer with the same info as our official FAQs.",
      choose: "Pick a question:",
      restart: "Clear chat",
      contactCta: "Contact us",
      close: "Close",
      botName: "jeuLumi",
      emptyFaq:
        "No FAQ entries yet. Ask the team to add questions in the admin dashboard.",
    },
  },
  fr: {
    skip: "Aller au contenu",
    nav: {
      home: "Accueil",
      experience: "Expérience",
      gameModes: "Modes de jeu",
      pricing: "Tarifs",
      events: "Événements",
      contact: "Contact",
    },
    bookNow: "Réserver",
    bookExperience: "Réservez votre expérience",
    watchVideo: "Voir la vidéo",
    exploreModes: "Explorer tous les modes",
    adminEntry: "Connexion équipe",
    reviewsTitle: "Avis récents",
    reviewsMeta: "5,0 étoiles · avis Google",
    reviewsSource: "Google Maps",
    form: {
      firstName: "Prénom",
      lastName: "Nom",
      email: "Courriel",
      phone: "Téléphone",
      date: "Date",
      players: "Nombre total de joueurs",
      kids: "Combien d’enfants (12 ans et moins)",
      message: "Message",
      submit: "Envoyer",
      required: "Requis",
      datePlaceholder: "jj/mm/aaaa",
    },
    events: {
      upcoming: "Événements à venir",
      noneTitle: "Aucun événement pour le moment",
      noneBody:
        "Rien à l’horaire pour l’instant. Suivez-nous pour les annonces — ou organisez votre événement privé.",
    },
    bestGroup:
      "Encore mieux à plusieurs pour vivre l’expérience au maximum.",
    reservationRibbon: "Sur réservation seulement",
    mapOpen: "Ouvrir la carte dans Google Maps",
    theme: {
      label: "Affichage",
      light: "Clair",
      dark: "Sombre",
      ariaToggle: "Basculer entre thème clair et sombre",
    },
    chat: {
      openLabel: "Ouvrir l’assistant FAQ",
      title: "FAQ jeuLumi",
      subtitle: "Réponses rapides",
      welcome:
        "Bonjour ! Touchez une question ci-dessous — je réponds avec les mêmes infos que notre FAQ officielle.",
      choose: "Choisissez une question :",
      restart: "Effacer",
      contactCta: "Contactez-nous",
      close: "Fermer",
      botName: "jeuLumi",
      emptyFaq:
        "Aucune question FAQ pour le moment. L’équipe peut en ajouter depuis l’administration.",
    },
  },
} as const;

export function ui(locale: Locale) {
  return UI[locale];
}
