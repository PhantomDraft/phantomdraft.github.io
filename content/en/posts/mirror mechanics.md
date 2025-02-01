---
title: "The Perfect Mirror for Perfect People: Left-Handers, Physics, Ray Tracing"
description: "The Story of a Father Who Tried to Explain the Deficiency of Reflection as a Physical Phenomenon to His Left-Handed Son Using Video Games"
# format for string: "xxxx-xx-xx"
date: 2025-02-01
lastmod: "2025-02-01"
# set false when you want the post publish
draft: false
# one category: ["category-1"]
# more categories: ["category-1", "category-2", ...]
categories: ["My Life"]
# refer to categories
tags: ["gaming", "mirrors"]
# seires
series: []
# Top image for the post /local/images/test/cover.jpg
image: "/images/posts/mirror-mechanics/cover.webp"
# Hide from home and other main page
hideFromCenter: false
# Hide from archive page
hideFromArchives: false
# Hide from everything but the archive
hideFromSection: false
# Hide from everything but the Sitemap
hideFromSitemap: false
---
*The Story of a Father Who Tried to Explain the Deficiency of Reflection as a Physical Phenomenon to His Left-Handed Son Using Video Games.*

One day, I faced a difficult task. Not all young parents manage to prepare for it in advance.

## The task: Introduce my four-year-old son to the basics of understanding how reflective surfaces (mirrors) work

I wasn’t prepared, and that was my mistake because predicting an early interest in doppelgängers from the mirror world wasn’t that hard…

Additional condition: My wife and I have a left-handed son.  
I see no point in making excuses because I have to work with the result, not someone else. But for the sake of fairness, I should clarify that earlier discussions about dominant hand preference revolved exclusively around household needs:

- Finding handwriting practice books for left-handers. And yes, I consider it normal to start teaching writing at four years old, especially if a child, in the beginning, "mirrored" some letters when writing them from memory rather than tracing them.
- Choosing a gamepad. I remember we experimented with a Thrustmaster gamepad but ultimately settled on the Xbox One format, which makes me think that becoming ambidextrous is a real possibility. It reminds me of the doctrines of Spanish (if I’m not mistaken) knife-fighting schools, where a person "with a dominant hand" was considered disabled because, in their view, a fighter should be symmetrical.

*By the way, on November 4, 1947, a boxer named Mike Collins set a world record: being left-handed, he entered the ring in a right-handed stance, then suddenly switched stances and knocked out his opponent, Pat Brownson, with his first punch at the 4-second mark of the match. Cool, impressive.*

- Switching the dominant hand in Minecraft. On one hand, it’s not good that in most games you can’t switch the dominant hand, but on the other—we return to point two and draw conclusions.

*An interesting conclusion will be at the end of the article.*

So, I Wasn’t Prepared for Mirrors, and in General—It’s a Difficult Topic. When my son asked me his question, I started searching through the memory cloud tags.

## What is a reflection?

*— A flawed projection\!*

In general, this question is more relevant to psychology because it lacks an important fragment. I believe that children should be taught from an early age to formulate questions so that they can accidentally answer them themselves, or at least start getting closer to an answer.

Let’s rephrase: *What is light reflection?* – Now that’s correct, although for an unprepared person, it may sound strange. The phrasing reminds us that "a mirror won’t work in complete darkness," creating the right associative connection. Now let’s answer the question itself.

Light Reflection: A Physics Phenomenon Discovered by Galileo Galilei. The scientist conducted an experiment in which he demonstrated that part of the light from a beam falling on a surface is reflected, and another part is absorbed by the object or passes through it.

Let’s logically develop this thought.

### What is a light beam?

A light beam is directed light traveling in a single direction, limited in spatial propagation, meaning in directions perpendicular (transverse) to the beam’s initial direction.

One more important detail in the context of the article’s further theme, as I will mention ray tracing in video games there.

### Can the human eye see a light beam?

It can, if part of the light is scattered, for example, on dust particles oscillating in the air.

And now:

### What is a mirror?

A mirror is a smooth surface with a reflective layer. When light falls on a mirror, it follows the law of reflection. That’s how the "mirror world" is drawn, which we perceive as a reflection of an object.

All of This Doesn’t Provide Clear Answers to a Small Child, So I Continued to Ponder.

### Perelman’s Reboot

In the end, I retrieved from memory a crumpled and yellowed children’s physics textbook, "Fun Physics" by Perelman, and, with a wise look, proclaimed:

*— What do you think, son, can we see a mirror?*

This allowed me to buy some time. I googled the chapter "Can You See a Mirror" and started reading it aloud. Having forgotten the contents of the book, which was read to me in childhood, I soon realized that, while a decent textbook, it needed an updated edition. I had to introduce a lot of real-time censorship, as if I were an interpreter at negotiations between two warring factions, sometimes insulting each other.

"Finally, your mirror twin has a physical defect, which you, I suppose, are free from: he is left-handed. He writes, sews, and eats with his left hand, and if you express readiness to shake hands with him, he will extend his left hand".

I read ahead, making theatrical pauses while reading, and presented edited versions:

"Finally, our twin has a physical feature, which we, I suppose, are free from: he is right-handed. He writes, sews, and eats with his right hand, and if we express readiness to shake hands with him, he will extend his right hand".

This is a censored version of the reflection fairy tale, where I freed the text from "flaws".

The issue here isn’t just about "not upsetting the child". I allow that being left-handed is an advantage at best and, at worst, an ideal foundation for developing ambidexterity. Non-standard conditions are a reason not just for self-pity but for growth. Many right-handers (for example, myself) never even thought of using their left hand equally in childhood, just as I overlooked many things.

I Remember a Funny Incident. We were walking, and my son pointed out "a bear with a Minecraft sword stuck in its butt". I stared for a while, and in the end, I realized that indeed—it was a stain resembling a bear (or a giant hamster) with a Minecraft sword stuck right in its butt, but the silhouette was mirrored, and I wouldn’t have noticed the scene on my own. Nevertheless, the little guy notices such silhouettes, which are also accessible to right-handers.

## "Why am I right-handed in the mirror?" 

That was the question.

I had bought time. I read Perelman’s chapter on my laptop, practicing oral censorship, while at the same time scouring the internet on my phone. I’m amazed that my eyes didn’t split apart like an Apache pilot’s.

I gave my answer:

*— Let’s start with the mirror. The mirror is smooth. It can show us what is in front of it, but only when there is light. In complete darkness, we won’t see anything in the mirror. Not only because it will be dark and we won’t see anything at all, but also because the mirror will have nothing to show.*

*— The mirror copies us, and we can see what we roughly look like, but it does so with errors.*

This wasn’t the best or most precise explanation. I understood that then, so I suggested we continue and compare mirrors in games with real mirrors.

## Implementation of Mirror Simulation in Video Games

We turned on YouTube and started watching different videos about reflections. Given that, at the time of writing this article, I have only been studying Unity for a week, I cannot provide much practical information yet.

What we established while watching the videos together:

1. We understood that without light, there is no reflection, and visually, this principle also applies in video games.
2. Reflection is not limited to mirrors, which is similarly relevant for modern 3D games.
3. Before I started learning Unity, I had some experience working with Canvas JS. I knew for a fact that there are no light waves in the digital world and that reflections are merely simulations with several possible implementations.

I read that highlights on surfaces are a dedicated topic in art schools, despite highlights seeming relatively simple for an artist to reproduce—after all, they are frozen in time. This is also partially relevant for older video games. Reflections and highlights were often manually drawn to create the perfect cutscene, or their positioning was fully precomputed within scripted scenarios. These scenarios, in principle, are not that different from cutscenes, as the player’s control is disabled at that moment. This reminds me of early Disney animation techniques, based on frame-by-frame animation, which, despite becoming vintage, are still used today (*The Nightmare Before Christmas*, *Shaun the Sheep*). However, when it comes to video games, the key word is "early"—because we need to move forward and surprise casual gamers. (*No profit – no games.*)

In older video games, reflections were most often duplicates of locations, just in lower resolution. Additionally, the player character's model was also duplicated, mirroring the actions of the in-game character in real-time. Here are a few examples I know of:

* One of the earliest examples is Dark Edge (1992).
* Super Mario 64—where, due to low resolution, developers simply copied the level.
* DOOM 3—which used scripted mirror reflections.
* The hallway in the mansion from Resident Evil, where the shiny, semi-transparent "marble floor" was, in reality, a hidden vertical copy of the entire hall, including a cloned player model.

Over time, game design expanded, reflective and highlighted surfaces became more common, so it’s no surprise that game development has adopted several different approaches to solving these now almost trivial problems.

### Methods of Creating Reflections

**Cube Maps** – A somewhat outdated method, but still relevant due to its efficiency. The main idea is to apply textures in 3D computer graphics (I did something similar in Canvas JS) and in video games to replicate an object’s environment. Cube Maps consist of six 2D images, each showing a view from a specific direction, corresponding to one of the six sides of a cube. Usually, cube maps are used to simulate reflections in water, glass, or metal surfaces. Using cube map sampling, the renderer determines which side of the cube should be displayed (reflected) on the surface of an object.

**Planar Reflections** – From what I understand, this method involves an additional rendering pass, which includes creating a duplicate room and a virtual camera that mimics the reflecting mirror. This technique is more efficient when reflecting smaller spaces without too many details (like decorations, etc.).

**Screen Space Reflections (SSR)** – This method analyzes the contents of the player’s screen. SSR does not generate reflections for objects that are outside the player’s view. For some, this may be a limitation, while for others, it may be the very solution that helps save system resources.

**Ray Tracing** – As of 2024, this is the most discussed and most resource-intensive method. Unprecedented realism (never before seen even in real life) is achieved by simulating the interaction of light rays with objects in a scene. Most often, rays are cast into the scene and traced when they interact with objects according to real-world physics:

* If a ray collides with a reflective surface, a reflected ray is created.
* If a ray collides with a refractive surface, the light passes through it.

I will probably experiment with these techniques myself soon.

### The Perfect Mirror for Perfect People

*A Distorted Copy of a Bug Born from the Big Bang*

Somewhere in the middle of one of the videos, something important happened. My son suddenly said that in video games, mirrors work "more correctly" and copy us more accurately. There, mirrors work without errors, and it's strange that we try to "break" them.

Well, yes. That’s true.

We discussed the fact that ray tracing, while undoubtedly impressive, is actually an artificial degradation of the original, "correct" physics in 3D rendering. What’s interesting is that in our quest to perfectly replicate reality, we sometimes have to break things that real life itself never even dreamed of, creating a 3D space that often looks much more realistic than how we appear in photos or mirrors. Imagine if mirrors worked like a camera, copying and displaying our exact likeness—the way we appear to another person. This is actually similar to when my wife poses in front of her phone’s camera—yes, such a mirror would show us how we truly look, more accurately.

### Games helped us understand this situation, and that became an interim conclusion

When Our Son Asked the Question, I Didn’t Take a Break to Prepare. He asked it when he was interested, not when I decided to push some random topic on him. I felt that it was important to answer immediately.

After this, he seemed to understand the situation better. The Results:

* The issue with mirroring letters disappeared, but that was also influenced by the fact that he continues practicing handwriting.
* He almost completely stopped confusing left and right. Now, this is more of a social challenge rather than a mechanical one, because in conversations, people and various fictional characters often use "right hand" as a synonym for "dominant hand".
* Most importantly: During handshakes, he automatically extends the same hand as his interlocutor, without any difficulty. This is extremely important, and I believe we are moving in the direction of asymmetry awareness.

### Conclusion: Play Video Games

I worried that I might confuse him, so I don’t claim to be a methodologist, because there is no real method here. Play video games. You often hear that games are mostly harmful, but that’s not true. Games are beneficial, especially for children.

**Ellie Won’t Yield**

Recalling the ancient metaphorical legend about how the giantess Ellie (Old Age) cooled the war god Thor’s fury with a single blow, making him drop to one knee, I’d say the following about Perelman’s textbooks: Maybe I will read these two books to my son, but it’s better to proofread them in advance, otherwise, it will turn out like our recent attempt with "Three Fat Men". All of this drains my mental energy, for sure.

## The Mirror Collection

Since watching that video, we have been taking screenshots from games that feature mirrors, evaluating their implementation. The collection will continue to grow.