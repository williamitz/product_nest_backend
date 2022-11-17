
export const passwordPatt = new RegExp(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);

export const fullTextPatt = new RegExp(/^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\.\,\s]{0,200}$/);

export const timeZonePatt = new RegExp(/^[a-zA-Z\/\_]{0,50}$/);

export const isoThreePatt = new RegExp(/^[a-zA-Z]{2,3}$/);

export const codePatt = new RegExp(/^[a-zA-Z]{2,10}$/);

export const symbolPatt = new RegExp(/^[a-zA-Z\.\$\/]{2,5}$/);

export const prefixPhonePatt = new RegExp(/^[\+\d]{2,6}$/);
