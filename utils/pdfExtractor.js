// utils/pdfExtractor.js
import pdf from 'pdf-parse';

export const extractDataFromPDF = async (pdfBuffer) => {
    let data = await pdf(pdfBuffer);

    // Extracted text data
    const text = data.text;

    // Extracted images can be found in data.pages[n].images
    const images = data.pages.flatMap(page => page.images);

    return { text, images };
}
