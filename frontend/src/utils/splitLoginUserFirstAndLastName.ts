export function splitLoginUserFirstAndLastName(login: string | null = "") : string {
    if (!login)     
        return "Anonym"


    const regex = /([А-ЯЁ][а-яё]+)([А-ЯЁ][а-яё]+)/;

    const matches = login.match(regex);

    if (matches) {
        const firstName = matches[1];
        const lastName = matches[2];  
     
        return `${firstName} ${lastName}`
    } 

    return login
}