# XZY-CS374-Project
Project contributor:
Team XZY

## Front-end files: 
1. index.html (home page)
2. addNewKid.html (the page for adding a new kid)
3. task choosing.html (task choosing menu)
4. Make Log.html (for user to finish make log task) 
5. Incomplete Log List.html(for user to scan logs that incompleted),
6. Complete Log.html (for user to complete a log with details)
7. Review Past Data.html ( for user to review past data)
8. homeCSS.css (main css file we used to edit html)
9. review.css (css file for review page edting)
---

## Back-end files:
1. HomePage.js (backend for index.html, it will download kid information from firebase, and load them into html document)
2. create.js (backend for addNewKid.html, it will save data user submitted, and create a new key in firebase to store kid's information value.)
3. makelog.js(backend for "Make Log.html", save user(teacher) submited data according to user's choice(complete/incomplete) separately in firebase)
4. incomplete.js (backend for "Incomplete Log List.html", down load all incompleted logs information form firebase, and load them into html document, they will be sorted by category and log's submitted time)
5. complete.js (backend for "Complete Log.html. Download the log that user chose to complete and latest three completed log as reference for user to finish completing the log. It will also save data in firebase user submitted after complete the log.)
6. review.js ( Download logs in chosen time range, and do statistics to make a pie-chart that can directly shows a summary information for the user)
7. Chart.js (Library for using google chart to make a pie chart)
---

## Implementation tool/Library we used:
1. jQuery
2. Bootstrap
3. Bootstrap-tags-input
4. Google Chart
---

LogKids @Team XZY - for childcare teachers to make instant log about kids under their care and review past data in a meaningful way
