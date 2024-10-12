# from download.utils.createDockFile.file import File

# current_file = None 
# def createDocxFile(data):
#     global current_file
#     if current_file is None:
#         current_file = File(name="temp")
#     current_file.create(data=data)

#     result = current_file.save()
#     return result





from docx import Document
from docx.oxml import OxmlElement
from docx.oxml.ns import qn


from table.models import PublicationType

from docx.shared import RGBColor

def set_bold(cell):
    """
    Устанавливает жирное начертание текста в ячейке.

    :param cell: Объект ячейки
    """
    # Получаем первый элемент run в ячейке
    for paragraph in cell.paragraphs:
        for run in paragraph.runs:
            run.bold = True


def set_font_color(cell, rgb_color):
    """
    Устанавливает цвет текста в ячейке.

    :param cell: Объект ячейки
    :param rgb_color: Цвет в формате RGB, например, RGBColor(255, 0, 0) для красного
    """
    for paragraph in cell.paragraphs:
        for run in paragraph.runs:
            run.font.color.rgb = rgb_color


from docx.shared import Inches, Pt

from utils.parseCoauthor import parse_json_to_dict


def set_vertical_alignment(cell, alignment="center"):
    """
    Устанавливает вертикальное выравнивание текста в ячейке.
    
    :param cell: Объект ячейки
    :param alignment: Значение выравнивания (top, center, bottom)
    """
    tc_pr = cell._element.get_or_add_tcPr()
    v_align = OxmlElement('w:vAlign')
    v_align.set(qn('w:val'), alignment)
    tc_pr.append(v_align)

from docx.oxml.ns import qn

class DocxGenerator:
    def __init__(self, data, filename):
        self.data = data
        self.filename = filename
    
    def set_column_width(self, table, widths):
        for row in table.rows:
            for idx, width in enumerate(widths):
                row.cells[idx].width = width
    
    
    def set_font(self, cell, font_name='Times New Roman', font_size=12):
        """Устанавливаем шрифт для текста в ячейке"""
        for paragraph in cell.paragraphs:
            for run in paragraph.runs:
                run.font.name = font_name
                run.font.size = Pt(font_size)
                
                # Для совместимости с Word необходимо установить 'w:rFonts' через xml
                rFonts = run._element.rPr.rFonts
                rFonts.set(qn('w:eastAsia'), font_name)

    def create_docx(self):
        doc = Document()
        
      
       
        
        # Добавляем заголовок
        doc.add_heading(f'Таблица с {len(self.data)}ш.т записями.', level=1)

        # Определяем заголовки таблицы
        headers = ['№', 'Название научной работы', 'Тип публикации', 'Информация об издании', 'Кол-во страниц', 'Соавторы']
        
        # Создаем таблицу с одной строкой для заголовков
        # table = doc.add_table(rows=len(self.data), cols=len(headers))
        table = doc.add_table(rows=1, cols=len(headers))
        table.style = "Table Grid"
        # table.font  = "Times New Roman"
        
        

        
        section = doc.sections[0]
        page_width = section.page_width - section.left_margin - section.right_margin
        
        column_widths = [
            page_width * 0.01,  # № (1%)
            page_width * 0.1,   # Название научной работы (10%)
            page_width * 0.1,   # Тип публикации (10%)
            page_width * 0.35,  # Информация об издании (35%)
            page_width * 0.01,   # Кол-во страниц (1%)
            page_width * 0.39    # Соавторы (39%)
        ]

        


        section = doc.sections[-1]
        section.top_margin = Inches(0.8) #Верхний отступ
        section.bottom_margin = Inches(0.8) #Нижний отступ
        section.left_margin = Inches(0.3) #Отступ слева
        section.right_margin = Inches(0.3) #Отступ справа
                

        # Заполняем заголовки
        hdr_cells = table.rows[0].cells
        for i, header in enumerate(headers):
            hdr_cells[i].text = header
            set_bold(hdr_cells[i])  # Делаем заголовки жирными
            set_font_color(hdr_cells[i], RGBColor(63, 38, 186))
            set_vertical_alignment(hdr_cells[i], 'center')
            self.set_font(hdr_cells[i])   
                   

        

        # Заполняем таблицу данными
        for item in self.data:
            row_cells = table.add_row().cells
            row_cells[0].text = str(item.get('id', ''))
            row_cells[1].text = item.get('name', '')
            row_cells[2].text = str(PublicationType.objects.get(pk = int( item.get('Type', ''))))
            

            # row_cells[3].text = f'''
            # {item.get('title', '')} {str(item.get('data', ''))}
            # {str(item.get('tom', ''))} 
            # {str(item.get('issue', ''))}
            # {str(item.get('page_start', ''))}
            # {str(item.get('page_end', ''))}
            # '''

            row_cells[3].text = f"{item.get('title', '')}, {str(item.get('data', ''))}, {str(item.get('tom', ''))}, {str(item.get('issue', ''))}"
            row_cells[4].text = f"от {str(item.get('page_start', ''))} до {str(item.get('page_end', ''))} всего {str(item.get('pages', ''))}"
            # row_cells[5].text = item.get('Co_authors', '')
            
            for i, key in enumerate(parse_json_to_dict(item.get("authors", []))):
                row_cells[5].text += f"{i + 1} Ф: {key['last_name']} И: {key['first_name']}; О: {key['patronymic']}\n\n" 
         
            for cell in row_cells:
                self.set_font(cell)
          
        self.set_column_width(table, column_widths)

        # Сохраняем документ
        doc.save(self.filename)

    # def create_docx(self):
    #     doc = Document()

    #     table = doc.add_table(rows=len(self.data), cols = 8)

    #     table.style = "Table Grid"

    #     for row in range(len(self.data)):
    #         for col in range(8):
    #             cell = table.cell(row, col)
    #             cell.text = str(row)

    #     doc.save(self.filename)


   

    # def create_docx(self):
    #     doc = Document()
    #     doc.add_heading('Table Data', level=1)
        
    #     # Создание таблицы
    #     table = doc.add_table(rows=1, cols=len(self.data[0]))
    #     hdr_cells = table.rows[0].cells
    #     headers = ['id', 'Type', 'name', 'title', 'data', 'tom', 'issue', 'page_start', 'page_end', 'pages', 'Co_authors', 'created_at', 'updated_at', 'for_user']
        
    #     for i, header in enumerate(headers):
    #         hdr_cells[i].text = header

    #     for item in self.data:
    #         row_cells = table.add_row().cells
    #         row_cells[0].text = str(item['id'])
    #         row_cells[1].text = str(item['Type'])
    #         row_cells[2].text = item['name']
    #         row_cells[3].text = item['title']
    #         row_cells[4].text = str(item['data'])
    #         row_cells[5].text = str(item['tom'])
    #         row_cells[6].text = str(item['issue'])
    #         row_cells[7].text = str(item['page_start'])
    #         row_cells[8].text = str(item['page_end'])
    #         row_cells[9].text = str(item['pages'])
    #         row_cells[10].text = item['Co_authors']
    #         row_cells[11].text = item['created_at']
    #         row_cells[12].text = item['updated_at']
    #         row_cells[13].text = str(item['for_user'])

    #     doc.save(self.filename)