/** Official client pricing — use these values across the public site. */
export const CLIENT_PRICING = {
  smallGroup: {
    players: "2–3",
    durationMin: 60,
    perPlayer: 27.99,
  },
  group: {
    players: "4–15",
    durationMin: 60,
    perPlayer: 24.99,
  },
  largeGroup: {
    players: "16–30",
    durationMin: 75,
    perPlayer: 20.99,
  },
  birthday: {
    package: 249.99,
    extraPerPlayer: 20.99,
    includedPlayers: 8,
    maxPlayers: 30,
  },
  partyRoom: {
    price: 60,
    durationMin: 60,
  },
} as const;

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
