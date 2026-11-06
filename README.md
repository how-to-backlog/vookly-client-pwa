<div align="center">

# 💳 Vookly — Client PWA
### Billetera Móvil de Fidelización y Gamificación Multicomercio

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-0070F3?style=for-the-badge&logo=vercel&logoColor=white)](https://turbo.build/)
[![Vercel Production](https://img.shields.io/badge/Production-Live%20Demo-emerald?style=for-the-badge&logo=vercel&logoColor=white)](https://vookly.vercel.app/)

<p align="center">
  <b>Experiencia de cliente sin contraseñas (fricción cero) para comercios de cercanía.</b><br>
  Acceso directo por WhatsApp, tarjetas interactivas apiladas, roadmap serpenteante de premios y canje seguro en mostrador.
</p>

[🌐 Ver Demo en Vivo (Producción)](https://vookly.vercel.app/) • [📱 Probar Cafetería](/local/cafeteria)

---

</div>

## 🌟 Propuesta de Valor

Vookly reemplaza las viejas tarjetas de cartón con sellos físicos por una **PWA ultraliviana (<2 seg de carga con datos móviles)** que no requiere descargar apps de tiendas ni registrar contraseñas:

- **🔑 Fricción Cero:** El cliente se identifica en caja únicamente con su número de teléfono y recibe un enlace directo a su billetera digital por WhatsApp.
- **🗂️ Billetera Multicomercio (ScrollStack):** Tarjetas apiladas con efecto 3D que agrupan todos los comercios donde el usuario suma beneficios en una sola pantalla.
- **🗺️ Roadmap Vertical Gamificado:** Un camino serpenteante interactivo que premia la recurrencia con metas visuales y micro-recompensas.
- **🛡️ Protocolo de Canje Seguro en Mostrador:** Desgarro de ticket táctil (`TearTicket`), giro de voucher 3D (`FlipCard`) y generación de token efímero de 4 dígitos con ventana de caducidad (15 min).
- **🏝️ Status Island Reactiva:** Notificaciones superiores estilo Dynamic Island con algoritmo FIFO que avisan de inmediato cuando un premio está listo o a solo 1 o 2 sellos.

---

## 📱 Pantallas de la Demo

| 1. Billetera Multicomercio | 2. Roadmap de Gamificación | 3. Canje Seguro en Mostrador |
| :---: | :---: | :---: |
| Tarjetas apiladas interactivas con `ScrollStack` y Status Island en tiempo real | Ruta de sellos dinámica con nodos táctiles y atmósfera urbana | Ticket despegable con token de 4 dígitos y reseteo en caliente `[ ↺ ]` |

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 16.4.3](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)
- **Biblioteca Base:** [React 19.3](https://react.dev/) + TypeScript 5
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) (diseño responsivo adaptativo para móviles)
- **Animaciones en GPU:** [Motion 12](https://motion.dev/) (animaciones fluidas sin reflows ni JS pesado)
- **Iconografía:** [Lucide React](https://lucide.dev/) + [Hugeicons](https://hugeicons.com/)
- **Despliegue y CDN:** [Vercel](https://vercel.com/) Edge Network

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Clonar el repositorio
```bash
git clone https://github.com/how-to-backlog/vookly-client-pwa.git
cd vookly-client-pwa
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Ejecutar el servidor de desarrollo
```bash
pnpm dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador (preferentemente en modo emulador de dispositivo móvil).

---

## 🏛️ Arquitectura del Ecosistema Vookly

```
                                [ Ecosistema Vookly ]
                                          │
            ┌─────────────────────────────┴─────────────────────────────┐
            ▼                                                           ▼
 📱 PLATAFORMA 1: PWA CLIENTE                              💻 PLATAFORMA 2: PANEL COMERCIO
 • Mobile-First para consumidores                           • WebApp Responsive (PC mostrador / Celular)
 • Acceso por WhatsApp sin contraseña                       • Carga rápida de sellos en caja (<2s)
 • Billetera multicomercio y roadmap                        • Editor de reglas, catálogo y métricas
```

---

<div align="center">

Desarrollado con ❤️ por el equipo de **Vookly**  
[Sitio Web](https://vookly.vercel.app) • [Repositorio Oficial](https://github.com/how-to-backlog/vookly-client-pwa)

</div>
