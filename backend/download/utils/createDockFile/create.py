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


# def set_page_size(doc, width_mm, height_mm):
#     """
#     Устанавливает размер страницы в документе.

#     :param doc: Объект Document
#     :param width_mm: Ширина страницы в миллиметрах
#     :param height_mm: Высота страницы в миллиметрах
#     """
#     # Конвертируем миллиметры в точки (1 мм ≈ 2.83464567 точки)
#     width_pt = width_mm * 2.83464567
#     height_pt = height_mm * 2.83464567

#     # Получаем XML элемент раздела документа
#     section = doc.sections[0]
#     section_xml = section._element

#     # Настроим размеры страницы
#     pg_sz = section_xml.find('.//w:pgSz')
#     if pg_sz is None:
#         pg_sz = OxmlElement('w:pgSz')
#         section_xml.append(pg_sz)

#     # Устанавливаем ширину и высоту страницы
#     pg_sz.set(qn('w:w'), str(int(width_pt * 20)))  # Ширина в половине точек
#     pg_sz.set(qn('w:h'), str(int(height_pt * 20)))  # Высота в половине точек

#     # Устанавливаем ориентацию страницы (по умолчанию ландшафтный)
#     pg_sz.set(qn('w:orient'), 'portrait')


# def set_cell_alignment(cell, horizontal='center', vertical='center'):
#     """
#     Устанавливает выравнивание текста в ячейке.

#     :param cell: Объект ячейки
#     :param horizontal: Горизонтальное выравнивание (left, center, right)
#     :param vertical: Вертикальное выравнивание (top, center, bottom)
#     """
#     cell_pr = cell._element.get_or_add('w:tcPr')
    
#     # Устанавливаем горизонтальное выравнивание
#     align = OxmlElement('w:jc')
#     align.set(qn('w:val'), horizontal)
#     cell_pr.append(align)
    
#     # Устанавливаем вертикальное выравнивание
#     v_align = OxmlElement('w:vAlign')
#     v_align.set(qn('w:val'), vertical)
#     cell_pr.append(v_align)

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

class DocxGenerator:
    def __init__(self, data, filename):
        self.data = data
        self.filename = filename
    

    def create_docx(self):
        doc = Document()

        # set_page_size(doc, 210, 297)
       
        
        # Добавляем заголовок
        doc.add_heading(f'Таблица с {len(self.data)}ш.т записями.', level=1)

        # Определяем заголовки таблицы
        headers = ['№', 'Название научной работы', 'Тип публикации', 'Информация об издании', 'Кол-во страниц', 'Соавторы']
        
        # Создаем таблицу с одной строкой для заголовков
        # table = doc.add_table(rows=len(self.data), cols=len(headers))
        table = doc.add_table(rows=1, cols=len(headers))
        table.width = 300
        table.style = "Table Grid"



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

            

        # Заполняем таблицу данными
        for item in self.data:
            row_cells = table.add_row().cells
            row_cells[0].text = str(item.get('id', ''))
            row_cells[1].text = item.get('name', '')
            row_cells[2].text = str(item.get('Type', ''))
            

            # row_cells[3].text = f'''
            # {item.get('title', '')} {str(item.get('data', ''))}
            # {str(item.get('tom', ''))} 
            # {str(item.get('issue', ''))}
            # {str(item.get('page_start', ''))}
            # {str(item.get('page_end', ''))}
            # '''

            row_cells[3].text = f"Название: {item.get('title', '')}. Дата: {str(item.get('data', ''))}. Томов: {str(item.get('tom', ''))}. Страницы: {str(item.get('issue', ''))} {str(item.get('page_start', ''))} {str(item.get('page_end', ''))}"
            
           
            row_cells[4].text = str(item.get('pages', ''))
            row_cells[5].text = item.get('Co_authors', '')
            # row_cells[6].text = item.get('created_at', '')
            # row_cells[7].text = item.get('updated_at', '')
            # row_cells[8].text = str(item.get('for_user', ''))

       

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