Solve
A virtual tool to assist in solving multi-step linear equations. Users are able to observe how the equation is effected by performing actions on the visual representations

Getting Started To use this Solve, you'll need to take the following steps:

    Don't fork or clone this repo! Instead, create a new, empty directory on your machine and git init (or create an empty repo on Github and clone it to your local machine)
    Run the following commands:

git remote add Solve https://github.com/Ehenry92/Solve.git
git fetch Solve
git merge Solve/master

Why did we do that? Because every once in a while, Solve may be updated with additional features or bug fixes, and you can easily get those changes from now on by entering:

git fetch Solve
git merge Solve/master

Installing: Now that you've got the code, follow these steps to get acclimated: Update project name and description in package.json file

npm install

Create two postgres databases: Solve and Solve-test (you can substitute these with the name of your own application - just be sure to go through and change the package.json and server/db/db.js to refer to the new names)
    By default, running npm test will use Solve-test, while regular development uses Solve

Start" npm run start-dev will make great things happen!

If you want to run the server and/or webpack separately, you can also npm run start-server and npm run build-client.

Deployment: Prep

    Set up the Heroku command line tools
    heroku login
    Add a git remote for heroku:

    If you're creating a new app...
        heroku create or heroku create your-app-name if you have a name in mind.
        heroku addons:create heroku-postgresql:hobby-dev to add ("provision") a postgres database to your heroku dyno

    If you already have a Heroku app...
        heroku git:remote your-app-name You'll need to be a collaborator on the app.

When you're ready to deploy

    Make sure that all your work is fully committed and pushed to your master branch on Github.
    If you currently have an existing branch called "deploy", delete it now (git branch -d deploy). We're going to use a dummy branch with the name "deploy" (see below), so if you have one lying around, the script below will error
    npm run deploy - this will cause the following commands to happen in order:

    git checkout -b deploy: checks out a new branch called "deploy". Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify when we push to our heroku remote.
    webpack -p: webpack will run in "production mode"
    git add -f public/bundle.js public/bundle.js.map: "force" add the otherwise gitignored build files
    git commit --allow-empty -m 'Deploying': create a commit, even if nothing changed
    git push --force heroku deploy:master: push your local "deploy" branch to the "master" branch on heroku
    git checkout master: return to your master branch
    git branch -D deploy: remove the deploy branch

Now, you should be deployed!

Built With: PostgreSQL- Database management system Sequelize - React- JavaScript interface library Amazon Web Services- Image hosting service Express - Data Driven Documents (D3) - library for visualizing data Materalize - CSS framework Sockets - JavaScript library for realtime applications

Author: Evlis Henry
