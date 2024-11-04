
import json

def parse_json_to_dict(item: str) -> dict:
    return json.loads(item)

def author_matches(self, record, first_name, last_name, patronymic):
    try:
        authors = json.loads(record.authors)
    except json.JSONDecodeError:
        return False
    return any(
        (not first_name or author.get('first_name') == first_name) and
        (not last_name or author.get('last_name') == last_name) and
        (not patronymic or author.get('patronymic') == patronymic) for author in authors
    )