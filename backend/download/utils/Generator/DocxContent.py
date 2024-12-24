from typing import List

from docx.shared import RGBColor

class DocxContent:
    def __init__(self, data, user) -> None:
        self.data = data
        self.user = user

    def get_table(self):
        pass 

    def get_title_text(self) -> str:
        dates = {rec["data"] for rec in self.data}

        return f"""
        В Национальном университете Узбекистана имени Мирзо Улугбека
        НИИ физики полупроводников и микроэлектроники
        {self.user.username or "Аноним"}, заведующий лабораторией «Возобновляемые источники энергии»
        СПИСОК НАУЧНЫХ ПУБЛИКАЦИЙ
        ({min(dates)} - {max(dates)} годы)
        """  


    def create_heading_table(self, table, docxStyle, headers: List[str]) -> str:
        hdr_cells = table.rows[0].cells
        for i, header in enumerate(headers):
            hdr_cells[i].text = header
            docxStyle.set_bold(hdr_cells[i])  # Делаем заголовки жирными
            docxStyle.set_font_color(hdr_cells[i], RGBColor(0, 0, 0))
            docxStyle.set_horizontal_alignment(hdr_cells[i], 'center') 
            docxStyle.set_vertical_alignment(hdr_cells[i], 'center')
            docxStyle.set_font(hdr_cells[i])    


    def create_body_table(self):
        pass 