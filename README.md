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
