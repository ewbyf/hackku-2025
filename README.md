## Inspiration
Our  inspiration of medIQ stemmed from the lack of patient knowledge and the hassle of being on multiple medications. We took these 2 problems and created a easy to use solution to bridge some of the gap between patient and doctor. 
## What it does
medIQ is a mobile app that pulls medications that the user should be on from FHIR. This ensures that users can easily keep track of numerous medications that they may be on as well as when and how much of the medication they need to take. medIQ also takes into account the user's schedule, for example, if the user is going to be absent for a long time, i.e. a vacation, then it will remind them to refill their medication ahead of time so that they don't run out during the vacation. We also provide a timeline for users to check on their diagnosis so that they can be a part of the process as well. Users are able to see their past diagnosis and current diagnosis. Users will also be able to access a summarized, easy worded version of their own medical records with text to speech as well as multi-language support features.  
## How we built it
For the frontend, we used React Native with Expo as well as Expo Router for file-based navigation, we also used TypeScript for static typing. We used luxon for date handling, axios for making API calls, and ngrok for tunneling and remote access. 
## Challenges we ran into
The biggest challenge we ran into was designing our UI/UX to be extremely intuitive, as we realized our target demographic most likely did not have much  experience with modern technology. We went through multiple iterations of UI/UX to reach a satisfactory level. 
## Accomplishments that we're proud of
We're very proud of the amount of information that is condensed and summarized. We're also proud that we were able to make he flow of information so smooth. 
## What we learned
We learned how to query patient data from the HAPI FHIR api and how the system worked to query information such as patient condition. 
## What's next for medIQ
medIQ has a lot of potential as a patient centered app with room to grow, with features that we thought of adding but having scopes too big to fit within the timeframe of a hackathon. Features such as, a clinical hotline for connecting patients to readily available healthcare workers working anywhere to help solve the manpower shortage through video chat, a live diagnostic timeline with addition of doctor's notes as well as summarization of the notes, and a ride share estimate to doctor's appointment.
