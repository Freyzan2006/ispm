
export const startYear = 1950;
export const endYear = new Date().getFullYear(); 



const generateYearRange = (startYear: number, endYear: number) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return years;
};

export const yearsRage = generateYearRange(startYear, endYear);