git checkout -b gh-master
git add src/ClientApp/dist -f
git commit -m "GitHub Pages commit"
git subtree split --prefix src/ClientApp/dist -b gh-pages
git push -f origin gh-pages:gh-pages
git branch -D gh-pages
git checkout master
git branch -D gh-master