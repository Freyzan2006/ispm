

export const noSpecialChars = (value: string) => /^[a-zA-Z0-9-а-яА-ЯёЁ"“”<>_,№ ]*$/.test(value) || 'Вы используете не допустимые символы';
export const noSpecialCharsMessage = `Символы которые нельзя использовать: !@#$%^&*()+-={}[]|:;'<>.?/ `;