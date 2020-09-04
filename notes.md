# WEBPACK FROM SCRATCH

   ## DEBUGGING
   -  ` "debugthis": "node --inspect --inspect-brk ./src/index.js" `
      -  Will allow for you to debug specified script from either VScode or Chrome
      -  Go to chrome://inspect
      -  Places break at beginning of file and allows you to step through the script's process
      - command + p -> Allows you to open 'file picker' 

   ## WATCH MODE
   - ` "dev": "npm run webpack -- --mode development --watch",` 
      - the --watch flag makes it so  that when this script is run we dont have to rerun the script to update our build. It automattically compiles whenever a change is made


   ## ES MODULE SYNTAX
   - you can export certain 'parts' of a file like so: 
      
      export const top = "top";
      export const bottom = "bottom"; 

                  -OR-
      
      export {top, bottom} (at end of file/anywhere after where exports are defined)

   - And then in index.js: 

      import {top, bottom} from "./footer";


   ## COMMONJS SYNTAX 🤢

   - module.exports -> IS your default export (example in feature/03-fem-debug-script branch, src/button.js file)

   - You cannot use common.js and ES syntax in the same file or it will throw an error

   - example of named exports in feature/03-fem-debug-script branch, src/button-styles.js file

   ## TREE SHAKING

   - Basically when an export is unused where it is imported. So when a build is run the unused/dead code is not included in the build

# WEBPACK CORE CONCEPTS (theres 4)

   # ENTRY
   - The 1st js file to load to 'kick off' app
   - Tells Webpack WHAT files to load for the browser; compliments the output property
   - We define this using entry property in config

   # OUTPUT
   - Works directly with Entry proerty, tells webpack WHERE and HOW to distribute bundles/files

   # LOADERS & RULES

   Rules allow you to specify several loaders in wp config
   - Loaders
         Tell webpack HOW to interpret and modify files (on a per file basis) before its added to dependency graph
         Are also JS modules (functions) that takes the source file and returns it in a modified state
         - basically a function that takes a source and returns a new source

         - Chaining loaders: 
         rules:[
            {
               test: /\.less$/,
               use: ['style, 'css', 'less'] 
            }
         ]
         
         -- 'test' and 'use' are base properties
         -- test -> When we come across these kinds of files
         -- use -> apply these loaders to it
         -- for every less file, use the loaders specified
         -- reads right to left so itll use 'less loader' then 'css loader' then 'style loader' -> style(css(less()))

   
   # PLUGINS
   - A ES5 'class' which implements an ~apply~ function. Allows you to hook into entire wp cycle

   - Adds functionality to Compilations(optimized bundled modules). Does everything else in Webpack that the other 3 do not

      ## ADDING PLUGINS 
      - npm install html-webpack-plugin --save -dev
      - example in feature/0310-add-first-config-mode-none branch
      - to add a plugin u must add `new` instance to plugin array (need new anytime you pass a plugin)

      ## build utils folder
      - a place to add build specific config files

      ## html-webpack-plugin
      - injects whatever output assets we have into an index.html file
 

 * You have to `import` plugins, you dont have to with loaders (they are referenced directly in config code)

   # SETTING UP LOCAL DEV SERVER
   - npm install webpack-dev-server
   - setup scripts in package.json (example in feature/0311-add-first-plugins branch) 
  
   # SPLITTING ENVIRONMENT CONFIG FILES
   `const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);`

   - leveraging the env (env.mode) object from node and passing it into require statement above ^

   npm install webpack-merge -D

   - With this package we can merge env configs with the base config (object assign?)
   webpackMerge()
      - first argument would be default config 
      - second argument would call upon modeConfig() to grab other configuration





   # USING CSS WITH WEBPACK
   - import css file/s where needed
   - Within a config file (you can specifiy a prod or dev config within 'build-utils' folder)

   - add rules (test & use) and provide css loader

   use: [
      "style-loader", "css-loader"
   ]

   -- style-loader -> Adds script tag for styles in browser
   -- css-loader -> creates array containing some info about the css file and a string of code from css  file


   # HOT MODULE REPLACEMENT 
    - take dev script 
    `"dev": "npm run webpack-dev-server -- --env.mode development"`

    - add --hot flag
    `"dev": "npm run webpack-dev-server -- --env.mode development --hot"`

    - Webpack can 'patch' changes that are made incrementally and apply them without reloading browser


    - `mini-css-extract-plugin` is used so that css is put in separate css file when build is run (example in hot module replacemaent video and in branch feature/040101-add-style-loader)
      - supports lazy loading css


   # URL LOADER & FILE LOADER

      ## url-loader
      - Converts files/images into base64 URIs. What this basically does is allows things like images to be embedded as javascript.

      module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
         return webpackMerge(
            {
               mode,
               module: {
               rules: [
                  {
                     test: /\.jpe?g$/,
                     use: ["url-loader"]
                  }
               ]
               },
               output: {
               filename: "bundle.js"
               },
               plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()]
            },
            modeConfig(mode)
         );
      };

      * In the case above, for .jpeg/.jpg files the url loader is used for those files when build is run 

      * Limit option: 
         - a base64 URI could impact performance bc the script for the image is too big

         use: [{loader: "url-loader", options: {limit: 5000}}]

         - Altering the 'use' array to being an array of objects and passing the properties above sets a limit on how big well allow script to get (5kb in this case or 5000 bytes)
         - If the file results in bigger URI then webpack creates hash url of where file will be
         - What url loader is actually doing here behind the scenes is calling upon file-loader to take image, put in dist directory and return hash url. Thats why we need install both.



   # IMPLEMENTING PRESETS
   - basically allows you to add 'on-the-fly' configs that keep you from interfering with main configs

   - example in feature/04011-adding-styles-css branch (follows Implementing presets vid where we add ts support)



      ## BUNDLE ANALYZER 
      - When webpack build it emits a stats object (where feedback in terminal comes from )

      - webpack-bundle-analyzer plugin allows you to visualize these stats

      - Creates separate dev server that you can open and provides tree visualization of whats in bundle

      - example in feature/04013-adding-presets branch


      ## COMPRESSION PLUGIN
      - takes any included assets. compresses & serves them
      - example code in feature/0414-analyze-compress-presets













   { "keys": ["super+shift+;"], "command": "move_to", "args": {"to": "eol", "extend" : false}},