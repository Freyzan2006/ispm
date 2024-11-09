
export interface IAuthors {
    "last_name": string;
    "first_name": string;
    "patronymic": string;
}

export interface IFrom {
    "Type": number;
    "name": string;
    "title": string;
    "data": number;
    "tom": number;
    "issue": number;
    "page_start": number;
    "page_end": number;
    "pages": number;
    "authors": IAuthors[];
    "for_user": number;
}

