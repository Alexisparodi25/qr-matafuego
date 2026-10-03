# Matafuegos QR

Cada matafuego lleva una etiqueta con un código QR. Al escanearla con la cámara del celular aparecen sus datos.

## Dos modos de QR (se eligen en el listado, antes de imprimir)

- **Datos dentro del QR** (por defecto): el QR guarda el texto con todos los datos. Al escanearlo, el celular los muestra directo, **sin abrir ninguna página y sin internet**. Como el texto queda fijo en la etiqueta, después de cada recarga o prueba hidráulica hay que reimprimirla.
- **Link a la ficha online**: el QR abre `matafuego.html?id=...`, que muestra el estado calculado en el momento. Para actualizar las fechas alcanza con editar `data/matafuegos.json`, sin reimprimir.

## Páginas

| Página | Para qué sirve |
|---|---|
| `index.html` (inicio) | **Escanear el QR que ya trae el matafuego**, con la cámara o subiendo una foto. La información que trae el QR aparece sola, ordenada en una tabla, y se guarda en la lista "Matafuegos escaneados" (en ese celular o computadora), que se puede descargar como planilla para Excel. Si el QR trae un link (por ejemplo, a la página de la empresa de mantenimiento), muestra el link para abrirlo. |
| `etiquetas.html` | Listado de los matafuegos cargados en `data/matafuegos.json` y etiquetas QR propias para imprimir. |
| `matafuego.html?id=MF-001` | Ficha de un matafuego cargado (la abren las etiquetas en modo link). |

## Qué muestra la ficha

- **Estado general** (apto / requiere atención / vencido), calculado a partir de los vencimientos de la recarga y de la prueba hidráulica. Se marca "por vencer" 30 días antes (`DIAS_AVISO` en `js/comun.js`).
- Ubicación, sector, tipo, agente extintor y capacidad.
- Clases de fuego en las que se puede usar (A, B, C, D, K), con su descripción.
- Última recarga y vencimiento, última prueba hidráulica y vencimiento.
- Empresa de mantenimiento y teléfono.
- Marca, modelo, N° de serie, N° de cilindro, fecha de fabricación y observaciones.
- Instrucciones de uso y teléfonos de emergencia (100, 107, 911).

## Cargar los matafuegos

Todos los datos están en `data/matafuegos.json`, que arranca vacío (`[]`). Cada matafuego es un bloque como este (separá los bloques con comas, dentro de los corchetes):

```json
[
  {
    "id": "MF-001",
    "ubicacion": "Planta baja - Hall de entrada",
    "sector": "Recepción",
    "tipo": "Polvo químico seco ABC",
    "agente": "Fosfato monoamónico 90%",
    "capacidad": "5 kg",
    "clases": ["A", "B", "C"],
    "marca": "",
    "modelo": "",
    "numeroSerie": "",
    "numeroCilindro": "",
    "fechaFabricacion": "2021-10-20",
    "ultimaRecarga": "2026-02-10",
    "vencimientoRecarga": "2027-02-10",
    "ultimaPruebaHidraulica": "2021-10-20",
    "vencimientoPruebaHidraulica": "2026-10-20",
    "empresaMantenimiento": "",
    "telefonoMantenimiento": "",
    "observaciones": ""
  }
]
```
 Las fechas van en formato `AAAA-MM-DD`. El `id` es lo que se codifica en el QR, así que no lo cambies después de imprimir la etiqueta.

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
