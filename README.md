# ShitEngine3D

The most garbage graphical 3D engine for the web ever made. "Why bothering reading this", you may ask? Well because it's cool and I want to share my achievements with you.

This graphical engine for the web using WebGPU, together with WGSL which will be public (out of the early stage) on 22-09-2022. For more details, read the spec at https://www.w3.org/TR/webgpu/.

This engine is also made specifically for Electron, it cannot be used in browsers since they don't support my garbage code structure. 

Enjoy reading.

## WebGPU
So around mid May 2022, I read an article about WebGPU. WebGPU will basically replace the current web graphics-api WebGL. WebGPU is easy to use, performant and supports modern shading technologies such as raytracing.

Because WebGPU is still under development (currently 25-07-2022), there are almost no (clear) tutorial about the WebGPU topic. 

But alright, I decided to dive deeper into the topic. 3D graphics, who doesn't love them.

## The beginning
After making my decision to learn WebGPU, a lot of things came on my way. I had zero experience about matrices, vertices, shadings and the whole 3D graphical environment. 
Thanks to some people online, I now know the basics of the whole 3D concept.

## Epic triangle

My first project was to create a colourful transformed triangle. It was painful to create it, but I managed to do it. Here is how it looked like.

![My epic triangle](https://cdn.discordapp.com/attachments/824701021070557205/998205100206063616/unknown.png)

Here you can see my epic pink red-ish triangle in an Electron application. At the right of the screen, the developers tools window is shown.
I made a cool logging system that indicates what my program is doing, so I know when shit breaks. 

Very cool.

But alright very cool, I made a colourful triangle. What now? After making this triangle, I tried going into full 3D.

## Rainbow cubes

3D cubes, who doesn't like 3D cubes. 

I spent a lot of time into creating a 3D object using perspective tranformations and rotations. After a while researching about matrices and vertices, I finally made a cool 3D scene.

![Epic rotated cubes](https://cdn.discordapp.com/attachments/824701021070557205/999699190831661197/unknown.png)

In this epic picture, you can see a scene with several cubes. They are rainbow coloured. Why? Idk why lol.

I used the very epic gl-matrix library https://www.npmjs.com/package/gl-matrix to handle perspective transforms.

The structure of the code also looks better, I have no screenshot of this. I managed to create seperate files with classes giving me the ability to control more dynamically.
For example instancing. I made a class that creates an unqiue cube that can be tweaked individually.

The following classes were made to perform this action:
- ``camera`` This class creates a dynamic camera which can be controlled without changing the entire scene.
- ``renderer`` This class creates a dynamic renderer which can be seen as the core of the engine. Everything will be rendered using this class.
- ``utils`` Some utilities to make my life easier lol
- ``cube`` Of course the cube class.

## Lightning and more

After a week and a half, I learnt more and changed my engine. 

Dynamic lightning has been implemented, textures can now be used on my epic cubes and I made it more performant.

![Wireframes](https://cdn.discordapp.com/attachments/824701021070557205/1000890881144004648/unknown.png)
Epic cube wireframes shown in this picture with the performance monitor as the right of this image.

![Obama](https://cdn.discordapp.com/attachments/824701021070557205/1001058674539757569/unknown.png)
Obama cube floor with a simple lightning system.

![Bruh texture](https://cdn.discordapp.com/attachments/824701021070557205/1001060502044151828/unknown.png)
bruh

![Hell](https://cdn.discordapp.com/attachments/381112364289884160/1001161913427824750/unknown.png)
Lot's of cubes floating in this scene with several pictures while running on a high framerate, with the console and the memory inspector at the right.

## Future

It's now 25-07-2022, the last time I edited this document. 

I still have to learn a lot and do more to scale this 3D engine, but I am taking my time. 

I seriously like working on this project, learning something has always been interested to me. Also, I see this as the very top level of web development.

I can now officially say that I mastered the web and I am ready to do whatever I want on the web.

## Resources

### GL Matrix
A cool matrix library that calculates the matrices for you. No need to create a own matrix system by yourself.

https://www.npmjs.com/package/gl-matrix

### WebGPU 
Of course the api I am using to draw graphics.

https://www.w3.org/TR/webgpu/

### Electron
The best framework to create desktop applications using plain html, javascript (or typescript) and css, running on Chromium and Node.js

https://www.electronjs.org/

### Typescript
I hate typescript

https://www.typescriptlang.org/