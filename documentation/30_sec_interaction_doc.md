# Project: Do you believe in fairies? // 30 seconds interaction project
## Description & Interaction
This 30 second interaction is a visual-novel inspired story where the player reads through the text and interacts with specific objects to proceed to the ending. 
The player goes to a beach in search of freedom. A lonely beach with silent waves hitting the shore that will make anyone feel like they're the only person in the world- that's the kind of setting i wanted to give this project.
After that the player collects items that come washing away in the sea waves and soon a strange looking fairy also appears in front of them. After the player helps the fairy get back its things, it grants them their wish to be free.
The player finally gains wings and flies away in the sky, looking over the beach as they have finally gained freedom.

[link to work](https://suneha002.github.io/playful-media-suneha/day5/day5%20assignment) || [link to code](https://github.com/suneha002/playful-media-suneha/tree/main/day5/day5%20assignment)

## Story
This interaction can be interpreted in many different ways. But i wanted this to be a story about an young adult, thrown into the world of responsibilities that they can hardly feel used to navigating through and thus grown tired of all of it, they wish to reconnect to their childhood joys of magic and fairies. However what someone considers "freedom" can vary depending on each person and so the story can have vastly different interpretations. I'd like to leave the freedom of interpretation to whoever is playing.

## Inspiration and starting point
I had previously coded a visual novel-ish structure in unity before so i tried to implement similar things in p5 js as well which was a little challenging as p5 is not exactly designed for making "games" but i wanted to see how far I could go with it
If i had to name inspirations for this work, im hugely inspired by vivinos and vewn's works. overall i wanted the background to look dull and the fairy to look more vibrant to create a sense of stark difference.

### ✧ Art direction
  this is the initial moodboard i had with me before starting the game. Most of these are taken from old 2000s visual novels which were infamous for talking about more heavy topics through the use of rather uncharacteriscally cute looking characters. That's what I went for when I created 'Fairy'. I wanted it to come off as cute and childish unfitting of the gloomy background. This is because the fairy is supposed to represent the player's childhood dreamscape.  
  ![moodboard](https://64.media.tumblr.com/c78df0308232cc49b7ec72a4dca7be03/d33062fd8235bb3a-51/s540x810/c7eb97930ba831d7470bf0905b5ba58f9d452b08.png) 

### ✧ Design objectives
**1. Contrasting colors:** Like mentioned before, using contrasting colors for the background and the characters was one of the first concepts i had while coming up with the interaction. The beach with gloomy colors is supposed to represent the player's dull adult life. The fairy and all the magical objects with their bright pink and purple color palette talks about the playfulness of a child's dreams.

**2. Dreamy Music:** I chose "fairy of shampoo" by dosii as the background music as it just felt right for this interaction due to the whole "dreamy" vibe its musicals have. The lyrics, however, talk about a completely different topic though, which is why i decided to go with the instrumental version instead.

**3. Minimal Design:** At first I wanted to try out a more detailed layout for the whole thing, like- making the dialogue box look fancier, add effects on the fairy sprite, add animations on the text. But later I decided i don't want to give too much attention on the dialogue itself but rather how much it adds to the atmosphere. So in the end i decided to change the font to a pixel-ish style to enhance the old visual novel vibe and also kept the dialogue box simple so that the player doesn't only focus on the text but on what the visuals are telling him as well.

## Work Process

### ✧ Making the artwork
First i started with making the background, the sprites and the other visual elements as I already had a pretty clear idea of what i want to show and how i want to proceed with it.
I wanted to draw everything in a very simple artstyle to contain its childlike element. First i drew the backgrounds for the **main scene** and the **ending scene**. In the main scene i drew 5 frames to animate the sea waves, put them in an array and played it in a loop using "for" throughout the whole main scene.
![background](https://64.media.tumblr.com/09026c95876bc005b2a50df99c3cd964/d33062fd8235bb3a-91/s2048x3072/ffc03f44c7995098476c469f0615178a3c6f84d8.png)

Then i drew the magical objects and the fairy sprites both with and without the objects.
  ![sprites](https://64.media.tumblr.com/9eaa5731403eb491b8e884e9131148ef/4dca9d4847bac724-11/s540x810/31d8f131e4de27b40f84e9b5c170a63882d7f774.png) 

And at last i drew the wings sprite and gave it an animation using the same process.
![wings](https://64.media.tumblr.com/ab37992b2b1c844c5f20625f6b2dd7ad/3a0cb4ff6bd3a5fe-2a/s2048x3072/28745f735b321ca56c72c9fd076d395a37fc7ffb.png)

-------------------

### ✧ Coding
i did the coding part in many parts, step by step. First i started with the dialogue box, then proceeded to the object-click interaction and then added a start screen and ending scene to it.
I created a class called VNObject for the magical objects and used random() function to call them so that each time they will appear on different places and the player has to collect them by clicking on.
![object](https://64.media.tumblr.com/7088f000aca09af42ba0077e6d84ee2e/799ef608e0a771fd-3a/s540x810/676b422725a3a885b2416a3e370e511300594ea4.png)


I divided the whole thing into seperate segments so that after the player collects each object the story proceeds to the next segment.I also added a "button" in two places of the story to add the feel of "making choices" that you encounter in visual novels. Though since I had a time limit of 30 seconds, for now the story only has one path and one ending.
![click](https://64.media.tumblr.com/7aa0cb0afc3fcbaa8b8b39a0aba684dc/aef0b93eaa02dd92-04/s540x810/0a7eee493d90bdbd711d3d5fe571ef816dc3617a.png)

Since my interaction is not fullscreen, i edited the style.css to make the whole thing appear in the center.

The link to the full code can be found [here](https://github.com/suneha002/playful-media-suneha/tree/main/day5/day5%20assignment)

## Moving Forward
I'm 80% satisfied with how this turned out but I were to add some modifications then i surely have quite a few future plans.
- First and foremost i want to add a "route diverge" feature that would be similar to any visual novels. Here if the player is someone 'who doesn't believe in fairies' he will be met with a different ending, which can be something more comedy-gag genre or more of a realistic outcome.
- I want to modify the ending scene where the player can see the background change in his own perspective, maybe a 3D element can be introduced and if possible I'd like to take the project to a different platform to implement it properly.
