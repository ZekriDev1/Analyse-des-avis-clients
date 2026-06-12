import re
from html import unescape


def clean_text(text: str) -> str:
    text = unescape(text or '')
    text = text.lower()
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'[^a-z0-9àâäéèêëïîôöùûüçœæ\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()
