# from django.core.files.base import ContentFile
# import docx
# import os 

# from download.models import DownloadTableModel

# from backend.settings import MEDIA_ROOT


# class File:
#     name: str 
#     doc: object
#     path: str 

#     def __init__(self, name: str):
#         self.doc = docx.Document()
#         self.name = name + ".docx"
#         self.path = f"{MEDIA_ROOT}/temp/{self.name}" 

    
#     def create(self, data):
#         table = self.doc.add_table(rows=len(data), cols=8)

#         hdr_cells = table.rows[0].cells
#         hdr_cells[0].text = '№' 
#         hdr_cells[1].text = 'Название научной работы'  
#         hdr_cells[2].text = 'Тип публикации' 
#         hdr_cells[3].text = 'Информация об издании' 
#         hdr_cells[4].text = 'Кол-во страниц'  
#         hdr_cells[5].text = 'Соавторы'  
#         hdr_cells[6].text = 'Дата создания публикации на сайте'  
#         hdr_cells[7].text = 'Дата обновления публикации на сайте' 

        
#         for obj in data:
#             row_cells = table.add_row().cells
#             row_cells[0].text = str(obj["id"])  
#             row_cells[1].text = str(obj["name"])  
#             row_cells[2].text = str(obj["Type"])
#             row_cells[3].text = f"""
#             Название:{ obj["title"] }. 
#             Дата публикации:{ obj["data"] }. 
#             Томов: { obj["tom"] }. 
#             Страницы: от { obj["page_start"] } до { obj["page_end"] }
#             """
#             row_cells[4].text = str(obj["pages"])
#             row_cells[5].text = str(obj["Co_authors"])
#             row_cells[6].text = str(obj["created_at"])
#             row_cells[7].text = str(obj["updated_at"]) 

    
#     def save_file_to_database(self):
#         with open(self.path, 'rb') as file:
#             content = file.read()
#             file_name = self.name
#             print(self.path)
#             download_table_instance = DownloadTableModel(name=self.name)
#             download_table_instance.file_table.save(file_name, ContentFile(content), save=True) 
#             return download_table_instance
    
    
#     def save(self):
#         self.doc.save(self.path) 
#         output = self.save_file_to_database()
#         os.remove(f"{MEDIA_ROOT}/temp/temp.docx")
#         return output
    
#     def __str__(self):
#         return self.name 