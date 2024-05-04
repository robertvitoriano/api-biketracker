git remote update >/dev/null 2>&1
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
    echo "Local repository is up to date."
elif [ $LOCAL = $BASE ]; then
    echo "There are changes in the remote repository. running git pull"
    git pull
else
    echo "Local changes detected. Push your changes before pulling."
fi
