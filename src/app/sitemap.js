export default function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/admissions`, lastModified: new Date() },
    { url: `${baseUrl}/events`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/login`, lastModified: new Date() },
  ];
}
