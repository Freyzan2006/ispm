
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

// {
//     "id": 3,
//     "Type": 1,
//     "name": "Stave 2",
//     "title": "Title 50606",
//     "data": 1956,
//     "tom": 2,
//     "issue": 666,
//     "page_start": 1,
//     "page_end": 20,
//     "pages": 21,
//     "Co_authors": "Oscar 2",
//     "created_at": "2024-07-26T06:56:59.031597Z",
//     "updated_at": "2024-07-26T06:56:59.031597Z",
//     "for_user": 1
// }