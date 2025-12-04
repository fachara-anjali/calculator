const display = document.querySelector('.display');
  const buttons = document.querySelectorAll('.buttons button');

  let currentInput = '';
  let resultShown = false;

  function formatExpression(expr) {
    return expr.replace(/×/g, '*')
               .replace(/÷/g, '/')
               .replace(/−/g, '-');
  }

  function updateDisplay() {
    display.textContent = currentInput || '0';
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const value = button.textContent;

      if (button.classList.contains('clear')) {
        
        currentInput = '';
        updateDisplay();
        return;
      }

      if (button.classList.contains('equal')) {
        try {
          const formatted = formatExpression(currentInput);
          const result = eval(formatted);
          display.textContent = result;
          currentInput = String(result);
          resultShown = true;
        } catch (e) {
          display.textContent = 'Error';
          currentInput = '';
        }
        return;
      }

      if (resultShown) {
        if (['+', '−', '×', '÷'].includes(value)) {
          resultShown = false;
        } else {
          currentInput = '';
          resultShown = false;
        }
      }

      currentInput += value;
      updateDisplay();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') {
      currentInput += e.key;
      updateDisplay();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      const symbol = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key === '-' ? '−' : '+';
      currentInput += symbol;
      updateDisplay();
    } else if (e.key === 'Enter') {
      try {
        const formatted = formatExpression(currentInput);
        const result = eval(formatted);
        display.textContent = result;
        
        currentInput = String(result);
        resultShown = true;
      } catch (err) {
        display.textContent = 'Error';
        currentInput = '';
      }
    } else if (e.key === 'Backspace') {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    } else if (e.key === 'c' || e.key === 'C') {
      currentInput = '';
      updateDisplay();
    } else if (e.key === '(' || e.key === ')') {
      currentInput += e.key;
      updateDisplay();
    } else if (e.key === '.') {
      currentInput += '.';
      updateDisplay();
    }
  });

