
export interface IParseDate {
    year: string;
    month: string;
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export const ParseDate = (time: string) => {

    const date = new Date(time)

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    return {
        year, month, day, hours,
        minutes, seconds
    }
}




