import { IQRResource } from '../data/models/qr-resource.interface';

export default class PDFRenderer {
    entries: IQRResource[] = [];
    addEntry(resource: IQRResource): void {
        this.entries.push(resource);
    };
    render(pdfDocument, filename: string, pageTitle: string = 'Links to useful resources'): void {
        pdfDocument.setTextColor('0.30', '0', '0', '1');
        pdfDocument.setFontSize(20);
        pdfDocument.setFontStyle('bold');
        pdfDocument.text(15, 16, pageTitle);

        let index = 0;
        let resourceCount = 1;
        this.entries.forEach((entry: IQRResource) => {
            pdfDocument.addImage(entry.qrImage, 'SVG', 15, 29 + (43 * index), 28, 28);
            pdfDocument.setFontSize(14);
            pdfDocument.setFontStyle('bold');
            pdfDocument.text(52, 32 + (43 * index), entry.name);
            pdfDocument.setFontSize(12);
            pdfDocument.setFontStyle('normal');
            pdfDocument.text(52, 40 + (43 * index), this.splitDescription(entry.description));
            if ((index + 1) < this.entries.length) {
                pdfDocument.rect(15, 64 + (43 * index), 176, 0.5, 'F');
            }

            index++;
            resourceCount++;
            if (index > 5 && resourceCount <= this.entries.length) {
                index = 0;
                pdfDocument.addPage();
            }
        });

        pdfDocument.save(filename);
    }

    // TODO - need a better way of doing this, determining line lengths etc
    // but this should work for now!
    private splitDescription(description: string): string[] {
        const words = description.split(' ');
        let descriptionLines: string[] = [];
        let descriptionLineWords: string[] = [];

        words.forEach((word: string) => {
            if ((descriptionLineWords.join(' ') + ' ' + word).length > 70) {
                descriptionLines.push(descriptionLineWords.join(' '));
                descriptionLineWords = [];
            }
            descriptionLineWords.push(word);
        });
        if (descriptionLineWords.length > 0) descriptionLines.push(descriptionLineWords.join(' '));
        return descriptionLines;
    }
}
