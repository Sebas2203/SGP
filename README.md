# 🛡️ Sistema de Gestión de Permisos

## 🚀 Guía de Instalación

### Prerrequisitos

- Node.js instalado
- MySQL instalado
- Git instalado

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sebas2203/SGP.git
cd SGP
```

### 2. Instalar dependencias

Instala las dependencias del cliente y del servidor por separado:

```bash
# Cliente
cd client
npm install

# Servidor
cd ../server
npm install
```

### 3. Configurar variables de entorno

Dentro de la carpeta `server/`, copia el archivo de ejemplo y configura tus variables:

```bash
cp .env.example .env
```

Luego abre el archivo `.env` y completa los valores:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_base_de_datos
PORT=3000
```

### 4. Iniciar el proyecto

```bash
# Servidor
cd server
npm run dev

# Cliente (en otra terminal)
cd client
npm run dev
```

---

## 🌿 Guía de Ramas Git

### Ramas principales

| Rama        | Descripción                             |
| ----------- | --------------------------------------- |
| `main`      | Código en producción, estable           |
| `developer` | Rama de pruebas antes de pasar a `main` |

---

### Nomenclatura de ramas

| Tipo                | Formato           | Ejemplo          |
| ------------------- | ----------------- | ---------------- |
| Nueva funcionalidad | `feature/nombre`  | `feature/login`  |
| Corrección de bug   | `fix/nombre`      | `fix/login`      |
| Corrección urgente  | `hotfix/nombre`   | `hotfix/login`   |
| Mejora de código    | `refactor/nombre` | `refactor/login` |

---

### Flujo de trabajo

**1. Siempre parte desde `developer` para crear tu rama:**

```bash
git checkout developer
git pull origin developer

# Para una nueva funcionalidad
git checkout -b feature/nombre

# Para corregir un bug
git checkout -b fix/nombre

# Para una corrección urgente
git checkout -b hotfix/nombre

# Para una mejora de código
git checkout -b refactor/nombre
```

**2. Trabaja en tu rama y sube los cambios:**

```bash
git add .
git commit -m "tipo: descripción de los cambios"
git push origin feature/nombre
```

**3. Cuando termines, crea un Pull Request:**

- De `feature/nombre` → `developer`
- Nunca hacer PR directo a `main`
- Espera revisión antes de hacer merge

**4. Una vez aprobado en `developer` y probado**, un encargado hará el merge a `main`.

---

### ⚠️ Reglas importantes

- ❌ Nunca hacer push directo a `main` o `developer`
- ✅ Siempre partir desde `developer` para crear tu rama
- ✅ Usar la nomenclatura correcta en el nombre de la rama
- ✅ Mantener tu rama actualizada con `developer`

---

## 📝 Convención de Commits

Los commits deben seguir este formato:

```
tipo: descripción corta en minúsculas
```

### Tipos de commits

| Tipo       | Cuándo usarlo                                       |
| ---------- | --------------------------------------------------- |
| `feat`     | Nueva funcionalidad                                 |
| `fix`      | Corrección de un bug                                |
| `hotfix`   | Corrección urgente en producción                    |
| `docs`     | Cambios en documentación                            |
| `style`    | Cambios de formato, espacios, punto y coma          |
| `refactor` | Refactorización de código sin cambiar funcionalidad |
| `test`     | Agregar o modificar pruebas                         |
| `chore`    | Tareas de mantenimiento, dependencias               |

---

### Ejemplos

```bash
git commit -m "feat: agregar login de usuario"
git commit -m "fix: corregir error en validación del formulario"
git commit -m "docs: actualizar guía de instalación"
git commit -m "hotfix: corregir fallo crítico en producción"
git commit -m "style: formatear archivos del módulo de permisos"
```

---

### ⚠️ Reglas

- ❌ Evitar commits genéricos como `git commit -m "cambios"`
- ✅ Describir claramente qué se hizo
- ✅ Un commit por cada cambio importante
