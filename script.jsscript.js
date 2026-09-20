let data = JSON.parse(localStorage.getItem("myLifeData")) || {

    profile:{},

    health:{
        water:0,
        sleep:0,
        steps:0,
        weight:0
    },

    training:0,
    nutrition:0,
    habits:0,
    focus:0

};



function saveData(){

    localStorage.setItem(
        "myLifeData",
        JSON.stringify(data)
    );

}



function showPage(id){

    document.querySelectorAll(".page")
    .forEach(page=>{

        page.classList.remove("active");

    });


    document.getElementById(id)
    .classList.add("active");

}





function saveProfile(){


data.profile={

    name:
    document.getElementById("nameInput").value,

    gender:
    document.getElementById("gender").value,

    age:
    Number(document.getElementById("age").value),

    weight:
    Number(document.getElementById("weight").value),

    height:
    Number(document.getElementById("height").value),

    goal:
    document.getElementById("goal").value

};


document.getElementById("dailySummary").innerHTML=

"Welcome "+data.profile.name+" 👋";


saveData();

updateScore();


}







const exercises={


Chest:[

"Bench Press - 4 sets x 8-12 reps (Middle Chest)",

"Incline Dumbbell Press - 4 sets x 8-12 reps (Upper Chest)",

"Cable Fly - 3 sets x 12-15 reps (Chest Stretch)"

],


Back:[

"Pull Ups - 4 sets x 8-12 reps (Width)",

"Barbell Row - 4 sets x 8-10 reps (Thickness)",

"Lat Pulldown - 3 sets x 12 reps"

],


Legs:[

"Squat - 4 sets x 8-10 reps",

"Romanian Deadlift - 4 sets x 10 reps",

"Leg Press - 3 sets x 12 reps"

],


Shoulders:[

"Shoulder Press - 4 sets x 8-12 reps",

"Lateral Raise - 4 sets x 12-15 reps",

"Rear Delt Fly - 3 sets x 15 reps"

],


Biceps:[

"Barbell Curl - 4 sets x 10 reps",

"Hammer Curl - 3 sets x 12 reps"

],


Triceps:[

"Rope Pushdown - 4 sets x 12 reps",

"Skull Crusher - 3 sets x 10 reps"

],


Abs:[

"Crunch - 4 sets x 20 reps",

"Leg Raise - 4 sets x 15 reps"

],


"Full Body":[

"Squat",

"Bench Press",

"Pull Ups",

"Shoulder Press"

]


};





function generateWorkout(){


let muscle=

document.getElementById("muscleSelect").value;



let result="<h3>"+muscle+"</h3>";



exercises[muscle].forEach(ex=>{

result+=

"<div class='exercise'>💪 "+ex+"</div>";

});



document.getElementById("workoutResult")
.innerHTML=result;


data.training=100;

saveData();

updateScore();


}








function calculateCardio(){


let speed=

Number(document.getElementById("speed").value);


let time=

Number(document.getElementById("duration").value);



let weight=

data.profile.weight || 80;



let calories=

Math.round(
(speed * time * weight * 0.0175)
);



document.getElementById("cardioResult")
.innerHTML=

"🔥 Calories burned: "+calories+" kcal";


}








function analyzeFood(){


let text=

document.getElementById("foodInput")
.value
.toLowerCase();



let calories=0;
let protein=0;
let carbs=0;
let fats=0;



if(text.includes("egg")){

calories+=210;
protein+=18;
fats+=15;

}


if(text.includes("chicken")){

calories+=330;
protein+=62;

}


if(text.includes("rice")){

calories+=260;
carbs+=56;

}


if(text.includes("banana")){

calories+=105;
carbs+=27;

}



data.nutrition=80;


document.getElementById("nutritionResult")
.innerHTML=

`
Calories: ${calories} kcal<br>
Protein: ${protein} g<br>
Carbs: ${carbs} g<br>
Fats: ${fats} g
`;



saveData();

updateScore();


}








function saveHealth(){


data.health={

water:
Number(document.getElementById("water").value),

sleep:
Number(document.getElementById("sleep").value),

steps:
Number(document.getElementById("steps").value),

weight:
Number(document.getElementById("currentWeight").value)

};


saveData();


updateScore();


document.getElementById("healthResult")
.innerHTML=

"Health saved ✅";


}








function generateCoach(){


let message="🤖 Coach Advice:<br><br>";



if(data.training>0)

message+="💪 Training completed. Good work.<br>";

else

message+="🏋️ Complete your workout today.<br>";



if(data.health.sleep>=7)

message+="😴 Recovery is good.<br>";

else

message+="🌙 Improve your sleep.<br>";



if(data.health.water>=3)

message+="💧 Hydration is excellent.<br>";

else

message+="💧 Drink more water.<br>";



message+="Keep improving every day 🔥";



document.getElementById("coachMessage")
.innerHTML=message;


}







function updateScore(){


let score=

(
data.training+
data.nutrition+
data.habits+
data.focus+
(data.health.sleep>=7?100:50)

)
/5;



document.getElementById("lifeScore")
.innerHTML=

Math.round(score)+"%";


saveData();


}



updateScore();
