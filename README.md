# <p align="center">Video\_</p>

## Overview

Full Stack application using vanilla JavaScript on the front-end to customize a video player. The video player and the application are still in their infancy but as it sits on this date (6/11/20) it is completely functional.
There are four short videos with the file path stored in a mongoDB collection. The only dependencies are on the back-end being express, mongoose, and dotenv.

<p align="center">
<img src="./readmeIMGs/video-walkthrough.gif">
</p>

### How to Use

To run the application locally clone this repo and run `npm install` or `yarn add` I'd suggest using yarn. Then add a `.env` file with your mongo URI and a PORT defined in it. After the dependencies are added on your local machine and the .env file is saved run the application.

To see the deployed version of the application [click here](https:/vanilla-video.herokuapp.com/).

### Future Development

As stated before this application is still in progress but will be completed and a few small bugs worked out (the list of videos doesn't hide at the moment every single time a new video is played) soon enough. Write an issue if anymore bugs are found.
