// auth-response.ts
export interface AuthResponse {
  token: string;
  user: Kunde | Mitarbeiter;
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
  Rolle: string;
}
