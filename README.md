# TraderzPost

## Description

While looking at the landscape for trading and buy-nothing applications we thought that many of the applications out there lacked a simple interface and were overly reliant on chat rather than an offer system. We decided to build a mobile friendly trading application that does not require users to add a credit card or spend any money.

## Installation

If you are using the netlify application then you do not need to install anything. If you are working on a local repository there is a few steps to get everything up and running. The first thing to do is make sure you have BOTH the front and back end portions of the repo downloaded. Then on each of them make sure to run "npm i" on the root level integrated terminal in order to download all the dependancies. For the back end sign into your mysql account and on the root level run "source ./db/schema.sql" in order to set up the databse. Then exit sequal and in your integrated terminal run "npm run seeds" in order to seed the database. You can then run "npm start" on both the front and back end to get them up and running. Please note that the local servers are already pre-set to run on localhost 3000, and localhost 3001 so make sure those two ports are open. If you see local host running on both of them then React should open a tab in your browser.

## Usage

In order to start you should click sign-up in order to create an account. Once you have an account and have signed in the site will take you directly to the home page in order to browse a list of all the items that are available.

![Log In Page with username and password](./assets/Screenshot%202023-06-12%20at%2011.11.48%20AM.png)

If you would like to get some more details about an item you can click view item to get an individual item page. If the item looks good you can click submit offer and input what offer you would like to give for the item. This will send a notification to the seller. If they or decline the offer it will show up in your notifications bar.

![Home page with items showing](./assets/Screenshot%202023-06-12%20at%2011.11.32%20AM.png)

If you like to post a item of your own you can go to the Post Item page where you will be prompted with a form to fill out. Note that you must fill out the entire form and upload at least one photo in order for post to work properly.

![Post an item page with the fill out form for an item](./assets/Screenshot%202023-06-12%20at%2011.12.00%20AM.png)

Once an item has been posted you can find it in Your Items where you can edit and delete each of your items.

![Notifications page that shows your recieved offers, sent offers, and accepted offers](./assets/Screenshot%202023-06-12%20at%2011.12.08%20AM.png)

## Credits

Collaborators

- Will Asbury: https://github.com/Willlasbury
- Derek Chilson: https://github.com/Derekchili
- Michael Campbell: https://github.com/mcampb8
- Alex Horning: https://github.com/alexandertbh

Technologies

- React: https://react.dev/
- Tailwind: https://tailwindcss.com/
- MySQL: https://www.mysql.com/
- Sequalize: https://sequelize.org/
- Dom-router: https://reactrouter.com/en/main
- Cloudinary: https://cloudinary.com/
- SocketIO: https://socket.io/
- Netlify: https://www.netlify.com/
- Heroku: https://www.heroku.com/

## License

MIT License

Copyright (c) 2023 Alex Horning

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
