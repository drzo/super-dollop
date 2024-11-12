import { writeFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { apiKey, apiSecretKey } = req.body;

  if (!apiKey || !apiSecretKey) {
    return res.status(400).json({ message: 'API Key and API Secret Key are required' });
  }

  try {
    const envContent = `SHOPIFY_API_KEY=${apiKey}\nSHOPIFY_API_SECRET=${apiSecretKey}\n`;
    await writeFile(join(process.cwd(), '.env.local'), envContent, 'utf8');
    res.status(200).json({ message: 'Credentials saved successfully' });
  } catch (error) {
    console.error('Error saving credentials:', error);
    res.status(500).json({ message: 'Failed to save credentials' });
  }
}
