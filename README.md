# Bloom Git Subtree Example

This is an example of how to create a git fork of only the public-facing web app.

## How do I do this?

- `mkdir my-subtree-example && cd my-subtree-example`
- `git clone https://github.com/bloom-housing/bloom.git .`
- `git branch -m upstream`
- `git subtree split -P apps/public/ -b master`
- `git remote rename origin core-bloom` (don't reuse "upstream"the branch name)

Now go to GitHub and make a new repo for just the subtree, which will be the new "origin"

- `git remote add origin https://github.com/YOURNAME/subtree-example-repo-name.git`
- `git push -u origin master`

## Getting Started with the resulting app

Same as if it were in the Bloom monorepo. Note that you'll be getting other Bloom packages (e.g. core and ui-components) from the public NPM repository, and those may or may not be synced up with the upstream code you just pulled from.

- `yarn install`
- `yarn dev`

## Running end-to-end tests locally

- Start the Next.js server: `yarn test`
