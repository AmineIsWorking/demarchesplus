import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Démarches+ — Toutes vos démarches françaises simplifiées",
  description:
    "Trouvez en 2 clics toutes les démarches administratives françaises et découvrez les aides auxquelles vous avez droit. Propulsé par l'IA, disponible dans toutes les langues.",
  keywords: [
    "démarches administratives",
    "service public",
    "CAF",
    "aides sociales",
    "APL",
    "MaPrimeRénov",
    "France",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
