Solve
A virtual tool to assist in solving multi-step linear equations. Users are able to observe how the equation is effected by performing actions on the visual representations


To use this repo, you'll need to take the following steps:

    Don't fork or clone this repo! Instead, create a new, empty directory on your machine and git init (or create an empty repo on Github and clone it to your local machine)
    Run the following commands:

git remote add solve https://github.com/FullstackAcademy/solve.git
git fetch solve
git merge solve/master

Every once in a while, Solve may be updated with additional features or bug fixes, and you can easily get those changes from now on by entering:

git fetch solve
git merge solve/master

Customize

Now that you've got the code, follow these steps to get acclimated:

    Update project name and description in package.json file

    npm install, or yarn install - whatever you're into

    Create two postgres databases: solve and solve-test (you can substitute these with the name of your own application - just be sure to go through and change the package.json and server/db/db.js to refer to the new names)
        By default, running npm test will use solve-test, while regular development uses solve


    Finally, complete the section below to set up your linter

Linting

Linters are fundamental to any project - they ensure that your code has a consistent style, which is critical to writing readable code.

Solve comes with a working linter (ESLint, with eslint-config-fullstack) "out of the box." However, everyone has their own style, so we recommend that you and your team work out yours and stick to it. Any linter rule that you object to can be "turned off" in .eslintrc.json. You may also choose an entirely different config if you don't like ours:

    Standard style guide
    Airbnb style guide
    Google style guide

Start

npm run start-dev will make great things happen!

If you want to run the server and/or webpack separately, you can also npm run start-server and npm run build-client.

From there, just follow your bliss.
Deployment

Ready to go world wide? Here's a guide to deployment!
Prep

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

Built With:
  PostgreSQL- Database management system
  Sequelize -
  React- JavaScript interface library
  Express -
  Materalize - CSS framework

Solve Developer:
  Evlis Henry
