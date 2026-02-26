# O Incidente — Hotsite (onepage)

Hotsite estático (HTML/CSS/JS) para promover e vender a palestra-teatro **“O Incidente”**: comédia + drama + ensino prático de Application Security em até 2 horas.

## Estrutura

```
.
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  └─ main.js
├─ robots.txt
├─ sitemap.xml
├─ LICENSE
└─ README.md
```

## Como rodar localmente

Baixe o fonte, abra o arquivo index.html no navegador.

## O que você deve editar antes de publicar

- `index.html`
  - `site_url` (canonical + OG + JSON-LD)
  - `contact_email` (mailto dos botões)
  - Links em `sameAs` (LinkedIn/X)
  - `og-image.png` (se você criar uma imagem real)
- `robots.txt` e `sitemap.xml`
  - Trocar `https://example.com/` pelo domínio real

## Deploy sugerido

- GitHub Pages
- Cloudflare Pages
- Netlify / Vercel (static)

## Licença

MIT. Veja o arquivo [LICENSE](LICENSE).
