# Medição real de bytes

Duas builds do mesmo código/configuração, com minificação HTML/CSS/JS desativada ou ativada. Bytes em disco, sem gzip/Brotli. Imagens externas, sem inline ou recompressão.

Data: 2026-09-28T00:04:43.132Z

| Categoria | Fonte (B) | Build sem minificar (B) | Build minificada (B) | Redução por minificação |
|---|---:|---:|---:|---:|
| HTML | 20334 | 20534 | 14199 | 30.85% |
| CSS | 10628 | 10628 | 7579 | 28.69% |
| JavaScript | 17233 | 17955 | 14770 | 17.74% |
| Código | 48195 | 49117 | 36548 | 25.59% |
| Imagens | 1491432 | 1491432 | 1491432 | 0.00% |
| Total | 1539627 | 1540549 | 1527980 | 0.82% |

Fórmula: (sem minificar − minificado) / sem minificar × 100. A comparação fonte/build inclui efeitos de bundling; não mede apenas minificação. Inventário e hashes completos em sizes.json. Imagens idênticas às fontes, confirmadas por SHA-256.
