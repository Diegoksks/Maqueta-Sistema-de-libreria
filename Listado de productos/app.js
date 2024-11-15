// Funciones para abrir y cerrar el formulario de bodega
function openWarehouseForm() {
    document.getElementById("warehouseForm").style.display = "block";
  }
  
  function closeWarehouseForm() {
    document.getElementById("warehouseForm").style.display = "none";
  }
  
  // Función para guardar o actualizar bodegas
  function saveWarehouse(event) {
    event.preventDefault();
    const name = document.getElementById("warehouseName").value;
    const location = document.getElementById("warehouseLocation").value;
  
    const warehouseTable = document.getElementById("warehouseTable");
    const row = document.createElement("tr");
  
    row.innerHTML = `
      <td>${name}</td>
      <td>${location}</td>
      <td>
        <button onclick="editWarehouse(this)">Editar</button>
        <button onclick="deleteWarehouse(this)">Eliminar</button>
      </td>
    `;
    
    warehouseTable.appendChild(row);
    closeWarehouseForm();
  }
  
  // Función para eliminar bodega
  function deleteWarehouse(button) {
    const row = button.parentElement.parentElement;
    row.remove();
  }
  
  // Función para editar bodega
  function editWarehouse(button) {
    const row = button.parentElement.parentElement;
    document.getElementById("warehouseName").value = row.cells[0].innerText;
    document.getElementById("warehouseLocation").value = row.cells[1].innerText;
  
    openWarehouseForm();
    row.remove();
  }

  // Función para mostrar el formulario de registro y ocultar el de inicio de sesión
function showRegisterForm() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
  }
  
  // Función para mostrar el formulario de inicio de sesión y ocultar el de registro
  function showLoginForm() {
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
  }
  
  // Manejo de registro de usuarios
  document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtiene los valores de los campos de registro
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
  
    // Validación para confirmar que las contraseñas coinciden
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return;
    }
  
    // Cargar los usuarios desde localStorage o inicializar un arreglo vacío si no hay ninguno
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Revisar si el nombre de usuario ya existe
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      alert("Este nombre de usuario ya está registrado. Por favor, elige otro.");
      return;
    }
    
    // Añadir el nuevo usuario al arreglo de usuarios
    users.push({ username, password, role });
    
    // Guardar la lista actualizada de usuarios en localStorage
    localStorage.setItem('users', JSON.stringify(users));
  
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    
    // Cambiar al formulario de inicio de sesión después de registrarse
    showLoginForm();
    
    // Reiniciar el formulario de registro
    document.getElementById('registerForm').reset();
  });
  
  // Manejo de inicio de sesión
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obtiene los valores de los campos de inicio de sesión
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    // Cargar los usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Buscar si el usuario existe con el nombre y contraseña proporcionados
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      // Mensaje de bienvenida según el rol del usuario
      alert(`Bienvenido, ${user.role}! Redirigiendo al inicio...`);
      
      // Redirigir a la página del home (simulado aquí como "Home.html")
      window.location.href = "Home.html";
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  });
  
  // Script para cerrar sesión
document.getElementById('logoutButton').addEventListener('click', function() {
  // Borrar datos de sesión (puedes ajustarlo según cómo guardes la sesión)
  localStorage.removeItem('user'); // Si usas localStorage
  sessionStorage.removeItem('user'); // Si usas sessionStorage
  // También puedes borrar cookies si las usas
  
  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = 'index.html';
});
