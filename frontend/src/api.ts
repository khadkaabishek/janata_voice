// // src/api.ts
// export async function fetchSomeData() {
//   const response = await fetch('/api/your-endpoint');
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// }
// src/api.ts
export async function registerUser(formData: {
  name: string;
  email: string;
  password: string;
  address: string;
}) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  return response.json();
}
