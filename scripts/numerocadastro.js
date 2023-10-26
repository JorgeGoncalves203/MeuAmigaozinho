document.getElementById('phone').addEventListener('input', function (e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  let formattedValue = '';

  if (value.length > 0) {
      formattedValue = '+55 (' + value.slice(0, 2) + ') ';
      if (value.length > 2) {
          formattedValue += value.slice(2, 3) + ' ';
          if (value.length > 3) {
              formattedValue += value.slice(3, 7) + '-';
              if (value.length > 7) {
                  formattedValue += value.slice(7, 11);
              }
          }
      }
  }

  input.value = formattedValue;
});