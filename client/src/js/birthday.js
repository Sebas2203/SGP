
//METODO QUE VALIDA SI YA SE HA MOSTRADO LA NOTIFICACION Y MUESTRA LA NOTIFICACION SI LA FECHA DE CUMPLEAÑOS COINCIDE CON LA DE EL USUARIO
export async function checkBirthdayNotification(birthdateStr) {
  const today = new Date();

  // Extraer mes y día directo del string "2026-04-11T06:00:00.000Z"
  const [, month, day] = birthdateStr.split('T')[0].split('-').map(Number);

  const isBirthday =
    today.getMonth() + 1 === month &&
    today.getDate()       === day;

  console.log('isBirthday:', isBirthday, '| hoy:', today.getMonth()+1, today.getDate(), '| bday:', month, day);

  if (!isBirthday) return;

  const notifShown = localStorage.getItem('birthdayNotifShown');
  if (notifShown === today.toDateString()) return;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return;

  new Notification('🎂 ¡Feliz cumpleaños!', {
    body: 'El equipo te desea un excelente día.',
  });

  localStorage.setItem('birthdayNotifShown', today.toDateString());
}
