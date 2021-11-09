# Noughts and Crosses

This is a fun website for visitors who want to play a game of Noughts and Crosses (also known as Tic-tac-toe or Xs and Os). 

The goal is to provide the user with a trouble free game of Noughts and Crosses that has a couple of difficulty levels and which tracks the score accurately.

The live link can be found here - https://madstu.github.io/noughts-and-crosses/

It is designed to be responsive and accessible on a range of devices, making it easy to navigate for all users.

![Responsive Mockup](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/responsive-website-mockup.png)

## Features 

### Existing Features

- __Typography__

  - For the main heading, scoreboard and the noughts and crosses themselves I chose the "Edo" font from [1001 Fonts](https://www.1001freefonts.com/edo.font).
  - This font is in a hand drawn, brushed ink looking style which users will appreciate and help them to feel like they're playing it by hand with a friend.
  - I also styled the hard mode on/off switch with the same Edo font.

- __Colour Scheme__

  - I wanted to use black and white colours for the game, as when we played as children it was mostly black ink on white paper, so I have a slightly off-white colour called whitesmoke to represent a piece of paper.
  - The noughts and crosses on the game are black to provide high contrast represent the black ink.
  - I looked at a lot of background colours and felt the darkslategray colour provided good contrast between the text, the gameboard and the background. And it's also nice and comfortable to look at, not being too bright or too dark.
  - The text colour is floralwhite which is another off-white colour to just soften the brightness of a hard bright white a little and allows the user to keep playing without it becoming a strain.
  - The background colours do change depending on the outcome of the game. If the game is a draw, the background transitions into black. If the computer wins it turns bright red for a moment. But if the user wins it briefly becomes a kaleidoscope of bright and contrasting colours to celebrate.

![Colour Scheme](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/colour-scheme.png)

- __Navigation Bar__

  - Featured at the top of the page, the full responsive navigation bar includes links to the History, Events and contact sections on the website.
  - This section will allow the user to easily navigate to the section of the page that most interests them. 
  - The styling changes as you hover and activate each link to give the user positive feedback confirming the action they've taken.

![Nav Bar](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/nav-bar.png)

- __The Landing Page Image__

  - The landing includes a bold title of the website name and photograph of the motorcycle being used in a competition.
  - This section displays to the user exactly what the subject of this website is about.
  - The image stretches the entire width of the screen and no matter what your screen size, you should always be able to see the "Harley-Davidson" name on the side of the bike.

![Landing Page](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/landing-image.png)

- __History Section__

  - The history section gives the user a brief history about these motorcycles.
  - The user will also see a small gallery of images of the motorcycle in various situations.
  - The images border colors change as the user hovers over them.

![History Section](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/history-image.png)

- __Events Section__

  - This section allows the user to see an overview of our annual events and locations.
  - This section will be updated as more events are held by users.
  - This section's description also provides a link to the contact form.
  - The event box borders change colour when the user hovers over them.

![Events Section](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/events-image.png)

- __Contact Form__ 

  - The contact form allows users to send me a message if they have questions regarding the motorcycle or events. 
  - The form ensures they have filled out all their details correctly and asks whether they own a motorcycle or not.
  - The input labels are fully responsive giving the user good feedback.
  - The submit button is responsive to let the user know their mouse is in the right place and when they've submitted the form.

![Contact Form](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/contact-image.png)

- __Footer__

  - The footer section provides links to some social media websites which all open in a new window.
  - It also tells the user who created the website and links externally to my github page.

![Footer](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/footer-image.png)

### Features Left to Implement

- Add sound effects.
- Add another difficulty level.
- Take turns with the computer at who goes first.
- Allow user to choose to play as noughts or crosses.

## Testing 

I tested the website on a number of browsers and devices and all is working as intended.

The responsive design allows for different screen sizes as proven by using [Responsinator](http://www.responsinator.com/?url=madstu.github.io%2Fnoughts-and-crosses%2F)

### Validator Testing 

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fmadstu.github.io%2Fnoughts-and-crosses%2F)
- CSS
  - No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fmadstu.github.io%2Fnoughts-and-crosses%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)
- Other Tests
  - No problems were discovered when testing with the [WAVE tool](https://wave.webaim.org/report#/https://madstu.github.io/noughts-and-crosses/)
- Accessibility
  - I confirmed that the colours and fonts chosen are easy to read and accesible by running it through lighthouse in devtools.

![Lighthouse Score](https://raw.githubusercontent.com/MadStu/HTMLCSSEPP/main/assets/images/readme-images/lighthouse-score.png)

### Unfixed Bugs

- ~~When the human player has won a game and there's still free spaces available, the computer takes a turn and records itself as having won before resetting the board.~~
- ~~When the human player has won a game and there's still free spaces available, the computer takes another turn before resetting the board.~~
- ~~The computerSquareHard() function does not loop through the eligibleNumsArray.~~
- ~~The number returned is the square number but is interpreted as the array index number.~~

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab 
  - Then navigate to the Pages section 
  - From the source section drop-down menu, select the Master Branch
  - Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 

The live link can be found here - https://madstu.github.io/noughts-and-crosses/


## Credits 

### Content 

- The "Edo" font was used from 1001 Free Fonts https://www.1001freefonts.com/edo.font
- The README.md file structure is based on the template provided by the Code Institute.
- I often used W3Schools and MDN web Docs as a guide for finding the best solutions and using the code in the correct format.
- I'd also search google which more often than not would show solutions written on stack overflow https://stackoverflow.com/
- The Event boxes with the background image CSS was inspired by the code institute's Love Running project and their code was used as the base.
- I used [photopea](https://www.photopea.com/) to draw the grid. 
- I also used [favicon-generator.org](https://www.favicon-generator.org/) to create the favicon. 

### Media

- The responsive mockup image at the top of the README.md was created at https://websitemockupgenerator.com/
