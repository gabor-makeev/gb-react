## Deploy to GitHub Pages

1. Go to public/index.html and replace the value of the href attribute of the base element with the name of the GitHub repository. For example:
<br>"/[name of the repository]/"
2. Go to src/constants.ts and replace the value of the BASE_URL constant with the name of the GitHub repository (usually, the name of the repository is stored in the Url enum at the ghPages property). For example:
<br>"/[name of the repository]/"
3. Rebuild the project and deploy it on GitHub Pages. You can use either: `npm run deploy:web` or `npm run build && gh-pages -d build`