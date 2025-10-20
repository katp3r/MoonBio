import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('avatar');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'Нет файла avatar' }, { status: 400 });
  }
  const ext = (file.name && file.name.split('.').pop()) || 'jpg';
  const filename = `${uuidv4()}.${ext}`;
  const outputPath = path.join(process.cwd(), 'public', 'avatars', filename);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(outputPath, buffer);
  return NextResponse.json({ filename });
}
