# Wakilon Gestor — Marketing para Advogados

Landing page profissional para apresentar o processo de aquisição de clientes, serviços, plataformas, planos e posicionamento da Wakilon Gestor.

## O que está incluído

- abertura imersiva com imagem otimizada;
- funil de aquisição interativo em cinco etapas;
- serviços de tráfego, páginas, qualificação, dados, presença local e direção comercial;
- planos Básico, Essencial e Completo;
- referências públicas de valores de mercado;
- apresentação profissional e perguntas frequentes;
- painel local para editar marca, imagens, contatos, textos e preços;
- Política de Privacidade e Termos de Uso;
- layout responsivo, acessível e otimizado para mobile;
- publicação automática pelo GitHub Pages.

## Painel de edição

Acesse `/painel/` no site. As configurações são armazenadas no navegador usado para editar. O painel também permite exportar e importar um arquivo de backup.

> Para alterações iguais em todos os dispositivos, edite os valores padrão em `app/site-client.tsx` e envie a atualização ao repositório.

## Publicação no GitHub Pages

O projeto foi preparado para o repositório de usuário `wak1lon.github.io`, resultando no endereço `https://wak1lon.github.io`.

1. Crie um repositório público chamado `wak1lon.github.io`.
2. Envie estes arquivos para a branch `main`.
3. Em **Settings → Pages**, escolha **GitHub Actions** como fonte.
4. O fluxo em `.github/workflows/pages.yml` fará a publicação automaticamente.

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm ci
npm run dev
```

Para gerar a versão estática usada no GitHub Pages:

```bash
npm run build:github
```

Os arquivos finais serão criados na pasta `out/`.
