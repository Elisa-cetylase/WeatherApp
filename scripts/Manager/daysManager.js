const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


let today = new Date();
let options = {weekday: 'long'};
let now = today.toLocaleDateString('fr-FR', options); 
// console.log(now, today);

now = now.charAt(0).toUpperCase() + now.slice(1);

let daysInOrder = daysOfWeek.slice(daysOfWeek.indexOf(now)).concat(daysOfWeek.slice(0, daysOfWeek.indexOf(now)));
// console.log(tabJoursEnOrdre);

export default daysInOrder;
