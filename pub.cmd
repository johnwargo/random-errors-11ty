git add -A
git commit -m "updated %date% %time%"
git push
call npm version patch
git add -A
git commit -m "Updated package version"
git push
call gen-build-info src/_data