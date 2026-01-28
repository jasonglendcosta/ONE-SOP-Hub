import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat } from 'fs/promises';
import path from 'path';
import { getSOPFilePath, hasSOPFile } from '@/lib/sop-files';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sopId = searchParams.get('id');

  if (!sopId) {
    return NextResponse.json(
      { error: 'SOP ID is required' },
      { status: 400 }
    );
  }

  // Check if we have a file mapping for this SOP
  if (!hasSOPFile(sopId)) {
    return NextResponse.json(
      { error: 'No file found for this SOP', sopId },
      { status: 404 }
    );
  }

  const filePath = getSOPFilePath(sopId);

  if (!filePath) {
    return NextResponse.json(
      { error: 'Could not resolve file path' },
      { status: 500 }
    );
  }

  try {
    // Check if file exists
    const fileStats = await stat(filePath);

    if (!fileStats.isFile()) {
      return NextResponse.json(
        { error: 'Path is not a file' },
        { status: 404 }
      );
    }

    // Read the file
    const fileBuffer = await readFile(filePath);

    // Get the filename from the path
    const fileName = path.basename(filePath);

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileStats.size.toString(),
      },
    });
  } catch (error) {
    console.error('Error serving SOP file:', error);

    // Check if it's a file not found error
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return NextResponse.json(
        { error: 'File not found on disk', path: filePath },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to read file', message: (error as Error).message },
      { status: 500 }
    );
  }
}
