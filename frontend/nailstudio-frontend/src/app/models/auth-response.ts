export interface AuthResponse {
  token: string;
  kunde: {
    KundenID: number;
    Name: string;
    Email: string;
  };
}
