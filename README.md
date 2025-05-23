# Site Web de l'Association C5IN

Ce dépôt contient les sources du site web de C5IN (Association pour le Cloud Computing et les Systèmes Distribués au Cameroun), construit avec Jekyll et hébergé sur GitHub Pages.

## Prérequis

* Ruby (voir la version recommandée par GitHub Pages : [https://pages.github.com/versions/](https://pages.github.com/versions/))
* Bundler (`gem install bundler`)

## Installation Locale

1.  Clonez le dépôt :
    ```bash
    git clone [https://github.com/c5in/c5in.github.io.git](https://github.com/c5in/c5in.github.io.git)
    cd VOTRE_REPO
    ```
2.  Installez les dépendances :
    ```bash
    bundle install
    ```
3.  Lancez le serveur Jekyll localement :
    ```bash
    bundle exec jekyll serve --livereload
    ```
4.  Ouvrez votre navigateur et allez à `http://localhost:4000`.

## Ajouter du Contenu

### Articles de Blog
Créez un nouveau fichier Markdown dans le dossier `_posts/` avec le format de nom `YYYY-MM-DD-titre-de-l-article.md`.
Le front matter doit au minimum contenir :
```yaml
---
layout: post
title: "Titre de l'article"
date: YYYY-MM-DD HH:MM:SS +/-OFFSET # ex: 2025-05-28 10:00:00 +0100
categories: [categorie1, categorie2] # Optionnel
tags: [tag1, tag2] # Optionnel
description: "Courte description pour le SEO et les aperçus." # Optionnel
---
Votre contenu en Markdown ici...