from io import BytesIO
from pathlib import Path
import sys

from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas


DIGIT_SEGMENTS = {
    "0": "ab cdef".replace(" ", ""),
    "1": "bc",
    "2": "abdeg",
    "3": "abcdg",
    "4": "bcfg",
    "5": "acdfg",
    "6": "acdefg",
    "7": "abc",
    "8": "abcdefg",
    "9": "abcdfg",
}


def draw_page_number(
    overlay_canvas: canvas.Canvas,
    value: str,
    right: float,
    bottom: float,
) -> None:
    digit_width = 2.5
    digit_height = 4.5
    gap = 1.4
    widths = [digit_width if character.isdigit() else 2.2 for character in value]
    total_width = sum(widths) + gap * (len(value) - 1)
    cursor = right - total_width
    y = bottom + 1

    overlay_canvas.setStrokeColorRGB(0.49, 0.53, 0.58)
    overlay_canvas.setLineWidth(0.45)
    overlay_canvas.setLineCap(1)

    for character, character_width in zip(value, widths, strict=True):
        if character.isdigit():
            half = digit_height / 2
            segments = {
                "a": (cursor, y + digit_height, cursor + digit_width, y + digit_height),
                "b": (cursor + digit_width, y + digit_height, cursor + digit_width, y + half),
                "c": (cursor + digit_width, y + half, cursor + digit_width, y),
                "d": (cursor, y, cursor + digit_width, y),
                "e": (cursor, y + half, cursor, y),
                "f": (cursor, y + digit_height, cursor, y + half),
                "g": (cursor, y + half, cursor + digit_width, y + half),
            }
            for segment in DIGIT_SEGMENTS[character]:
                overlay_canvas.line(*segments[segment])
        elif character == "/":
            overlay_canvas.line(cursor, y, cursor + character_width, y + digit_height)
        cursor += character_width + gap


def main() -> None:
    if len(sys.argv) < 4:
        raise SystemExit("usage: merge-pdf-pages.py OUTPUT INPUT [INPUT ...]")

    output = Path(sys.argv[1])
    inputs = [Path(value) for value in sys.argv[2:]]
    writer = PdfWriter()

    for input_path in inputs:
        reader = PdfReader(input_path)
        if len(reader.pages) != 1:
            raise ValueError(f"expected one page in {input_path}, found {len(reader.pages)}")
        writer.append(input_path, pages=(0, 1), import_outline=False)

    page_count = len(writer.pages)
    right_margin = 16 / 25.4 * 72
    bottom_margin = 6.5 / 25.4 * 72
    for index, page in enumerate(writer.pages, start=1):
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        overlay_stream = BytesIO()
        overlay_canvas = canvas.Canvas(overlay_stream, pagesize=(width, height))
        draw_page_number(
            overlay_canvas,
            f"{index:02d}/{page_count:02d}",
            width - right_margin,
            bottom_margin,
        )
        overlay_canvas.save()
        overlay_stream.seek(0)
        page.merge_page(PdfReader(overlay_stream).pages[0])

    writer.add_metadata(
        {
            "/Title": "Cho Yunho · Platform Engineer",
            "/Author": "Yunho Cho",
            "/Subject": "Platform Engineer Portfolio",
        }
    )
    with output.open("wb") as stream:
        writer.write(stream)


if __name__ == "__main__":
    main()
