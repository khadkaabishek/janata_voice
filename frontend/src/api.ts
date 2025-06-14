const BASE_URL = "http://localhost:5001"; 
export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
  address: string;
  agreeTerms:boolean;
}) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  return response.json();
}
