// Тестовый скрипт для проверки API
const testAPI = async () => {
  try {
    // Тест регистрации
    const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test User',
        password: 'password123'
      })
    });

    const registerData = await registerResponse.json();
    console.log('Регистрация:', registerData);

    if (registerResponse.ok) {
      // Тест авторизации
      const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });

      const loginData = await loginResponse.json();
      console.log('Авторизация:', loginData);
    }

  } catch (error) {
    console.error('Ошибка тестирования API:', error);
  }
};

// Запуск теста через 2 секунды после загрузки страницы
setTimeout(testAPI, 2000);
