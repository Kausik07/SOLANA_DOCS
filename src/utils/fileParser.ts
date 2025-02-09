import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const extractTextFromFile = async (file: File): Promise<string> => {
  try {
    const buffer = await file.arrayBuffer();
    
    if (file.type === 'application/pdf') {
      const data = await pdf(Buffer.from(buffer));
      return data.text;
    }

    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value;
    }

    throw new Error('Unsupported file format');
  } catch (error) {
    console.error('File parsing error:', error);
    throw new Error('Failed to parse file. Please ensure it is a valid PDF or DOCX document.');
  }
}; 