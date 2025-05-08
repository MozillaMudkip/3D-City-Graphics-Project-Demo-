/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { OuterRing } from "./p2objects.js";
import { ShinraBuilding } from "./p2objects.js";
import { Plates } from "./p2objects.js";
import { SimpleHouse } from "./p2objects.js";
import { ApartmentBuilding } from "./p2objects.js";
import { Roads } from "./p2objects.js";
import { PipeLatus } from "./p2objects.js";
import { SimplePinetree } from "./p2objects.js";
import { SemiTruck } from "./p2objects.js";
import { Helicopter } from "./p2objects.js";
import { Factory } from "./p2objects.js";
import { Pumpjack } from "./p2objects.js";
import { SemiTruckNonMoving } from "./p2objects.js";
import { GrCementMixer } from "./p2objects.js";
import { DoubleDomeLight } from "./p2objects.js";

//import {main} from "../examples/main.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 70 // make the ground plane big enough for a world of stuff
});

const scene = world.scene;

//Added a directional light to light up the centeral building
const directionalLight = new T.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 0, 100);
scene.add(directionalLight);

// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
//main(world);

// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
//highlight("SimpleHouse-5");
//highlight("Helicopter-0");
//highlight("Track Car");
//highlight("MorphTest");

/**
 * READ FOR THE LORE...
 * 
 * For my project 2, I decided to recreate the city of Midgar, a giant industrialized
 * megacity from Square Enix's Final Fantasy VII for the Playstation 1. The giant city is rules
 * by the corrupt and evil Shinra Electric Power Company, who operate large mines to extract 
 * Mako Energy (the lifeblood of the Earth from deep within its core). In the city, they process
 * the Mako energy and use it in giant Mako energy reactors, 8 of which surround the outside walls of the city
 * to fuel their military power and top secret expirimentation. The tops of these towers have eerie
 * green towers of light where the remnents of the used Mako energy shine up into the night sky.
 * The city is constructed like a Pizza, where it has 8 slices where some are residential areas and 
 * industrial areas. In the game, there are slums underneith the "upper plates" where the the ramshakle
 * houses are illuminated by giant lamps the hand from underneigth the floor of the upper level.
 * My version is simplified so I only did the upper layer here. In the same file as this, Ive included
 * a picture of what the city looks like in the game for reference (midgar.jpg). Also, if you like video games and
 * JRPGs in general, check out the game. Ive played the original and the PS4/PS5 remake and their both
 * very good games!
 * 
 * The reference photo comes from the Final Fantasy Wiki 
 * https://finalfantasy.fandom.com/wiki/Midgar?file=Ff7-midgar.jpg
 */


//Creates the outer ring wall of the city
world.add(new OuterRing({
    radius: 55,
    thickness: 4.5,
    height: 3.5
}));
highlight("OuterRing");
//Adds double lights on the wall in the front
//Idk what they do but theyre there in the game...
world.add(new DoubleDomeLight);
highlight("DoubleDomeLight");

//The Headquarters of The Shinra Electric Power Company
//They rules over the entire city of Midgar from their officetower
//They operate the city to pump Mako energy, the Earths life blood out
//from under the Earth's crust to use for energy to power their military and
//to make themselves rich
world.add(new ShinraBuilding);
highlight("ShinraBuilding");
world.add(new Plates);
highlight("Plates");

//Consts to add pine trees to the scene
const treeCount = 75; 
const minDistance = 60; 
const maxDistance = 69; 

//Added a bunch of shades of green to give the trees variaty
const greenColors = [
    '#2E6F40', 
    '#3A7D44', 
    '#4C9C4C', 
    '#5CB85C', 
    '#7CFC00', 
    '#228B22', 
    '#32CD32', 
    '#006400'  
];

//Outside the city in the actual game, its a barren wasteland but I wanted
//to add some basic natural aspects for the requirements so I added a forest
//I already had he constructor for the trees from another workbook so I just 
//had Deepseek generate this loop to place all the trees for me
for(let i = 0; i < treeCount; i++){
    //Applies random angle and distance from center to the trees
    const angle = Math.random() * Math.PI * 2;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    //Set x and z positions
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    //Set random heights and radiuses of the trees them selves
    //Applies random colors to the trees
    const height = (3 + Math.random() * 4); 
    const radius = (0.8 + Math.random() * 0.7); 
    const color = (greenColors[Math.floor(Math.random() * greenColors.length)]);
    
    world.add(new SimplePinetree({
        height: height,
        //Make it so the trees have a random amount of sides 5 through 7
        sides: 5 + Math.floor(Math.random() * 3), 
        radius: radius,
        position: { x: x, y: 0, z: z },
        color: color,
        name: "Pinetree"
    }));
}


//Adds trucks to rotate around the outside of the shinra building.
//In the game, theres a very famous part where you escape the main 
//building and race down the highway while being persued by soldiers
//My model isnt big enough for me to add a big highway so this is my
//"road" around the main building
world.add(new SemiTruck({
    x: 19,  
    y: 6, 
    z: 0,
    name: "truck0", 
    size: 0.5, 
    //face direction of rotation to start
    yrot: -Math.PI/2, 
    speed: 0.001,
    radius: 19,
    centerX: 0,
    centerZ: 0
}));
highlight("SemiTruck-truck0");
world.add(new SemiTruck({
    x: -19,  
    y: 6, 
    z: 0,
    name: "truck1",
    size: 0.5, 
    yrot: -Math.PI/2, 
    speed: 0.001, 
    radius: 19,
    centerX: 0,
    centerZ: 0
}));
world.add(new SemiTruck({
    x: -19,  
    y: 6, 
    z: 19,
    name: "truck2",
    size: 0.5, 
    yrot: -Math.PI/2, 
    speed: 0.001, 
    radius: 19,
    centerX: 0,
    centerZ: 0
}));
world.add(new SemiTruck({
    x: -19,  
    y: 6, 
    z: -19,
    name: "truck3",
    size: 0.5, 
    yrot: -Math.PI/2, 
    speed: 0.001, 
    radius: 19,
    centerX: 0,
    centerZ: 0
}));


//Adds a few helicopters to rotate around the scene
//In the opening cutscene of the game when it pans over the city
//theres a couple helicopers flying around the main tower 
world.add(new Helicopter({
    x: 50,  
    y: 20,  
    z: 50,
    name: "helicopter1", 
    size: 1,
    speed: 0.001,
    radius: 30,
    centerX: 0,
    centerZ: 0,
    clockwise: false,
    //adjusts how much it goes up and down on Y
    verticalAmplitude: 5,
    verticalSpeed: 3,
}));
highlight("Helicopter-helicopter1");
world.add(new Helicopter({
    x: 50,  
    y: 30,  
    z: 50,
    name: "helicopter2", 
    size: 1,
    speed: 0.0005,
    radius: 35,
    centerX: 0,
    centerZ: 0,
    clockwise: true,
    verticalAmplitude: 0.8,
    verticalSpeed: 1.5, 
}));

//Plate 7
//Residential district 1, Added in the 
//"slice" directly in front of the central building.
world.add(new SimpleHouse({
    name: "BoxyHouse1",
    size: 2,
    position: { x: -3, y: 2, z: 22 },
    yrot: -.2,
    color: '#3e424a'
}));
highlight("House-BoxyHouse1");

world.add(new SimpleHouse({
    name: "BoxyHouse2",
    size: 2,
    position: { x: -13, y: 2, z: 18 },
    yrot: -.55,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding1",
    size: 3,
    position: { x: -8, y: 2, z: 20 },
    yrot: -.4,
    color: '#3e424a'
}));
highlight("ApartmentBuilding-ApartmentBuilding1");

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding2",
    size: 3,
    position: { x: -15, y: 2, z: 24.5 },
    yrot: 2.7,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding3",
    size: 3,
    position: { x: -6, y: 2, z: 29 },
    yrot: 2.75,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding4",
    size: 3,
    position: { x: -16, y: 2, z: 31 },
    yrot: 1.15,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding5",
    size: 3,
    position: { x: -10, y: 2, z: 34 },
    yrot: -2,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding6",
    size: 3,
    position: { x: -5, y: 2, z: 37 },
    yrot: 1.15,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding7",
    size: 3,
    position: { x: -21, y: 2, z: 29 },
    yrot: -2,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding8",
    size: 3,
    position: { x: -20, y: 2, z: 37 },
    yrot: -.4,
    color: '#3e424a'
}));

world.add(new ApartmentBuilding({
    name: "ApartmentBuilding9",
    size: 3,
    position: { x: -11, y: 2, z: 41 },
    yrot: -.4,
    color: '#3e424a'
}));

world.add(new SimpleHouse({
    name: "BoxyHouse3",
    size: 2,
    position: { x: -7, y: 2, z: 43 },
    yrot: -.4,
    color: '#3e424a'
}));

world.add(new SimpleHouse({
    name: "BoxyHouse4",
    size: 2,
    position: { x: -25, y: 2, z: 35 },
    yrot: -.4,
    color: '#3e424a'
}));

world.add(new Roads({
    name: "Road1",
    position: { x: -10, y: -0.2, z: 23 },
    length: 15,
    yrot: 1.15
}));

world.add(new Roads({
    name: "Road2",
    position: { x: -13, y: -0.2, z: 32 },
    length: 20,
    yrot: -0.4
}));

world.add(new Roads({
    name: "Road3",
    position: { x: -18, y: -0.2, z: 41 },
    length: 24,
    yrot: 1.15
}));

world.add(new SemiTruckNonMoving({
    x: -11,      
    y: 2,       
    z: 27,   
    name: "truck4",   
    size: 0.5,  
    yrot: 25 * Math.PI/18,
    color: "blue"
}));

//Plate 2
//Residential district 2
//On the opposite side
let angle = Math.PI; 
let cos = Math.cos(angle);
let sin = Math.sin(angle);

//To save me the effort to place all these objects again in new places
//I had Deepseek put the same objects from before into this structure where
//it adjusts the coordinates x and z of to allow me to place them in other city slices
function rotatePos(x, z) {
    return {
        x: (x * cos - z * sin),  
        z: (x * sin + z * cos)   
    };
}

const district1Buildings = [
    // Simple Houses
    { type: SimpleHouse, params: { name: "BoxyHouse5", size: 2, position: { x: -3, y: 2, z: 22 }, yrot: -.2, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse6", size: 2, position: { x: -13, y: 2, z: 18 }, yrot: -.55, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse7", size: 2, position: { x: -7, y: 2, z: 43 }, yrot: -.4, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse8", size: 2, position: { x: -25, y: 2, z: 35 }, yrot: -.4, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding10", size: 3, position: { x: -8, y: 2, z: 20 }, yrot: -.4, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding11", size: 3, position: { x: -15, y: 2, z: 24.5 }, yrot: 2.7, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding12", size: 3, position: { x: -6, y: 2, z: 29 }, yrot: 2.75, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding13", size: 3, position: { x: -16, y: 2, z: 31 }, yrot: 1.15, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding14", size: 3, position: { x: -10, y: 2, z: 34 }, yrot: -2, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding15", size: 3, position: { x: -5, y: 2, z: 37 }, yrot: 1.15, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding16", size: 3, position: { x: -21, y: 2, z: 29 }, yrot: -2, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding17", size: 3, position: { x: -20, y: 2, z: 37 }, yrot: -.4, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding18", size: 3, position: { x: -11, y: 2, z: 41 }, yrot: -.4, color: '#3e424a' } },
    { type: Roads, params: { name: "Road4", position: { x: -10, y: -0.2, z: 23 }, length: 15, yrot: 1.15 } },
    { type: Roads, params: { name: "Road5", position: { x: -13, y: -0.2, z: 32 }, length: 20, yrot: -0.4 } },
    { type: Roads, params: { name: "Road6", position: { x: -18, y: -0.2, z: 41 }, length: 24, yrot: 1.15 } }
];

//Add in all the buildings from the const
//Like the trees, I had Deepseek have me some time and create a loop to place all the stuff
district1Buildings.forEach(building => {
    const rotatedPos = rotatePos(building.params.position.x, building.params.position.z);
    //Add in all the buildings with the passed in parameters
    world.add(new building.type({
        ...building.params,
        position: { 
            x: rotatedPos.x, 
            y: building.params.position.y, 
            z: rotatedPos.z 
        },
        yrot: building.params.yrot + angle 
    }));
});

//Added a few non moving trucks onto the streets around the city
world.add(new SemiTruckNonMoving({
    x: 20,      
    y: 2,       
    z: 40, 
    name: "truck5",     
    size: 0.5,  
    yrot: 20 * Math.PI/18,
    color: "Red"
}));


//Plate 6
//Residential district 4
//Directly next to the 1st residential district 45 degrees counter clockwise from the 1st...
//Basically just a copy and paste of the section from above
angle = -Math.PI/4; 
cos = Math.cos(angle);
sin = Math.sin(angle);

function rotatePosCCW(x, z) {
    return {
        x: (x * cos - z * sin),
        z: (x * sin + z * cos)
    };
}

const district3Buildings = [
    { type: SimpleHouse, params: { name: "BoxyHouse9", size: 2, position: { x: -3, y: 2, z: 23 }, yrot: .4, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse10", size: 2, position: { x: -13, y: 2, z: 18 }, yrot: .3, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse11", size: 2, position: { x: -7, y: 2, z: 43 }, yrot: .4, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse12", size: 2, position: { x: -27, y: 2, z: 33 }, yrot: .3, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding19", size: 3, position: { x: -8, y: 2, z: 20.5 }, yrot: .35, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding20", size: 3, position: { x: -15, y: 2, z: 24.5 }, yrot: -2.85, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding21", size: 3, position: { x: -6, y: 2, z: 29 }, yrot: -2.8, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding22", size: 3, position: { x: -17, y: 2, z: 31 }, yrot: 1.85, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding23", size: 3, position: { x: -11, y: 2, z: 34 }, yrot: -1.25, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding24", size: 3, position: { x: -5, y: 2, z: 37 }, yrot: 2, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding25", size: 3, position: { x: -22, y: 2, z: 29 }, yrot: -1.3, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding26", size: 3, position: { x: -22, y: 2, z: 36 }, yrot: .35, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding27", size: 3, position: { x: -13, y: 2, z: 40 }, yrot: .35, color: '#3e424a' } },
    { type: Roads, params: { name: "Road7", position: { x: -10, y: -0.2, z: 23 }, length: 15, yrot: 1.9 } },
    { type: Roads, params: { name: "Road8", position: { x: -14, y: -0.2, z: 32 }, length: 20, yrot: .3 } },
    { type: Roads, params: { name: "Road9", position: { x: -18, y: -0.2, z: 41 }, length: 24, yrot: 1.9 } }
];

district3Buildings.forEach(building => {
    const rotatedPos = rotatePosCCW(building.params.position.x, building.params.position.z);
    world.add(new building.type({
        ...building.params,
        position: { 
            x: rotatedPos.x, 
            y: building.params.position.y, 
            z: rotatedPos.z 
        },
        yrot: building.params.yrot
    }));
});

//Plate 3
//Residential district 3
//Directly next to the 1st residential district 45 degrees counter clockwise from the 1st...
//Again, basically just a copy and paste from above, just rotated
angle = 3 * Math.PI/4; 
cos = Math.cos(angle);
sin = Math.sin(angle);

// Add rotated versions of all buildings and roads from district 1
const district4Buildings = [
    { type: SimpleHouse, params: { name: "BoxyHouse13", size: 2, position: { x: -3, y: 2, z: 23 }, yrot: .4, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse14", size: 2, position: { x: -13, y: 2, z: 18 }, yrot: .3, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse15", size: 2, position: { x: -7, y: 2, z: 43 }, yrot: .4, color: '#3e424a' } },
    { type: SimpleHouse, params: { name: "BoxyHouse16", size: 2, position: { x: -26, y: 2, z: 34 }, yrot: .3, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding28", size: 3, position: { x: -8, y: 2, z: 20.5 }, yrot: .35, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding29", size: 3, position: { x: -15, y: 2, z: 24.5 }, yrot: -2.85, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding30", size: 3, position: { x: -6, y: 2, z: 29 }, yrot: -2.8, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding31", size: 3, position: { x: -17, y: 2, z: 31 }, yrot: 1.85, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding32", size: 3, position: { x: -11, y: 2, z: 34 }, yrot: -1.25, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding33", size: 3, position: { x: -5, y: 2, z: 37 }, yrot: 2, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding34", size: 3, position: { x: -22, y: 2, z: 29 }, yrot: -1.3, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding35", size: 3, position: { x: -22, y: 2, z: 36 }, yrot: .35, color: '#3e424a' } },
    { type: ApartmentBuilding, params: { name: "ApartmentBuilding36", size: 3, position: { x: -13, y: 2, z: 40 }, yrot: .35, color: '#3e424a' } },
    { type: Roads, params: { name: "Road10", position: { x: -10, y: -0.2, z: 23 }, length: 15, yrot: 1.9 } },
    { type: Roads, params: { name: "Road11", position: { x: -14, y: -0.2, z: 32 }, length: 20, yrot: .3 } },
    { type: Roads, params: { name: "Road12", position: { x: -18, y: -0.2, z: 41 }, length: 24, yrot: 1.9 } }
];

district4Buildings.forEach(building => {
    const rotatedPos = rotatePosCCW(building.params.position.x, building.params.position.z);
    world.add(new building.type({
        ...building.params,
        position: { 
            x: rotatedPos.x, 
            y: building.params.position.y, 
            z: rotatedPos.z 
        },
        yrot: building.params.yrot
    }));
});

world.add(new SemiTruckNonMoving({
    x: -14,      
    y: 2,       
    z: -36, 
    name: "truck5",     
    size: 0.5,  
    yrot: 11 * Math.PI/18,
    color: "White"
}));

//Plate 5
//Before the game begins, the upper residential district on the 5th plate was dropped onto the
//slums below to suppress rebels. After, all that was left was wreakage. They then built a large
//pipe latus above the giant hole to better move Mako energy to the shinra building as well as to 
//hide the giant hole and ruins. To make it easier on me, I made a seperate constructor to create a
//pipe latus to go over the hole to simplify the process of placing a bunch of pipes.
world.add(new PipeLatus);
highlight("PipeLatus");

//plate 8 
//Industrial area
//Around Midgar, theres a lot of Mako refinery facilities
//I encorperated my OBJ loaded object as a number of more detailed
//factories in these industrial areas
world.add(new Factory({
    name: "factory1",
    path: "./factory.obj", 
    x: 23, 
    y: 2.5,
    z: 22,
    size: 20, 
    color: '#493c35', 
    yrot: Math.PI/4
}));
highlight("Factory-factory1");

world.add(new Factory({
    name: "factory2",
    path: "./factory.obj", 
    x: 34, 
    y: 2.5,
    z: 33,
    size: 20, 
    color: '#493c35', 
    yrot: Math.PI/4
}));

world.add(new Factory({
    name: "factory3",
    path: "./factory.obj", 
    x: 32, 
    y: 2.5,
    z: 2,
    size: 20, 
    color: '#493c35', 
    yrot: 6 * Math.PI/4
}));

//Plate 4
//Another industrial zone
world.add(new Factory({
    name: "factory4",
    path: "./factory.obj", 
    x: -23, 
    y: 2.5,
    z: -22,
    size: 20, 
    color: '#493c35', 
    yrot: 5 * Math.PI/4
}));

world.add(new Factory({
    name: "factory5",
    path: "./factory.obj", 
    x: -34, 
    y: 2.5,
    z: -33,
    size: 20, 
    color: '#493c35', 
    yrot: 5 * Math.PI/4
}));

world.add(new Factory({
    name: "factory6",
    path: "./factory.obj", 
    x: -32, 
    y: 2.5,
    z: -2,
    size: 20, 
    color: '#493c35', 
    yrot: 2 * Math.PI/4
}));

world.add(new GrCementMixer({ 
    name: "CementMixer1",
    x: -35, 
    y: 2, 
    z: -15,
    size: 1,
    rotationSpeed: .05,
    color: "Blue"
  }));
  highlight("CementMixer-0");

//Plate 1
//Mako Energy Mine
//All the Mako energy used in the reactor towers that surround the city
//are sucked up from the earth with giant pumps. They kinda look like oil
//pumps but a little different
world.add(new Pumpjack({
    name: "MakoPump1",
    x: 20, 
    y: 1.5, 
    z: -15,
    size: 1.5,
    speed: 1, 
    color: "Silver", 
    yrot: (1 * Math.PI/6)
}));
highlight("Pumpjack-MakoPump1");

world.add(new Pumpjack({
    name: "MakoPump2",
    x: 22, 
    y: 1.5, 
    z: -10,
    size: 1.5,
    speed: 1, 
    color: "Silver", 
    yrot: (13 * Math.PI/12)
}));

world.add(new Pumpjack({
    name: "MakoPump3",
    x: 24, 
    y: 1.5, 
    z: -5,
    size: 1.5,
    speed: 1, 
    color: "Silver", 
    yrot: (1 * Math.PI/12)
}));

world.add(new Factory({
    name: "factory7",
    path: "./factory.obj", 
    x: 48, 
    y: 2.5,
    z: -12,
    size: 20, 
    color: '#493c35', 
    yrot: 4 * Math.PI/4
}));

world.add(new Pumpjack({
    name: "MakoPump4",
    x: 37, 
    y: 1.5, 
    z: -25,
    size: 1.5,
    speed: 1, 
    color: "Silver", 
    yrot: (1 * Math.PI/6)
}));

world.add(new Pumpjack({
    name: "MakoPump5",
    x: 39, 
    y: 1.5, 
    z: -18,
    size: 1.5,
    speed: 1, 
    color: "Silver", 
    yrot: (20 * Math.PI/18)
}));

world.add(new Pumpjack({
    name: "MakoPump6",
    x: 29, 
    y: 1.5, 
    z: -20,
    size: 1.5,
    speed: 1, 
    color: "Silver", 
    yrot: (7 * Math.PI/6)
}));

world.add(new SemiTruckNonMoving({
    x: 36,      
    y: 2,       
    z: -12, 
    name: "truck6",      
    size: 0.5,  
    yrot: 2 * Math.PI/3,
    color: "Indigo"
}));

world.add(new GrCementMixer({ 
    name: "CementMixer2",
    x: 30, 
    y: 2, 
    z: -5,
    size: 1,
    rotationSpeed: .05,
    color: "Blue"
  }));


///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
