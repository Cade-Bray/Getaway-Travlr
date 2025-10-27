# Full Stack Development with the MEAN stack
This project successfully implements a mock travel agency site. This site utilizes the MEAN stack. These technologies 
work together well because they all utilize the same object-oriented programming language, JavaScript. This reduces the 
overall complexity of the project.

### MEAN stands for these common technologies:
- MongoDB
- Express.js
- Angular
- Node.js

This project uses multipage application (MPA) and single page applications (SPA). MPAs are great for consumer facing sites
that need to be easily indexed by search engines. These pages are dynamic through page generation systems. In this project
we utilize the page generate handlebars. MPAs create an overall slower experience for users and require more information
to be passed around to complete a given task. SPAs on the other hand allows for multiple instances of a page through what
angular references as components. These pages allow for page to dynamically load without navigating away. This makes it 
difficult for search engines to index the page because it requires navigating to the page and loading javascript for the
page to completely render. The backend utilizes MongoDB because of its object-oriented nature is often easier and more 
adaptable over time in addition to its use javascript with other technologies in the stack.

JSON formatting is used in REST API requests which are used to link the front MPA or SPA with the backend systems. The 
JSON format is sent as the payload upon page generation or form submission. The backend is what works with the database 
directly. One major portion of programming is creating systems that don't repeat themselves. One example of this is my page
generation system with handlebars. The header and footer of each page is a single template that is called on every page 
render instead of being re-implemented. Additionally, I was able to implement a handlebars generation for that iterated 
over API returns. Testing of these APIs were done through postman and unit tests. This allows me to compare the results 
to what the next system expects. 