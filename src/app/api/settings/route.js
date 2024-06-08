import fs from 'fs';
import path from 'path';
import settings from '@/lib/settings.json';
import connectMongoDB from '@/lib/mongodb';
import User from '@/models/userModel';

connectMongoDB();

const settingsPath = path.join(process.cwd(), 'src/lib', 'settings.json');

export async function GET() {
  try {
    return new Response(JSON.stringify(settings), { status: 200 });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch settings' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { allowedDays, visibleToVerifiedUser, disabledecoration } = reqBody;

    const newSettings = { allowedDays, visibleToVerifiedUser, disabledecoration };
    
    fs.writeFileSync(settingsPath, JSON.stringify(newSettings, null, 2), 'utf8');

    return new Response(JSON.stringify(newSettings), { status: 200 });
  } catch (error) {
    console.error('Failed to update settings:', error);
    return new Response(JSON.stringify({ error: 'Failed to update settings' }), { status: 500 });
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const result = await GET();
    res.status(result.status).json(JSON.parse(result.body));
  } else if (req.method === 'POST') {
    const result = await POST(req);
    res.status(result.status).json(JSON.parse(result.body));
  } else {
    res.status(405).end();
  }
}
