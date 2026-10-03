# Matafuegos QR

Sitio web estático: cada matafuego lleva una etiqueta con un código QR y, al escanearla con el celular, se abre su ficha con toda la información relevante.

## Páginas

| Página | Para qué sirve |
|---|---|
| `index.html` | Listado de matafuegos con su estado, buscador y **etiquetas QR para imprimir**. |
| `matafuego.html?id=MF-001` | Ficha del matafuego (la página que abre el QR). |
| `escanear.html` | Escáner con la cámara desde el navegador, o búsqueda manual por ID. |

## Qué muestra la ficha

- **Estado general** (apto / requiere atención / vencido), calculado a partir de los vencimientos de la recarga y de la prueba hidráulica. Se marca "por vencer" 30 días antes (`DIAS_AVISO` en `js/comun.js`).
- Ubicación, sector, tipo, agente extintor y capacidad.
- Clases de fuego en las que se puede usar (A, B, C, D, K), con su descripción.
- Última recarga y vencimiento, última prueba hidráulica y vencimiento.
- Empresa de mantenimiento y teléfono.
- Marca, modelo, N° de serie, N° de cilindro, fecha de fabricación y observaciones.
- Instrucciones de uso y teléfonos de emergencia (100, 107, 911).

## Cargar los matafuegos

Todos los datos están en `data/matafuegos.json`. Para agregar uno, copiá un bloque existente y cambiá los valores. Las fechas van en formato `AAAA-MM-DD`. El `id` es lo que se codifica en el QR, así que no lo cambies después de imprimir la etiqueta.

## Publicarlo (GitHub Pages)

1. En GitHub: **Settings → Pages → Deploy from a branch** y elegí la rama y la carpeta `/ (root)`.
2. Entrá a `https://<usuario>.github.io/qr-matafuego/` e imprimí las etiquetas desde el listado.

Los QR se generan con la URL desde la que abriste el listado, así que imprimilos **desde la dirección publicada**, no desde tu computadora local.

> El escáner del navegador necesita HTTPS para acceder a la cámara (GitHub Pages ya lo tiene). La cámara nativa del celular también lee los QR sin entrar a esta página.

## Probarlo en tu computadora

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Librerías incluidas

En `js/vendor/`, para no depender de CDNs:
- [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) (MIT): genera los QR.
- [html5-qrcode](https://github.com/mebjas/html5-qrcode) (Apache 2.0): lee QR con la cámara.
