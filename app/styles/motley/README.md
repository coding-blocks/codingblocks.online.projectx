# Motley
Motley is a new generation CSS framework based on [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) and [Sass](https://sass-lang.com/) , it allows you to design component-driven webpages with little or no effort. 

 ## Building and Running Motley Locally
 Building and running Motley in your local dev environment is very easy. Be sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/en/docs/install) installed, then follow the directions below. 
 
 1. Clone the source code

 `git clone https://github.com/coding-blocks/motley.git`

2. Change directory to `motley` and Install development dependencies

`cd motley`

 `yarn install`

3. Run a local development server

 `yarn start`
 
 Motley will start running on [localhost:9000](http://localhost:9000/).
 
 ## Directory Structure
 
 ```
  | sass/styles     contains sass files
  | examples
    - public        contains static assets
    - components    contains individual components
                    these are registered as partials and can be used in pages or other components
    - views         Individual pages, gets build into examples/html/*.html files
 ```
 
 # See Motley in Action
- The application of Motley can be seen here [online.codingblocks.com](https://online.codingblocks.com/) 
  We want Motley to be as easy to use, install, run, and develop for as many as
  possible, and your feedback will help us get there!

 ## Maintainers
 
 1. [Aayush Arora](https://github.com/aayusharora) 
 2. [Vibhu Dujari](https://github.com/vdvibhu20)
 3. [Abhishek Gupta](https://github.com/abhishek97)

 
 
