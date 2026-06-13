from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import mm

INPUT_MD = '../Guide_d_installation.md'
OUTPUT_PDF = '../Guide_d_installation.pdf'

def md_to_story(md_text):
    styles = getSampleStyleSheet()
    h1 = ParagraphStyle('Heading1', parent=styles['Heading1'], fontSize=18, leading=22)
    h2 = ParagraphStyle('Heading2', parent=styles['Heading2'], fontSize=14, leading=18)
    body = ParagraphStyle('Body', parent=styles['BodyText'], fontSize=11, leading=15)

    story = []
    lines = md_text.splitlines()
    buffer = []

    def flush_buffer():
        nonlocal buffer
        if not buffer:
            return
        text = ' '.join(line.strip() for line in buffer if line.strip())
        story.append(Paragraph(text, body))
        story.append(Spacer(1, 6))
        buffer = []

    for line in lines:
        if line.startswith('# '):
            flush_buffer()
            story.append(Paragraph(line[2:].strip(), h1))
            story.append(Spacer(1, 6))
        elif line.startswith('## '):
            flush_buffer()
            story.append(Paragraph(line[3:].strip(), h2))
            story.append(Spacer(1, 6))
        elif line.startswith('```'):
            # skip code fences but treat following lines as preformatted
            flush_buffer()
            continue
        elif line.startswith('- ') or line.startswith('* '):
            buffer.append('• ' + line[2:].strip())
        elif line.strip() == '---':
            flush_buffer()
            story.append(Spacer(1, 6))
        else:
            buffer.append(line)
    flush_buffer()
    return story


def main():
    with open(INPUT_MD, 'r', encoding='utf-8') as f:
        md = f.read()

    doc = SimpleDocTemplate(OUTPUT_PDF, pagesize=A4,
                            rightMargin=20*mm, leftMargin=20*mm,
                            topMargin=20*mm, bottomMargin=20*mm)
    story = md_to_story(md)
    doc.build(story)
    print('PDF généré:', OUTPUT_PDF)

if __name__ == '__main__':
    main()
