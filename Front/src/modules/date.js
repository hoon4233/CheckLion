export const startDate =  new Date('2021-03-28');
export const today = new Date();

export const weekOfToday = Math.ceil(((today.getTime()-startDate.getTime())/(1000*3600*24)) / 7) ;
