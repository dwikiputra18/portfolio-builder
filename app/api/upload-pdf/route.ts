export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // ✅ Convert file ke Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ Dynamic require (AMAN untuk Turbopack)
    const pdfParse = (await import('pdf-parse')).default;

    const data = await pdfParse(buffer);

    return NextResponse.json({
      text: data.text,
    });

  } catch (error) {
    console.error('PDF ERROR:', error);

    return NextResponse.json(
      { error: 'Failed to process PDF' },
      { status: 500 }
    );
  }
}
