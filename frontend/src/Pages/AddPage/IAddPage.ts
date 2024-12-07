
export interface IAuthors {
    "last_name": JSON | string;
    "first_name": JSON | string;
    "patronymic": JSON | string;
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

