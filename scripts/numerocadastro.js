document.getElementById('phone').addEventListener('input', function (e) {
    const input = e.target;
    const value = input.value.replace(/\D/g, ''); 
    let formattedValue = '';

    if (value.length > 0) {
      formattedValue = `+55 (${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    input.value = formattedValue;
  });