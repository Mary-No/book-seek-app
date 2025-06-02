import { useRef, useEffect } from 'react';


type BookCoverProps = {
    imageUrl: string;
    title: string;
    author: string;
    width?: number;
    height?: number;
}

function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

const BookCoverWithText = ({
                                                         imageUrl,
                                                         title,
                                                         author,
                                                         width = 200,
                                                         height = 260,
                                                     }: BookCoverProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            requestAnimationFrame(() => {
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            const maxTextWidth = width - 20;

            ctx.font = 'bold 16px Arial';
            const titleLines = wrapText(ctx, title, maxTextWidth);

            ctx.font = 'italic 14px Arial';
            const authorLines = wrapText(ctx, author, maxTextWidth);

            const padding = 10;
            const lineHeightTitle = 18;
            const lineHeightAuthor = 16;
            const rectHeight = titleLines.length * lineHeightTitle + authorLines.length * lineHeightAuthor + padding * 2;
            const rectY = height - rectHeight - 40;


            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.fillRect(0, rectY, width, rectHeight);


            ctx.shadowColor = 'black';
            ctx.shadowBlur = 4;

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';

            let y = rectY + padding + lineHeightTitle - 4;

            ctx.font = 'bold 16px Arial';
            titleLines.forEach((line) => {
                ctx.fillText(line, width / 2, y);
                y += lineHeightTitle;
            });

            ctx.font = 'italic 14px Arial';
            authorLines.forEach((line) => {
                ctx.fillText(line, width / 2, y);
                y += lineHeightAuthor;
            });
        })};

        img.src = imageUrl;
    }, [imageUrl, title, author, width, height]);

    return (

            <canvas
                ref={canvasRef}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                    display: 'block',
                }}

            />


    );
};

export default BookCoverWithText;
