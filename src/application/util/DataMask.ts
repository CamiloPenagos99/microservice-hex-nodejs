//enmascarar correo

export const maskEmail = (correo: string): string => {
    if (!correo) return correo;
    const [partOne, partTwo] = correo.split('@');
    const longitud = partOne.length;
    const n = longitud - 3;
    const mask = '*'.repeat(n);
    return `${correo.charAt(0)}${mask}${partOne.slice(partOne.length - 2)}@${partTwo}`;
};

//enmascarar telefono
export const maskPhone = (telefono: string): string => {
    if (!isValidPhoneNumber(telefono)) return '';
    const longitud = telefono.length;
    const n = longitud - 3;
    const mask = '*'.repeat(n);
    return `${telefono.charAt(0)}${mask}${telefono.slice(telefono.length - 2)}`;
};

//validación formato numero
export const isValidPhoneNumber = (phone: string): boolean => {
    return !(phone.charAt(0) !== '3' || phone.length <= 9 || phone.length >= 13);
};
