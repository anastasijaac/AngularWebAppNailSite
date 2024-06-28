export interface AuthResponse {
  token: string;
  user: Kunde | Mitarbeiter; // Nutze eine Union-Typisierung hier
}

export interface Kunde {
  role: 'kunde';
  KundenID: number;
  Name: string;
  Email: string;
}

export interface Mitarbeiter {
  role: 'mitarbeiter';
  MitarbeiterID: number;
  Name: string;
  Email: string;
  Rolle: string; // Beispielsweise 'Manager', 'Rezeptionist' etc.
}
