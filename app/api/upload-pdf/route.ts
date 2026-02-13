import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
const pdfTextExtract = require('pdf-text-extract');

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const form = formidable({ multiples: false });

    const [fields, files] = await form.parse(request as any);

    const file = files.file?.[0];
    if (!file || !file.filepath) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Parse PDF
    const text = await new Promise<string>((resolve, reject) => {
      pdfTextExtract(file.filepath, (error: any, text: string) => {
        if (error) reject(error);
        else resolve(text);
      });
    });

    // Simple parsing logic (this can be improved with better NLP)
    const parsedData = parseCVText(text);

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json({ error: 'Failed to process PDF' }, { status: 500 });
  }
}

function parseCVText(text: string) {
  // Basic regex-based parsing - this is simplistic and may need refinement
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);

  let fullName = '';
  let email = '';
  let phone = '';
  let address = '';
  let summary = '';
  const education: any[] = [];
  const workExperience: any[] = [];
  const skills: any = { technical: [], soft: [], languages: [] };

  // Find name (usually first line or capitalized)
  for (const line of lines) {
    if (line.match(/^[A-Z\s]+$/)) {
      fullName = line;
      break;
    }
  }

  // Find email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) email = emailMatch[0];

  // Find phone
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) phone = phoneMatch[0];

  // Find address (simple heuristic)
  for (const line of lines) {
    if (line.includes('Address') || line.match(/\d+.*Street|Road|Avenue/)) {
      address = line.replace('Address:', '').trim();
      break;
    }
  }

  // Summary (look for sections)
  const summaryIndex = lines.findIndex(line => line.toLowerCase().includes('summary') || line.toLowerCase().includes('objective'));
  if (summaryIndex !== -1) {
    summary = lines.slice(summaryIndex + 1, summaryIndex + 4).join(' '); // Next few lines
  }

  // Education (basic)
  const educationIndex = lines.findIndex(line => line.toLowerCase().includes('education'));
  if (educationIndex !== -1) {
    // Simple parsing - in real app, use better logic
    const eduLines = lines.slice(educationIndex + 1, educationIndex + 10);
    // Assume format: Institution, Degree, Dates
    for (let i = 0; i < eduLines.length; i += 3) {
      if (eduLines[i]) {
        education.push({
          id: `edu-${i}`,
          institution: eduLines[i],
          degree: eduLines[i + 1] || '',
          fieldOfStudy: '',
          startDate: '',
          endDate: eduLines[i + 2] || '',
        });
      }
    }
  }

  // Work Experience
  const workIndex = lines.findIndex(line => line.toLowerCase().includes('experience') || line.toLowerCase().includes('work'));
  if (workIndex !== -1) {
    const workLines = lines.slice(workIndex + 1, workIndex + 15);
    for (let i = 0; i < workLines.length; i += 4) {
      if (workLines[i]) {
        workExperience.push({
          id: `work-${i}`,
          company: workLines[i],
          position: workLines[i + 1] || '',
          location: '',
          startDate: workLines[i + 2] || '',
          endDate: workLines[i + 3] || '',
          currentlyWorking: false,
          responsibilities: [],
        });
      }
    }
  }

  // Skills
  const skillsIndex = lines.findIndex(line => line.toLowerCase().includes('skills'));
  if (skillsIndex !== -1) {
    const skillLines = lines.slice(skillsIndex + 1, skillsIndex + 10).join(' ').split(',');
    skills.technical = skillLines.map(s => s.trim());
  }

  return {
    personalData: {
      fullName,
      email,
      phone,
      address,
      city: '',
      postalCode: '',
      linkedin: '',
      website: '',
      summary,
    },
    education,
    certificates: [],
    workExperience,
    skills,
  };
}
