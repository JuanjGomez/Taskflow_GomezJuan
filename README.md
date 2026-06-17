# TaskFlow 🚀

## 📋 Descripcion
SaaS (Software as a Service o Software como Servicio) de seguimiento y productividad diseñado para equipos de desarrollo freelance y agencias pequeñas. Permite gestionar proyectos, registrar horas trabajadas y generar reportes de facturacion.

## 🏗️ Arquitectura del Sistema
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     Frontend    │      │      Backend    │      │     Database    │
│   Next.js 14    │────▶│     Laravel 11   │────▶│  PostgreSQL 16  │
│   (App Router)  │      │     (API REST)  │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
        │                         │
        ▼                         ▼
┌─────────────────┐ ┌─────────────────┐
│     Caché       │ │   Queue/Jobs    │
│     Redis       │ │     (Redis)     │
└─────────────────┘ └─────────────────┘

## 🚀 Tecnologias

### Frontend
- **Next.js 14** - App Router, Server Components
- **TypeScript** - Tipado estricto
- **Tailwind CSS** - Esterelizado rapido
- **Shadcn/ui** - Componentes accesibles
- **React Hook Form** - Manejo de formularios
- **Zod** - Validacion de esquemas

### Backend
- **Laravel 11** - PHP 8.2+
= **Sanctum** - Autenticacion con tokens
- **Eloquent ORM** - Modelo de datos
- **Laravel Cache** - Redis para cache
- **Laravel Queue** - Procesamiento asincrono

### Infraestructura
- **Docker** - Desarrollo y produccion
- **Docker Compose** - Orquestacion
- **PostgreSQL 16** - Base de datos principal
- **Redis** - Cache y sesiones
- **Nginx** - Servidor Web (produccion)

## 📊 Modelo de Datos (ERD Simplificado)

users (id, name, email, password, role: admin|user)
│
├─── projects (id, name, description, admin_id)
│ │
│ └─── project_user (project_id, user_id) [muchos a muchos]
│
└─── time_entries (id, user_id, project_id, hours, description, date)

## 🔐 Roles y Permisos

|  Rol  |                             Permisos                             |
|-------|------------------------------------------------------------------|
| Admin | CRUD proyectos, invitar usuarios, ver todos los reportes         |
| User  | Registrar horas en proyectos asignados, ver sus propios reportes |

## 🎯 Endpoints Principales (API REST)

| Método |             Endpoint            |               Descripción           |
|--------|---------------------------------|-------------------------------------|
| POST   | /api/auth/register              | Registro de usuario                 |
| POST   | /api/auth/login                 | Login (devuelve token)              |
| GET    | /api/user                       | Obtener usuario autenticado         |
| GET    | /api/projects                   | Listar proyectos (filtrado por rol) |
| POST   | /api/projects                   | Crear proyecto (admin)              |
| GET    | /api/projects/{id}/time-entries | Horas de un proyecto                |
| POST   | /api/time-entries               | Registrar horas                     |
| GET    | /api/reports/dashboard          | Dashboard con estadísticas          |

## 🐳 Quick Start con Docker

```bash
# Clonar repositorio
git clone git@github.com:tu-usuario/timetracker-saas.git
cd timetracker-saas

# Levantar entorno de desarrollo
docker-compose up -d

# Instalar dependencias backend
docker-compose exec app composer install

# Ejecutar migraciones y seeders
docker-compose exec app php artisan migrate --seed

# Instalar dependencias frontend
docker-compose exec frontend npm install
docker-compose exec frontend npm run dev
```