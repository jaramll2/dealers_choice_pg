const pg = require ('pg');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('assets'));

const port = process.env.PORT || 3000;

app.get('/',async(req,res,next)=>{
    try{
        const response = await client.query('SELECT * FROM frogs;');
        const frogsList = response.rows;

        const html = `<!DOCTYPE html>
        <html>
        <head>
            <title>Frog and Toad Care Guide</title>
            <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
            <div id = "header">
            <header>&#128056 Frog and Toad Care Guide &#128056</header>
            </div>

            <div id = "frogNames">
            ${frogsList.map(frog => `
            <p>
                <span class="frogs-position"> &#128056 </span><a href="/posts/${frog.id}">${frog.title}</a>
            </p>`
            ).join('')}
            </div>

            <div id= "footer">
            <p><small>All care sheet information was aquired from https://www.petsuppliesplus.com/</small></p>
            </div>
        </body>
        </html>`;

        res.send(html);


    } catch(error){ 
        next(error);
    }

});

app.get('/posts/:id', async(req, res,next)=> {
    try{
        const id = req.params.id;
        const response = await client.query('SELECT * FROM frogs WHERE id=$1;',[id]);
        const frogItem = response.rows[0];

        //then prepare some html to send as output
        const html = `<!DOCTYPE html>
          <html>
          <head>
              <title>Frog and Toad Care Guide</title>
              <link rel="stylesheet" href="/style.css" />
          </head>
          <body>
              <div id = "header">
                  <header><a href="/">&#128056 Frog and Toad Care Guide &#128056 </a></header>
              </div>
      
              <div id='frogItemTitle'>
                  <p>
                    ${frogItem.title}
                  </p>
              </div>
      
              <div id = "photos">
                  <img src="${frogItem.image}">
              </div>
      
              
              <div id='frogItemContent'>    
                  <p>
                  ${frogItem.content}
                  </p>
              </div>
      
              <div id= "footerFlex">
                  <p>All care sheet information was aquired from https://www.petsuppliesplus.com/</p>
              </div>
              
            
          </body>
        </html>`;
      
        //Finally, send a response
        res.send(html);
    }catch(error){
        next(error);
    };
  });

const client = new pg.Client('postgres://localhost/');

const syncAndSeed = async()=>{
    const SQL = `
        DROP TABLE IF EXISTS frogs;

        CREATE TABLE frogs(
            id SERIAL PRIMARY KEY,
            image TEXT DEFAULT NULL,
            title TEXT DEFAULT NULL,
            content TEXT DEFAULT NULL
        );

        INSERT INTO frogs(image,title,content) VALUES ('/americanTree.jpg','American Green Tree Frog', 'Green tree frogs have a delicate grass green skin with a light cream colored stripe on the side of the body running from the jaw to the flank. Because of their delicate and porous skin, handling your frog is not recommended. It is very easy to transfer toxins from hands to frog skin, and vice versa - be sure to wash your hands after handling your frog. Green Tree Frogs live 6+ years and can grow to be 4-6 inches. Their tanks should be a minimum of 4 gallons of tank space per frog is suitable space. 20H or other taller tanks are commonly used. A taller tank is preferred to a wider tank. The humidity should be 60%-70% and 68-77 degrees. A loose coconut substrate can be used to help maintain humidity. It should be misted daily, but do not soak it. Green tree frogs are nocturnal (most active at night) and arboreal (tree dwelling). They can live in groups. They are carnivorous and should be fed live protein sources such as: gut-loaded(fed a nutritious diet about 24-hours before being offered to your frog) crickets, earthworms and wax worms. Do not feed them wild insects. They should have a large water dish so they can soak as well as drink. Change the water in your frog’s enclosure every one to two days. Green tree frogs need 8-12 hours of daytime and 8-12 hours of nighttime. The day period must be light, and the night period must be dark. This can be achieved by using a timer on the light bulb. Recommended supplies include but are not limited to: a UVB fluorescent bulb, several small hide houses, plants (fake or real as long as they are frog safe), reptile heat pad, and a metal mesh tank cover.');
        INSERT INTO frogs(image,title,content) VALUES ('/barkingTree.jpg', 'Barking Tree Frog','Barking tree frogs can live up to 7 years and are typically 5 - 7 centimeters. Barking tree frogs are generally olive green, brown, yellowish or gray in color with dark, round spots on the back. They have prominent toe pads for gripping, which are typical of tree frogs. The barking tree frog is the largest of the native US tree frogs and has a loud nighttime communication call. Its distinctive “barking” sound has been measured at 85 decibels, which is about as loud as a bus! A single specimen will “bark” roughly 8,000 times in one night. Be aware that your frog will not be a quiet housemate during the night. Their loud barking is generally reserved for the overnight hours. Adults spend most of their time in the trees during the day, and will often bury themselves in sand to avoid high temperatures. They are nocturnal (most active at night) and arboreal (tree dwelling). These frogs live in groups and will get along fine as long as there is proper space for each frog. A minimum of 4 gallons of tank space per frog is a good measure, but the tank should not be smaller than 10 gallons overall, even for one frog. DO NOT handle your barking tree frog. The skin of tree frogs is very delicate and porous. Oils and chemicals on your hands can be transferred to the skin of your pet and make it sick. Also, since the skin is very delicate, it can tear easily. They are carnivorous and should be fed live protein sources such as: gut-loaded(fed a nutritious diet about 24-hours before being offered to your frog) crickets, earthworms and wax worms. Do not feed them wild insects. Their tank should be 75-85 degrees during the day and 68 degrees at night. Humidity should be 60%-70%. A loose coconut substrate can be used to help maintain humidity. It should be misted daily, but do not soak it. There are several ways to set up a barking tree frog enclosure. Some people prefer to create a primarily aquatic environment, with a bit of land area. Others create a more terrestrial tank with a bit of water area. You can use an aquatic tank divider to separate the water from the substrate. A large ceramic crock or plastic container is recommended to hold the water, and it should be changed every one to two days. Barking tree frogs need 8-12 hours of daytime and 8-12 hours of nighttime. The day period must be light, and the night period must be dark. This can be achieved by using a timer on the light bulb. Recommended supplies include but are not limited to: a UVB fluorescent bulb, several small hide houses, plants (fake or real as long as they are frog safe), reptile heat pad, sturdy climbing branches, a small dome and 25-50 watt reptile bulb for heat and a metal mesh tank cover.');
        INSERT INTO frogs(image,title,content) VALUES ('/fireBellied.jpg', 'Fire Bellied Toad', 'ire bellied toads live 10-15 years and can be 2-3 inches on average. Fire-bellies have olive green backs with black spots, and a bright orange belly with black mottling. These colors tell predators, “Careful! I’m toxic!” Fire-bellies are actually one of the least toxic amphibians, but ALWAYS wash your hands after handling. The males have slightly rougher skin and fatter front legs than females. They have webbed feet for swimming and large, bulbous eyes. Unlike most frogs, Fire-bellied Toads make sounds by inhaling rather than exhaling. Its croak has a pleasant sound, evocative of a small bell. Because of their delicate and porous skin, handling your frog is not recommended; toxins can easily be transferred from your hands to the toad. They are diurnal (active during the day) and semi-aquatic. These toads live in groups and will get along fine as long as there is proper space for each toad. A minimum of 4 gallons of tank space per toad is a good measure. WARNING: larger toads can become aggressive with smaller ones in the tank. Try to purchase toads of similar size. Fire-bellied toads are semi-aquatic. This means your enclosure must have water AND land space. Fire-bellies are carnivores and should be fed gut-loaded(fed a nutritious diet about 24-hours before being offered to your frog) crickets, small feeder fish, earthworms, and wax worms. Do not feed them wild insects. For the tank, it should be a minimum of 10 gallons and would need a minimum of 4 gallons per toad in the tank. 10, 20L or 40 gallon tanks are commonly used. There are several ways to set up a fire-bellied toad enclosure. Some people prefer to create a primarily aquatic environment, with a bit of land area. Others create a more terrestrial tank with a bit of water area. A glass cover is recommended with a fluorescent 2.0 UVB bulb. The tank should have a humidity at 60% - 70% and temperature should be 68-70 degrees. Recommended supplies include but are not limited to: coconut fiber substrate, larger ceramic crock or plastic container for the water area, several small hide houses, plants (fake or real), branches and a small reptile heat pad. About 40-50% of the tank should be water and the water should be changed every one to two days. Using a large plastic container will make it easier to clean, but some people prefer to use an aquarium divider. They should be allowed self-selected exposure to UVB lighting for up to 8-12 hours a day. This means they should be able to bask in the light but also get away if desired.');
        INSERT INTO frogs(image,title,content) VALUES ('/pacman.jpg', 'Pacman Frog', 'Pacmans live to be 6-10 years and grow on average to be 6-7 inches (males are a bit smaller than females). The frogs get their common name, “Pac Man Frog” from their round, plump shape and large mouths, which make them resemble the video game character. Their large eyes stay open while they are sleeping. Pac mans are available in many patterns and colors, the most common being yellow and green, with mottled spots/patches. These colors and patterns prove to be perfect camouflage for hiding on the rainforest floor, waiting for prey to happen by. Because of their delicate and porous skin, handling your frog is not recommended. Pac mans are relatively inactive and sedentary. They are beautiful and entertaining pets, but they have no desire to be handled. Handling a pac man frog is very stressful for it and may result in illness. Their skin is very sensitive, being a secondary breathing organ. Some pac mans are diurnal; some are crepuscular. They are carnivorous and should be fed live protein sources such as: gut-loaded(fed a nutritious diet about 24-hours before being offered to your frog) crickets, earthworms, wax worms, smaller feeder fish and small pinky mice. Your pac man frog is programmed to snap at anything that happens by its mouth. Considering the fact that they DO have teeth, take care that you are not mistakenly bitten. It is always safest to feed your frog with tongs, just in case. This behavior has earned the pac man the label of “vicious and aggressive.” This is not true; they are just instinctually grabby hunters. Pac man frogs are ectothermic, or cold-blooded, therefore the environments we create for them must be heated properly to keep them healthy. Your frog needs a warm, humid environment in its enclosure. A ten-gallon glass tank with a metal mesh cover will work fine. The temperature should be 81 degrees and the humidity should be 60%-70%. Pac mans need a large bowl to sit in, but not too deep since Pac mans are not good swimmers and might drown. The water should be changed every one to two days. Recommended supplies include but are not limited to: a metal mesh tank cover, a 10 gallon tank, hide house, coconut fiber substrate, and UVB bulb and housing. All day-active (diurnal) amphibians should be allowed self-selected exposure to UVB lighting for up to 8-12 hours a day. This means they should be able to bask in the light but also get away if desired, much as they might in the wild. Many twilight-active (crepuscular) and night-active (nocturnal) species do get some exposure to the sun and may also benefit from low levels of UVB. Pac man frogs need 8-12 hours of daytime and 8-12 hours of nighttime. The day period must be light, and the night period must be dark. A timer should be used to set day/night periods.');
        INSERT INTO frogs(image,title,content) VALUES ('/dumpyTree.jpg', 'White Dumpy Tree Frog', 'White dumpy tree frogs live to be 16+ years and grow to be 4-6 inches on average. Dumpy tree frogs have a delicate grass green skin with a light cream colored stripe on the side of the body running from the jaw to the flank. They are named for the “dumpy” look they sometimes have when they are overweight and the skin begins to fold. They are nocturnal (most active at night) and arboreal (tree dwelling). These frogs live in groups and will get along fine as long as there is proper space for each frog. A minimum of 4 gallons of tank space per frog is a good measure, but the tank should not be smaller than 10 gallons overall. Dumpys are calm and gregarious. They do not mind being held by their human friends - even children - however, care must be taken to keep hands clean so they do not transfer toxins to the frog’s skin. Also, humans should wash their hands after handling the frogs to prevent transmission of toxins and zoonotic diseases such as salmonella from frogs to humans.  They are carnivores and should be fed gut-loaded(fed a nutritious diet about 24-hours before being offered to your frog) crickets, earthworms, and wax worms. Do not feed them wild insects. Your frog(s) need a warm, humid environment in their enclosure. The humidity should be 50%-70% and temperature should be 68 degrees to 77 degrees. A twenty-gallon high glass tank (for two to three frogs) with a metal mesh cover will work fine. A minimum of 4 gallons of tank space per frog (minimum 10 gallons). 10, 20H or other taller tanks are commonly used. Remember that green tree frogs are TREE frogs, they are arboreal, and so a tank that supplies more height than width is always a better choice, such as a 20 High. They should have a water dish so they can soak as well as drink. Change the water in your frog’s enclosure every one to two days. They need 8-12 hours of daytime and 8-12 hours of nighttime. The day period must be light, and the night period must be dark. This can be achieved by using a timer on the light bulb. Recommended supplies include but are not limited to: a UVB fluorescent light, several small hide houses, coconut fiber substrate, plants (fake or real as long as they are frog safe), reptile heat pad, and a metal mesh tank cover.');
        `;

        await client.query(SQL);
};

const setUp = async()=>{
    try{
        await client.connect();
        await syncAndSeed();

        console.log('connected to database');

        app.listen(port,()=> console.log(`Listening on port ${port}`));

    } catch(error){
        console.log('could not connect to database');
        console.log(error);
    }
};

setUp();

