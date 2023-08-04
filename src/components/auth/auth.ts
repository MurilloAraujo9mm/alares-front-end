import { planController } from "../../services/api";

export async function login(username: string, password: string): Promise<boolean> {

  try {
    const { data } = await planController.auth(username, password);
    if (data && data.access_token) {
      localStorage.setItem('token', data.access_token);
      return true;
   }
  } catch (error) {
    throw error;
  }

  return false
}

export function logout(): void {
  localStorage.removeItem('token');
  window.location.replace('/login');

}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('token');
}
