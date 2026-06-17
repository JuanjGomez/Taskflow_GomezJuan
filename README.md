# Tailwind CSS

- **Mantenibilidad**: Si cambias el diseño de un boton, solo cambias la clase en ese componente, no buscas en archivos CSS gigantes.
- **Consistencia**: Usas el sistema de diseño de Tailwind (ej: `text-gray-600` siempre es el mismo gris en toda la app).
- **Curva de aprendizaje**: Una vez aprendes las clases, puedes trabajar en cualquier proyecto Tailwind sin leer documentacion.

## Agrupacion de Rutas (auth) y (dashboard)

Separacion de logica y protecion
- **Layouts diferentes**: `(atuh)` tendra un layout sin sidebar (solo fondo con el formulario), `(dashboard)` tendra sidebar + navbar.
- **Middleware**: Podemos aplicar un middleware a todo el grupo `(dashboard)` para redirigir a login si no hay sesion.

## Sobre no usar  api/ de Next.js

Usamos Laravel como API

- **Separacion de responsabilidades**: El backend (Laravel) se encarga de la logica de negocio, base de datos, autenticacion.
- **Escabilidad**: Si necesitamos una app movil en el futuro, ya tenemos la API hecha.
- **Seguridad**: Laravel tiene mas capas de seguridad (CSRF, XSS) que Next.js API Routes.

## TypesScript desde Cero

### Concepto 1: Types vs Interfaces

**Type**: Define la forma de un objeto o un valor.

```
// Type: Puede ser cualquier cosa
type Use = {
    id: number;
    name: string;
    email: string;
};

type Status = 'active' | 'inactive'; // type (veremos esto)
type ID = string | number; // Union Type
```

**Interface**: Similar a Type, pero mas orientado a objetos.

```
// Interface: Mas usadi para objetos que se exteiende
interface User {
    id: number;
    name: string;
    email: string;
}

// Diferencia clave: Interface se puede extender
interface Admin extends User {
    role: 'admin';
    permissions: string[];
}
```

### Concepto 2: Union Types (Tipos Union)

Permite que un valor sea de varios tipos.

```
// Ejemplo 1: Estado de una peticion
type RequestStatus = 'loading' | 'success' | 'error'

let status: RquestStatus = 'loading' // Valido
status = 'success' // Valido
status = 'pending' // Error: 'pending' no es un valor permitido

// Ejemplo 2: ID que puede ser numero o string;

function getItem (id: ID) {
    console.log(`Buscando item con ID: ${id}`);
}

getItem(23); // Valido
getItem('abc') // Valido
getItem(true ) // Error: boolean no esta permitido
```

¿Por qué es útil?

```
// Sin Union Types (CSS tradicional)
function handleStatus(status: string) {
    if (status === 'loading') { /* ... */ }
    if (status === 'success') { /* ... */ }
    // Si alguien pasa 'pending', no lo detectamos hasta runtime
}

// Con Unio Types (TypeScript)
type Status = 'loading' | 'success' | 'error';
function handleStatus(status: Status) {
    // TypeScript nos avisa si usamos un valor no permitido
}
```

### Concepto 3: Generics (Genericos)

Son "plantillas" que permite reutilizar codigo con diferentes tipos

Sin Generics (malo):
```
function getFirstNumber(arr: number[]): number {
    return arr[0];
}

function getFirstString(arr: string[]): string {
    return arr[0];
}

// Repetimos codigo para cad tipo
```

Con Generics (bueno):
```
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

// Ahora funcona con cualquier tipo
const fisrtNumber = getFirst<number>([1, 2, 3]); // 1 (Tipo number)
const firstNumber = getFirst<number>(['a', 'b', 'c']); // 'a' (tipo string)
const firstUser = getFirst<User>([{ id: 1, name: 'Juan' }]); // { id: 1, name: 'Juan' }
```

Ejemplo reak (React Hook):
```
// Hook generico para manejar estado de API
function useApi<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);

    // T puede ser User, Project, TimeEntry, etc.
    return { data, loading };
}

// Uso:
const { data: users } = useApi<User[]>('/api/users');
const { data: projects } = useApi<Project[]>('/api/projects');
```

### Conepto 4: Tipos en Next.js y Laravel (Ejemplo Practico)

**Escenario**: Vamos a obtener un proyecto desde Laravel.

**Laravel response con:**
```
{
    "id": 1,
    "name": "Sitio Web Cliente X",
    "description": "Desarrollo de landing page",
    "admin_id": 5,
    "created_at": ""2024-12-10T10:00:00Z
}
```

**TypeScript en Next.js:**
```
// types/index.ts
export interface Project {
    id: number;
    name: string;
    description: string;
    admin_id: number;
    created_at: string; // ISO date string
}

// Podemos extener para mas detalle
export interface ProjectWithUsers extends Project {
    admin: User;
    members: User[];
}
```