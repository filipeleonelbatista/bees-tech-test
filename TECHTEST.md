# BEES front-end interview challenge 

## Goals 

The main goal of this project is to apply real-life skills on a simple project. We will check your skills and code quality on this project, and the more you do, the better we will be able to understand your skills, but don't worry about doing something too complex. Focus on clean code, logic, state management, and tests. Comments about your thoughts in the code are welcome, but don't be to wordy!

---

## How does this test works

First of all, you'll need to create the project using the tools of your preference. **Once you receive this challenge you have three business days to develop the project** (no need to rush), and if you need more time, feel free to ask us. Once the project is done, you can upload it to github and send us the link.<br/>
This challenge contains the expected parts and the bonus one, if you have time to do both of them: Awesome! If not, no worries at all.<br/>
If you want to build more things, please, do it! But mention that in your README file so we do not miss it.

---

## Instructions 

### Check the figma design for the project 
**[Here is the design you should follow.](https://www.figma.com/design/cpXVZeJfxa0DIRMRKwzT1S/BEES-front-end-challenge?node-id=0-1&m=dev&t=CnIPlDycAunhzrCX-1)**

You should follow the proposed design, but you can add the style as you like: plain css, sass, css-in-js, etc. You are also free to use libraries or style frameworks like tailwind, material ui, bootstrap, etc.


> Note that you don't need to strictly follow the design, but you should follow the main idea and the main components.

---

### Acceptance Criteria

#### Stack
- React
- Typescript
- React Testing Library for unit tests
    - You don't need to cover 100% of the code, but you should cover the main logic and the main components.

#### First screen

In input text component, the user should enter a full name (name and surname). It should validate if the user entered a valid name and surname.

The button should be enabled **ONLY** if the user enters the full name and checks the checkbox, if one of these conditions are not filled the button should remain disabled

#### Second screen

##### Favorites Section

For this section, you should list all the favorite breweries of the user. Each card should contain the brewery information as shown in the design and a remove button. The user should be able to remove a brewery from the list by clicking on the remove button.
If a brewery is removed from the favorites list, it should be removed from the list and the cards should be re-arranged.

##### Search Section

The user should be able to search for a brewery by name. The search should be case insensitive. For this search, you should use the [open brewery API](https://www.openbrewerydb.org/documentation/01-listbreweries).

Once the data was fetched, you should display the breweries in the cards.
The user should be able to add a brewery to the favorites list by clicking on the add to favorites button. If the brewery is already in the favorites list, the button should be disabled.

#### Card Component

Each card should contain: title, address information, city/state/country that should be concatenated, three required tags containing the type of the brewery, postal code and telephone. Feel free to add more information if you want to.

#### Header
- When the user clicks in the logout button, the first screen should be displayed and the input text and checkbox should be empty.
- You should show the user **first name** in the top right corner of the page.

---

### Nice to have / Bonus
- Persist user data in a global state (feel free to use any tool/library)
- Write component/UI tests (suggested tool: using cypress)
- Responsivity
- Loading state and lazy loading
- Error handling

---

## Expected results 
- A detailed **README file**, containing a description of your choices (tools, libraries, architecture, etc), as explained as it could be (if you feel comfortable, write it in english, otherwise you can write in portuguese) and also what we should do to run the project, the tests, etc. 
In this file you also should add if you added any additional features and describe them.
<br/>
- **The project** following the design specifications and the description above.

---

## Feedbacks
After receiving your project and documentation, our team will analyze it carefully and provide a proper feedback. Highlighting the good parts or the improvement points.

---

### Evaluation 

- Typescript best practices
- Overall code quality
- Code maintainability
- Styling (CSS, SASS, CSS-in-JS, etc)
- React
- Folder structure and organization
- Tests (unit tests, integration tests, etc)
- Bonus features