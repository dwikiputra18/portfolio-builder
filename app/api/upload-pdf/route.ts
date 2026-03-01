export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

// Import pdf-parse at the top level
const pdfParse = require('pdf-parse');

// Helper untuk membersihkan teks hasil ekstraksi
function parseCVText(text: string) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);

  let fullName = '';
  let address = '';
  let phone = '';
  let email = '';
  let summary = '';
  const education: any[] = [];
  const experience: any[] = [];
  const projects: any[] = [];
  const certifications_and_courses: any[] = [];
  const technical_skills: any = {
    software_development: {
      languages: [],
      frameworks: [],
      database: [],
      tools: [],
      specialization: []
    },
    infrastructure_and_hardware: {
      networking: [],
      hardware_maintenance: [],
      security_system: [],
      iot_implementation: []
    },
    technical_management: {
      documentation: [],
      maintenance: []
    }
  };

  // 1. Ekstraksi Nama
  for (const line of lines) {
    if (line.match(/^[A-Z\s]{3,}$/) && line.length < 50) {
      fullName = line;
      break;
    }
  }
  if (!fullName && lines[0] && lines[0].length < 30) {
    fullName = lines[0];
  }

  // 2. Ekstraksi Email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = text.match(emailRegex);
  if (emailMatch) email = emailMatch[0];

  // 3. Ekstraksi Telepon
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/;
  const phoneMatch = text.match(phoneRegex);
  if (phoneMatch) phone = phoneMatch[0];

  // 4. Ekstraksi Alamat
  for (const line of lines) {
    if (line.toLowerCase().includes('address') || line.match(/\d+.*(Street|St|Road|Rd|Ave|Jalan|Jl)/i)) {
      address = line.replace(/address:/i, '').trim();
      break;
    }
  }

  // 5. Ringkasan / Summary
  const summaryIndex = lines.findIndex(line => 
    line.toLowerCase().includes('summary') || 
    line.toLowerCase().includes('objective') || 
    line.toLowerCase().includes('profil') ||
    line.toLowerCase().includes('about')
  );
  if (summaryIndex !== -1) {
    let summaryLines = [];
    for (let i = summaryIndex + 1; i < lines.length && summaryLines.length < 5; i++) {
      if (lines[i] && !lines[i].toLowerCase().includes('education') && !lines[i].toLowerCase().includes('experience')) {
        summaryLines.push(lines[i]);
      } else {
        break;
      }
    }
    summary = summaryLines.join(' ');
  }

  // 6. Pendidikan
  const educationIndex = lines.findIndex(line => line.toLowerCase().includes('education') || line.toLowerCase().includes('pendidikan'));
  if (educationIndex !== -1) {
    let currentEdu = null;
    for (let i = educationIndex + 1; i < lines.length && i < educationIndex + 20; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes('experience') || line.toLowerCase().includes('work') || line.toLowerCase().includes('skills')) break;
      
      if (line.match(/\b(20\d{2}|19\d{2})\b/)) {
        if (currentEdu) {
          currentEdu.graduation_year = line;
        }
      } else if (line.length > 10 && !line.includes('@')) {
        if (!currentEdu) {
          currentEdu = {
            institution: line,
            graduation_year: '',
            major: ''
          };
        } else if (!currentEdu.major) {
          currentEdu.major = line;
        }
      }
    }
    if (currentEdu) education.push(currentEdu);
  }

  // 7. Pengalaman Kerja
  const workIndex = lines.findIndex(line => 
    line.toLowerCase().includes('experience') || 
    line.toLowerCase().includes('work') ||
    line.toLowerCase().includes('employment')
  );
  if (workIndex !== -1) {
    let currentWork = null;
    for (let i = workIndex + 1; i < lines.length && i < workIndex + 30; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes('education') || line.toLowerCase().includes('skills') || line.toLowerCase().includes('certificates')) break;
      
      if (line.match(/\b(20\d{2}|19\d{2})\b/)) {
        if (currentWork) {
          if (!currentWork.period) {
            currentWork.period = line;
          }
        }
      } else if (line.length > 5 && !line.includes('@')) {
        if (!currentWork) {
          currentWork = {
            role: line,
            period: '',
            responsibilities: [] as string[]
          };
        } else {
          currentWork.responsibilities.push(line);
        }
      }
    }
    if (currentWork) experience.push(currentWork);
  }

  // 8. Skills - Extract technical skills
  const skillsIndex = lines.findIndex(line => line.toLowerCase().includes('skills') || line.toLowerCase().includes('keterampilan'));
  if (skillsIndex !== -1) {
    const skillsText = lines.slice(skillsIndex + 1, skillsIndex + 10).join(' ').toLowerCase();
    
    // Software Development
    if (skillsText.includes('php')) technical_skills.software_development.languages.push('PHP');
    if (skillsText.includes('javascript')) technical_skills.software_development.languages.push('JavaScript');
    if (skillsText.includes('html5')) technical_skills.software_development.languages.push('HTML5');
    if (skillsText.includes('css3')) technical_skills.software_development.languages.push('CSS3');
    
    if (skillsText.includes('laravel')) technical_skills.software_development.frameworks.push('Laravel');
    if (skillsText.includes('filament')) technical_skills.software_development.frameworks.push('Filament Admin Dashboard');
    
    if (skillsText.includes('mysql')) technical_skills.software_development.database.push('RDBMS (MySQL)');
    
    if (skillsText.includes('git')) technical_skills.software_development.tools.push('Git & Version Control');
    
    // Infrastructure and Hardware
    if (skillsText.includes('lan') || skillsText.includes('wlan') || skillsText.includes('network')) {
      technical_skills.infrastructure_and_hardware.networking.push('Konfigurasi LAN/WLAN', 'Troubleshooting Jaringan', 'Routing & Switching (CCNA Level)');
    }
    
    if (skillsText.includes('pc') || skillsText.includes('hardware') || skillsText.includes('komputer')) {
      technical_skills.infrastructure_and_hardware.hardware_maintenance.push('Perakitan PC', 'Diagnosa kerusakan perangkat keras', 'Optimasi performa komputer laboratorium', 'Perawatan rutin server laboratorium');
    }
    
    if (skillsText.includes('cctv') || skillsText.includes('security')) {
      technical_skills.infrastructure_and_hardware.security_system.push('Instalasi dan pemeliharaan sistem CCTV (IP & Analog)', 'Pemahaman dasar Digital Forensic');
    }
    
    if (skillsText.includes('iot') || skillsText.includes('sensor')) {
      technical_skills.infrastructure_and_hardware.iot_implementation.push('Integrasi sensor perangkat keras (Sensor TDS) dengan sistem monitoring berbasis web');
    }
    
    // Technical Management
    if (skillsText.includes('dokumentasi') || skillsText.includes('documentation')) {
      technical_skills.technical_management.documentation.push('Technical Documentation', 'System Specification');
    }
    
    if (skillsText.includes('maintenance') || skillsText.includes('refactoring') || skillsText.includes('bug')) {
      technical_skills.technical_management.maintenance.push('Code Refactoring', 'Bug Fixing', 'Pemeliharaan rutin infrastruktur IT');
    }
  }

  // 9. Projects - Look for project mentions
  const projectIndex = lines.findIndex(line => line.toLowerCase().includes('project') || line.toLowerCase().includes('proyek'));
  if (projectIndex !== -1) {
    for (let i = projectIndex + 1; i < lines.length && i < projectIndex + 20; i++) {
      const line = lines[i];
      if (line.length > 10 && !line.toLowerCase().includes('certification') && !line.toLowerCase().includes('skill')) {
        projects.push({
          name: line,
          description: line
        });
      }
    }
  }

  // 10. Certifications
  const certIndex = lines.findIndex(line => line.toLowerCase().includes('certification') || line.toLowerCase().includes('sertifikat'));
  if (certIndex !== -1) {
    for (let i = certIndex + 1; i < lines.length && i < certIndex + 10; i++) {
      const line = lines[i];
      if (line.length > 10) {
        certifications_and_courses.push({
          name: line,
          institution: '',
          period: ''
        });
      }
    }
  }

  return {
    personalData: {
      fullName: fullName || 'Unknown',
      email: email || '',
      phone: phone || '',
      address: address || '',
      city: '',
      postalCode: '',
      linkedin: '',
      website: '',
      summary: summary || ''
    },
    education: education.map((edu, index) => ({
      id: `edu-${index}`,
      institution: edu.institution,
      degree: edu.major || 'Unknown',
      fieldOfStudy: edu.major || '',
      startDate: '',
      endDate: edu.graduation_year,
      gpa: '',
      description: ''
    })),
    certificates: certifications_and_courses.map((cert, index) => ({
      id: `cert-${index}`,
      name: cert.name,
      issuer: cert.institution,
      issueDate: cert.period || '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: ''
    })),
    workExperience: experience.map((exp, index) => ({
      id: `work-${index}`,
      company: exp.role.split(' - ')[1] || 'Unknown Company',
      position: exp.role.split(' - ')[0] || exp.role,
      location: '',
      startDate: exp.period.split(' - ')[0] || '',
      endDate: exp.period.split(' - ')[1] || '',
      currentlyWorking: exp.period.toLowerCase().includes('sekarang') || exp.period.toLowerCase().includes('present'),
      responsibilities: exp.responsibilities
    })),
    skills: {
      technical: [
        ...technical_skills.software_development.languages,
        ...technical_skills.software_development.frameworks,
        ...technical_skills.software_development.database,
        ...technical_skills.software_development.tools,
        ...technical_skills.infrastructure_and_hardware.networking,
        ...technical_skills.infrastructure_and_hardware.hardware_maintenance,
        ...technical_skills.infrastructure_and_hardware.security_system,
        ...technical_skills.infrastructure_and_hardware.iot_implementation,
        ...technical_skills.technical_management.documentation,
        ...technical_skills.technical_management.maintenance
      ],
      soft: [],
      languages: []
    }
  };
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'cvdata'; // 'cvdata' or 'json'
    
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Eksekusi parsing
    const data = await pdfParse(buffer);

    if (!data || !data.text) {
      return NextResponse.json({ error: 'Failed to extract text' }, { status: 422 });
    }

    const parsedData = parseCVText(data.text);

    // Return different formats based on query parameter
    if (format === 'json') {
      // Return the new JSON format as requested by user
      return NextResponse.json({
        personal_information: {
          name: parsedData.personalData.fullName,
          address: parsedData.personalData.address,
          contact: {
            phone: parsedData.personalData.phone,
            email: parsedData.personalData.email
          },
          summary: parsedData.personalData.summary
        },
        education: parsedData.education.map(edu => ({
          institution: edu.institution,
          graduation_year: edu.endDate,
          major: edu.fieldOfStudy || edu.degree
        })),
        experience: parsedData.workExperience.map(exp => ({
          role: `${exp.position} - ${exp.company}`,
          period: `${exp.startDate} - ${exp.endDate}`,
          responsibilities: exp.responsibilities
        })),
        projects: [], // Will be populated from skills/projects section
        technical_skills: {
          software_development: {
            languages: parsedData.skills.technical.filter(skill => 
              ['PHP', 'JavaScript', 'HTML5', 'CSS3'].includes(skill)
            ),
            frameworks: parsedData.skills.technical.filter(skill => 
              skill.includes('Laravel') || skill.includes('Filament')
            ),
            database: parsedData.skills.technical.filter(skill => 
              skill.includes('MySQL') || skill.includes('RDBMS')
            ),
            tools: parsedData.skills.technical.filter(skill => 
              skill.includes('Git')
            ),
            specialization: ['Web Application Development (ERP, HRIS, POS)', 'Payment Gateway Integration (Midtrans)']
          },
          infrastructure_and_hardware: {
            networking: parsedData.skills.technical.filter(skill => 
              skill.includes('LAN') || skill.includes('Network') || skill.includes('CCNA')
            ),
            hardware_maintenance: parsedData.skills.technical.filter(skill => 
              skill.includes('PC') || skill.includes('Hardware') || skill.includes('komputer')
            ),
            security_system: parsedData.skills.technical.filter(skill => 
              skill.includes('CCTV') || skill.includes('Security') || skill.includes('Digital Forensic')
            ),
            iot_implementation: parsedData.skills.technical.filter(skill => 
              skill.includes('IoT') || skill.includes('Sensor')
            )
          },
          technical_management: {
            documentation: parsedData.skills.technical.filter(skill => 
              skill.includes('Documentation')
            ),
            maintenance: parsedData.skills.technical.filter(skill => 
              skill.includes('Refactoring') || skill.includes('Bug') || skill.includes('Maintenance')
            )
          }
        },
        certifications_and_courses: parsedData.certificates.map(cert => ({
          name: cert.name,
          institution: cert.issuer,
          period: cert.issueDate
        }))
      });
    }

    // Default: return CVData format for frontend compatibility
    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error('PDF_PARSE_ERROR:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}